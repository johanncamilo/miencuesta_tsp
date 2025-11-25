import React, { useState } from 'react';
import { Survey, Question } from '../types';
import { Card } from './Card';
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from './icons';

interface SurveyPreviewProps {
    survey: Survey;
    onExitPreview: () => void;
}

type ViewMode = 'desktop' | 'mobile';

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ survey, onExitPreview }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('desktop');

    const renderQuestionInput = (question: Question) => {
        // This is mostly copied from SurveyTaker, but with `disabled` prop
        switch (question.type) {
            case 'multiple-choice':
                return (
                    <fieldset disabled className="space-y-3">
                        {question.options.map(option => (
                            <label key={option.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-not-allowed bg-gray-50/50 opacity-70">
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option.value}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <span className="ml-3 text-secondary">{option.value}</span>
                            </label>
                        ))}
                    </fieldset>
                );
            case 'short-text':
                return (
                    <input
                        type="text"
                        disabled
                        className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm cursor-not-allowed opacity-70"
                        placeholder="Escribe tu respuesta..."
                    />
                );
            case 'paragraph':
                return (
                    <textarea
                        rows={4}
                        disabled
                        className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50/50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm cursor-not-allowed opacity-70"
                        placeholder="Escribe tu respuesta..."
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-light z-50 flex flex-col">
            <header className="bg-dark border-b border-gray-200 shadow-sm flex-shrink-0">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-secondary">Modo Previsualización</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center p-1 bg-gray-200 rounded-lg">
                             <button
                                onClick={() => setViewMode('desktop')}
                                className={`p-1.5 rounded-md ${viewMode === 'desktop' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-secondary'}`}
                                title="Vista de Escritorio"
                            >
                                <ComputerDesktopIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('mobile')}
                                className={`p-1.5 rounded-md ${viewMode === 'mobile' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-secondary'}`}
                                title="Vista Móvil"
                            >
                                <DevicePhoneMobileIcon className="w-5 h-5" />
                            </button>
                        </div>
                         <span className="w-px h-6 bg-gray-200 mx-2"></span>
                        <button onClick={onExitPreview} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-accent text-sm transition-colors">
                            Volver al Editor
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto py-8 bg-light">
                <div className={`mx-auto transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-3xl'}`}>
                     <div className={`${viewMode === 'mobile' ? 'bg-dark shadow-xl border border-gray-700 rounded-3xl p-2' : ''}`}>
                         <div className={`${viewMode === 'mobile' ? 'rounded-2xl overflow-hidden' : ''}`}>
                             <Card className="shadow-none border-none">
                                <div className="p-8">
                                    <h1 className="text-3xl font-extrabold text-secondary">{survey.title || "Título de la Encuesta"}</h1>
                                    <p className="mt-2 text-gray-500">{survey.description || "Descripción de la encuesta..."}</p>
                                </div>
                                <div className="p-8 border-t border-gray-200 space-y-8">
                                    {survey.questions.map((q, index) => (
                                        <div key={q.id}>
                                            <label className="block text-lg font-semibold text-secondary mb-3">
                                                {index + 1}. {q.text || `Pregunta ${index+1}`}
                                            </label>
                                            {renderQuestionInput(q)}
                                        </div>
                                    ))}
                                    {survey.questions.length === 0 && <p className="text-gray-500">No se han añadido preguntas todavía.</p>}
                                </div>
                                <div className="p-8 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
                                    <button type="submit" disabled
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary disabled:bg-indigo-400 cursor-not-allowed">
                                        Enviar Respuestas
                                    </button>
                                </div>
                            </Card>
                         </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SurveyPreview;
