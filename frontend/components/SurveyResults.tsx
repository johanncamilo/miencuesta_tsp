import React, { useMemo } from 'react';
import { Survey, Question, MultipleChoiceResult, TextResult, QuestionResultData } from '../types';
import { Card } from './Card';
import { DocumentArrowDownIcon } from './icons';
import QuestionResultCard from './QuestionResultCard';

// Helper to generate random distribution
const generateRandomDistribution = (total: number, parts: number): number[] => {
    if (parts === 0) return [];
    if (total === 0) return Array(parts).fill(0);

    let remaining = total;
    const distribution = [];
    for (let i = 0; i < parts - 1; i++) {
        const value = Math.floor(Math.random() * (remaining / 1.5));
        distribution.push(value);
        remaining -= value;
    }
    distribution.push(remaining);

    // Shuffle for more randomness
    for (let i = distribution.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
    }

    return distribution;
};

const mockTextAnswers = [
    "Respuesta de ejemplo, todo funciona como se esperaba.",
    "Me pareció un buen servicio, aunque podría mejorar la velocidad.",
    "No estoy seguro, necesito más información al respecto.",
    "La experiencia fue excelente, lo recomendaría.",
    "Tuve algunos problemas al principio, pero el soporte fue de gran ayuda.",
    "Podría ser más intuitivo.",
    "Cumple con las expectativas.",
];

// Generate data for a single question
const generateSimulatedDataForQuestion = (question: Question, totalResponses: number): QuestionResultData => {
    if (question.type === 'multiple-choice') {
        const distribution = generateRandomDistribution(totalResponses, question.options.length);
        return question.options.map((option, index) => ({
            ...option,
            count: distribution[index] || 0,
        }));
    }
    if (question.type === 'short-text' || question.type === 'paragraph') {
        return [...mockTextAnswers].sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    return [];
};


interface SurveyResultsProps {
    survey: Survey;
    onBack: () => void;
}

const SurveyResults: React.FC<SurveyResultsProps> = ({ survey, onBack }) => {

    const allResults = useMemo(() => {
        return survey.questions.map(q => ({
            questionId: q.id,
            questionText: q.text,
            questionType: q.type,
            data: generateSimulatedDataForQuestion(q, survey.responses),
        }));
    }, [survey]);

    const handleExportPDF = () => {
        const { jsPDF } = (window as any).jspdf;
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`Resultados de la Encuesta: ${survey.title}`, 14, 22);
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Total de respuestas: ${survey.responses}`, 14, 30);

        allResults.forEach((result, index) => {
            const startY = index === 0 ? 40 : (doc as any).lastAutoTable.finalY + 10;
            
            doc.setFontSize(12);
            doc.setTextColor(40);
            doc.text(result.questionText, 14, startY);

            if (result.questionType === 'multiple-choice') {
                const body = (result.data as MultipleChoiceResult[]).map(d => [
                    d.value, 
                    d.count, 
                    survey.responses > 0 ? `${((d.count / survey.responses) * 100).toFixed(1)}%` : '0%'
                ]);
                (doc as any).autoTable({
                    startY: startY + 4,
                    head: [['Opción', 'Respuestas', 'Porcentaje']],
                    body: body,
                    theme: 'striped',
                    headStyles: { fillColor: [99, 102, 241] }
                });
            } else {
                 const body = (result.data as TextResult[]).map(d => [d]);
                 (doc as any).autoTable({
                    startY: startY + 4,
                    head: [['Respuestas de ejemplo']],
                    body: body,
                    theme: 'striped',
                    headStyles: { fillColor: [99, 102, 241] }
                });
            }
        });

        doc.save(`${survey.title.replace(/\s/g, '_')}_resultados.pdf`);
    };

    const handleExportXLS = () => {
        const XLSX = (window as any).XLSX;
        const wb = XLSX.utils.book_new();

        // Summary sheet
        const summaryData = [
            ['Título de la Encuesta', survey.title],
            ['Descripción', survey.description],
            ['Total de Respuestas', survey.responses],
            ['Fecha de Creación', survey.createdAt],
            ['Estado', survey.status === 'active' ? 'Activa' : 'Cerrada']
        ];
        const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen');

        // One sheet per question
        allResults.forEach((result, index) => {
            let ws_data: (string | number)[][] = [];
            if (result.questionType === 'multiple-choice') {
                ws_data.push(['Opción', 'Respuestas', 'Porcentaje']);
                 (result.data as MultipleChoiceResult[]).forEach(d => {
                     ws_data.push([
                         d.value,
                         d.count,
                         survey.responses > 0 ? `${((d.count / survey.responses) * 100).toFixed(1)}%` : '0%'
                     ]);
                 });
            } else {
                ws_data.push(['Respuestas de ejemplo']);
                (result.data as TextResult[]).forEach(d => {
                    ws_data.push([d]);
                });
            }
            const ws = XLSX.utils.aoa_to_sheet(ws_data);
            const sheetName = `P${index + 1} - ${result.questionText.substring(0, 25)}`;
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        });

        XLSX.writeFile(wb, `${survey.title.replace(/\s/g, '_')}_resultados.xlsx`);
    };

    return (
        <div className="container mx-auto max-w-5xl animate-fade-in">
            <div className="mb-8">
                <button onClick={onBack} className="text-sm font-medium text-primary hover:text-accent transition-colors">
                    &larr; Volver a Mis Encuestas
                </button>
                <div className="mt-2">
                    <div className="flex-1 min-w-0">
                         <h1 className="text-4xl font-extrabold text-secondary tracking-tight" title={survey.title}>
                           {survey.title}
                        </h1>
                        <p className="mt-2 text-lg text-gray-500">
                            Mostrando resultados para <span className="font-bold text-secondary">{survey.responses}</span> respuestas.
                        </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <button onClick={handleExportPDF} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-secondary bg-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                           <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                            Exportar PDF
                        </button>
                        <button onClick={handleExportXLS} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-secondary bg-dark hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                            Exportar XLS
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {survey.questions.length > 0 ? (
                    survey.questions.map((question, i) => (
                        <QuestionResultCard 
                            key={question.id}
                            question={question}
                            totalResponses={survey.responses}
                            results={allResults[i].data}
                        />
                    ))
                ) : (
                    <Card>
                        <div className="p-12 text-center">
                            <h3 className="text-lg font-semibold text-secondary">Esta encuesta no tiene preguntas.</h3>
                            <p className="mt-1 text-gray-500">Añade preguntas en el editor para poder ver resultados.</p>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default SurveyResults;