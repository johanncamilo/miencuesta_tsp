import React from 'react';
import { Survey } from '../types';
import SurveyCard from './SurveyCard';
import { PlusIcon } from './icons';

interface HomeProps {
    surveys: Survey[];
    onDeleteSurvey: (surveyId: string) => void;
    onEditSurvey: (surveyId: string) => void;
    onDuplicateSurvey: (surveyId: string) => void;
    onViewResults: (surveyId: string) => void;
    onNavigateToCreator: () => void;
    onTakeSurvey: (surveyId: string) => void;
    onShareSurvey: (surveyId: string) => void;
}

const Home: React.FC<HomeProps> = ({ surveys, onDeleteSurvey, onEditSurvey, onDuplicateSurvey, onViewResults, onNavigateToCreator, onTakeSurvey, onShareSurvey }) => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight">Mis Encuestas</h1>
                    <p className="mt-2 text-lg text-gray-500">Gestiona, crea y analiza todas tus encuestas en un solo lugar.</p>
                </div>
                <button
                    onClick={onNavigateToCreator}
                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105 shadow-sm w-full sm:w-auto">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Crear Nueva Encuesta
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {surveys.map((survey) => (
                    <SurveyCard 
                        key={survey.id} 
                        survey={survey} 
                        onDelete={onDeleteSurvey} 
                        onEdit={onEditSurvey}
                        onDuplicate={onDuplicateSurvey}
                        onViewResults={onViewResults}
                        onTakeSurvey={onTakeSurvey}
                        onShare={onShareSurvey}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;