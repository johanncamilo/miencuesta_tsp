import React, { useState } from 'react';
import { Card } from './Card';
import { CheckIcon } from './icons';

const TrainingRequest: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 2000);
    };

    if (isSent) {
        return (
            <Card>
                <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <CheckIcon className="w-10 h-10 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-secondary">¡Solicitud Enviada!</h2>
                    <p className="mt-2 text-gray-500">
                        Gracias por tu solicitud. El departamento de RRHH la revisará pronto.
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="p-8">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="training-topic" className="block text-sm font-medium text-secondary">Tema de la Capacitación</label>
                            <input type="text" name="training-topic" id="training-topic" required className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Ej: Liderazgo Efectivo" />
                        </div>
                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-secondary">Justificación</label>
                            <textarea id="reason" name="reason" rows={4} required className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Explica por qué esta capacitación es necesaria..."></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary">Departamentos Sugeridos</label>
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {['Ventas', 'Marketing', 'TI', 'RRHH', 'Operaciones', 'Finanzas'].map(dept => (
                                    <label key={dept} className="flex items-center">
                                        <input type="checkbox" name="departments" value={dept} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                        <span className="ml-2 text-secondary text-sm">{dept}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
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
                            ) : 'Enviar Solicitud'}
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default TrainingRequest;
