import React, { useEffect, useRef } from 'react';
import { Question, MultipleChoiceResult, TextResult } from '../types';
import { Card } from './Card';

interface QuestionResultCardProps {
    question: Question;
    totalResponses: number;
    results: MultipleChoiceResult[] | TextResult[];
}


const QuestionResultCard: React.FC<QuestionResultCardProps> = ({ question, totalResponses, results }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<any | null>(null); // To hold the chart instance

    useEffect(() => {
        if (question.type !== 'multiple-choice' || !chartRef.current || !results) {
            return;
        }

        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        const chartData = results as MultipleChoiceResult[];
        const labels = chartData.map(d => d.value);
        const data = chartData.map(d => d.count);

        const chartColors = [
            'rgba(99, 102, 241, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(236, 72, 153, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(59, 130, 246, 0.7)',
        ];

        chartInstanceRef.current = new (window as any).Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Respuestas',
                    data: data,
                    backgroundColor: labels.map((_, i) => chartColors[i % chartColors.length]),
                    borderColor: labels.map((_, i) => chartColors[i % chartColors.length].replace('0.7', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0, // Ensure whole numbers on the axis
                        },
                        grid: {
                            color: '#e5e7eb', // Lighter grid lines
                        }
                    },
                    y: {
                         grid: {
                            display: false,
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context: any) {
                                const count = context.raw;
                                const percentage = totalResponses > 0 ? ((count / totalResponses) * 100).toFixed(1) : 0;
                                return ` ${count} respuestas (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        // Cleanup function to destroy chart on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };

    }, [question.type, results, totalResponses]);
    
    const renderResults = () => {
        switch (question.type) {
            case 'multiple-choice':
                return (
                    <div className="relative h-64">
                       <canvas ref={chartRef}></canvas>
                    </div>
                );
            case 'short-text':
            case 'paragraph':
                return (
                     <div className="space-y-3">
                        {(results as TextResult[]).map((answer, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                                <p className="text-gray-700 italic">"{answer}"</p>
                            </div>
                        ))}
                        {totalResponses > 5 && <p className="text-sm text-gray-500 text-center pt-2">Mostrando 5 de {totalResponses} respuestas</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <div className="p-6">
                <h3 className="font-bold text-lg text-secondary">{question.text}</h3>
                <p className="text-sm text-gray-500 mb-6">{question.options.length > 0 ? 'Opción Múltiple' : 'Respuesta Abierta'} &middot; {totalResponses} respuestas totales</p>
                {renderResults()}
            </div>
        </Card>
    );
};

export default QuestionResultCard;