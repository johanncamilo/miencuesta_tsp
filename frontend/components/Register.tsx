import React, { useState } from 'react';
import { SurveyIcon } from './icons';

interface RegisterProps {
    onRegister: () => void;
    onNavigateToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigateToLogin }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            onRegister();
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-light p-4">
            <div className="w-full max-w-md bg-dark rounded-2xl shadow-xl p-8 space-y-8 border border-gray-200">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <SurveyIcon className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-secondary">Crea tu cuenta</h2>
                    <p className="mt-2 text-gray-500">Únete a Miencuesta hoy mismo</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="full-name" className="sr-only">Nombre Completo</label>
                            <input id="full-name" name="name" type="text" autoComplete="name" required
                                   className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Nombre Completo" />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Correo Electrónico</label>
                            <input id="email-address-register" name="email" type="email" autoComplete="email" required
                                   className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Correo Electrónico" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password-register" name="password" type="password" autoComplete="new-password" required
                                   className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Contraseña" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-300">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creando cuenta...
                                </>
                            ) : 'Crear Cuenta'}
                        </button>
                    </div>
                    <p className="text-center text-sm text-gray-500">
                        ¿Ya tienes una cuenta? <button type="button" onClick={onNavigateToLogin} className="font-medium text-primary hover:text-accent focus:outline-none">Inicia Sesión</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
