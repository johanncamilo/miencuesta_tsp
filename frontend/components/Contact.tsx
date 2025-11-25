import React, { useState } from 'react';
import { Card } from './Card';
import { CheckIcon, MailIcon } from './icons';

const Contact: React.FC = () => {
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
            <div className="max-w-2xl mx-auto py-12">
                <Card>
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckIcon className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-secondary">¡Mensaje Enviado!</h2>
                        <p className="mt-2 text-gray-500">
                            Gracias por contactarnos. Nos pondremos en contacto contigo a la brevedad.
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-secondary sm:text-5xl">Contáctanos</h1>
                <p className="mt-4 text-xl text-gray-500">¿Tienes alguna pregunta o comentario? Nos encantaría saber de ti.</p>
            </div>
            <Card>
                <div className="p-8">
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-secondary">Nombre Completo</label>
                                <input type="text" name="full-name" id="full-name" required className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label htmlFor="email-contact" className="block text-sm font-medium text-secondary">Correo electrónico</label>
                                <input type="email" name="email-contact" id="email-contact" required defaultValue="demo@miencuesta.com" className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="tu@email.com"/>
                            </div>
                             <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-secondary">Asunto</label>
                                <input type="text" name="subject" id="subject" required className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="¿Sobre qué quieres hablar?" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-secondary">Mensaje</label>
                                <textarea id="message" name="message" rows={4} required className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Escribe tu mensaje aquí..."></textarea>
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
                                ) : 'Enviar Mensaje'}
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default Contact;