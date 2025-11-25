import React, { useState } from 'react';
import { Survey, Question } from '../types';
import { Card } from './Card';
import { CheckIcon } from './icons';

interface SurveyTakerProps {
    survey: Survey;
    onSubmit: (surveyId: string) => void;
    onBackToHome: () => void;
}

const SurveyTaker: React.FC<SurveyTakerProps> = ({ survey, onSubmit, onBackToHome }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate submission delay
        setTimeout(() => {
            onSubmit(survey.id);
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light p-4">
                <Card className="max-w-2xl w-full">
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckIcon className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-secondary">¡Gracias por tu respuesta!</h2>
                        <p className="mt-2 text-gray-500">
                            Tu opinión ha sido registrada. Valoramos tu tiempo y tus comentarios.
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={onBackToHome}
                                className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-accent shadow-sm transition-all"
                            >
                                Volver al Inicio
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    const renderQuestionInput = (question: Question) => {
        switch (question.type) {
            case 'multiple-choice':
                return (
                    <div className="space-y-3">
                        {question.options.map(option => (
                            <label key={option.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 has-[:checked]:bg-indigo-50 has-[:checked]:border-primary transition-colors">
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option.value}
                                    required
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <span className="ml-3 text-secondary">{option.value}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'short-text':
                return (
                    <input
                        type="text"
                        required
                        className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Escribe tu respuesta..."
                    />
                );
            case 'paragraph':
                return (
                    <textarea
                        rows={4}
                        required
                        className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        placeholder="Escribe tu respuesta..."
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-light py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <div className="p-8">
                        <h1 className="text-3xl font-extrabold text-secondary">{survey.title}</h1>
                        <p className="mt-2 text-gray-500">{survey.description}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-8 border-t border-gray-200 space-y-8">
                            {survey.questions.map((q, index) => (
                                <div key={q.id}>
                                    <label className="block text-lg font-semibold text-secondary mb-3">
                                        {index + 1}. {q.text}
                                    </label>
                                    {renderQuestionInput(q)}
                                </div>
                            ))}
                        </div>
                        <div className="p-8 border-t border-gray-200 bg-gray-50/50 rounded-b-xl">
                            <button type="submit" disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-indigo-400 transition-colors">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </>
                                ) : 'Enviar Respuestas'}
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default SurveyTaker;
