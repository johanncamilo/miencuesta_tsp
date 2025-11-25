import React, { useState } from 'react';
import { SurveyIcon } from './icons';

interface LoginProps {
    onLogin: (rememberMe: boolean) => void;
    onNavigateToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToRegister }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onLogin(rememberMe);
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
                    <h2 className="text-3xl font-extrabold text-secondary">Miencuesta</h2>
                    <p className="mt-2 text-gray-500">Inicia sesión para continuar</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Correo Electrónico</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required
                                   className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Correo Electrónico" defaultValue="demo@miencuesta.com" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                   className="relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                   placeholder="Contraseña" defaultValue="password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary">
                                Recordarme
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:text-accent">
                                ¿Olvidaste tu contraseña?
                            </a>
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
                                  Iniciando...
                                </>
                            ) : 'Iniciar Sesión'}
                        </button>
                    </div>
                     <p className="text-center text-sm text-gray-500">
                        ¿No tienes una cuenta? <button type="button" onClick={onNavigateToRegister} className="font-medium text-primary hover:text-accent focus:outline-none">Regístrate</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;