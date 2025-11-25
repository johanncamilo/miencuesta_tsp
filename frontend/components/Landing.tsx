import React from 'react';
import { PencilSquareIcon, LinkIcon, ChartBarIcon } from './icons';

interface LandingProps {
    isLoggedIn?: boolean;
    onNavigateToLogin?: () => void;
    onNavigateToRegister?: () => void;
    onNavigateToDashboard?: () => void;
}

const Feature: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6">
        <div className="flex items-center justify-center h-16 w-16 mb-4 bg-indigo-100 rounded-full">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
);


const Landing: React.FC<LandingProps> = ({ isLoggedIn, onNavigateToLogin, onNavigateToRegister, onNavigateToDashboard }) => {
    return (
        <div className="min-h-screen bg-dark flex flex-col font-sans">
            <header className="absolute top-0 left-0 right-0 z-10">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-secondary">
                        Miencuesta
                    </div>
                    <div className="space-x-4 flex items-center">
                        {isLoggedIn ? (
                             <button onClick={onNavigateToDashboard} className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-accent transition-colors shadow-sm">
                                Ir al Panel
                            </button>
                        ) : (
                            <>
                                <button onClick={onNavigateToLogin} className="text-secondary font-medium hover:text-primary transition-colors">
                                    Iniciar Sesión
                                </button>
                                <button onClick={onNavigateToRegister} className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-accent transition-colors shadow-sm">
                                    Registrarse
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="flex-grow flex flex-col">
                <section className="flex-grow container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-between text-center lg:text-left pt-32 pb-16">
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-secondary tracking-tighter">
                            Tu opinión <span className="text-primary">importa.</span>
                        </h1>
                        <p className="text-lg text-gray-500 max-w-md mx-auto lg:mx-0">
                            Crea, comparte y analiza encuestas fácilmente. Transforma datos en decisiones inteligentes.
                        </p>
                        <button onClick={isLoggedIn ? onNavigateToDashboard : onNavigateToLogin} className="bg-primary text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-accent transition-transform transform hover:scale-105 shadow-lg">
                            {isLoggedIn ? 'Ir a mis encuestas' : 'Crear mi primera encuesta'}
                        </button>
                    </div>
                    <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center h-full">
                         <div className="relative w-80 h-80 md:w-96 md:h-96">
                            <div className="absolute top-0 left-0 w-64 h-64 md:w-72 md:h-72 bg-indigo-200 rounded-full opacity-60"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 md:w-64 md:h-64 bg-primary rounded-3xl opacity-80 transform rotate-12"></div>
                            <div className="absolute top-10 right-10 w-20 h-20 bg-pink-400 rounded-2xl opacity-90 transform -rotate-12"></div>
                        </div>
                    </div>
                </section>
                
                <section className="bg-light py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Feature
                                icon={<PencilSquareIcon className="w-8 h-8 text-primary" />}
                                title="Crea Encuestas Atractivas"
                                description="Diseña encuestas personalizadas con diferentes tipos de preguntas para captar la atención de tu audiencia."
                            />
                            <Feature
                                icon={<LinkIcon className="w-8 h-8 text-primary" />}
                                title="Comparte y Recopila"
                                description="Distribuye tus encuestas fácilmente y recopila respuestas en tiempo real desde cualquier dispositivo."
                            />
                            <Feature
                                icon={<ChartBarIcon className="w-8 h-8 text-primary" />}
                                title="Analiza Resultados"
                                description="Visualiza los datos con gráficos interactivos y obtén insights valiosos para tomar mejores decisiones."
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Landing;