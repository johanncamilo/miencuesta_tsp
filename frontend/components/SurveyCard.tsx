import React, { useState, useRef, useEffect } from 'react';
import { Survey } from '../types';
import { Card } from './Card';
import { ChartBarIcon, LinkIcon, DotsVerticalIcon, PencilSquareIcon, TrashIcon, DuplicateIcon, ShareIcon } from './icons';

interface SurveyCardProps {
    survey: Survey;
    onDelete: (surveyId: string) => void;
    onEdit: (surveyId: string) => void;
    onDuplicate: (surveyId: string) => void;
    onViewResults: (surveyId: string) => void;
    onTakeSurvey: (surveyId: string) => void;
    onShare: (surveyId: string) => void;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onDelete, onEdit, onDuplicate, onViewResults, onTakeSurvey, onShare }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const statusMap = {
        active: { bg: 'bg-green-100 text-green-800', text: 'Activa' },
        closed: { bg: 'bg-gray-100 text-gray-800', text: 'Cerrada' },
        draft: { bg: 'bg-yellow-100 text-yellow-800', text: 'Borrador' },
    };
    const { bg: statusBg, text: statusText } = statusMap[survey.status];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta encuesta? Esta acción no se puede deshacer.')) {
            onDelete(survey.id);
        }
        setMenuOpen(false);
    }

    const handleEdit = () => {
        onEdit(survey.id);
        setMenuOpen(false);
    }
    
    const handleDuplicate = () => {
        onDuplicate(survey.id);
        setMenuOpen(false);
    }
    
    const handleViewResults = (e: React.MouseEvent) => {
        e.stopPropagation();
        onViewResults(survey.id);
    }
    
    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        onShare(survey.id);
    };

    const handleTakeSurvey = (e: React.MouseEvent) => {
        e.stopPropagation();
        onTakeSurvey(survey.id);
    };

    return (
        <Card className="flex flex-col group cursor-pointer" onClick={handleEdit}>
            <div className="p-6 flex-grow">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusBg}`}>{statusText}</span>
                <h3 className="mt-4 text-lg font-bold text-secondary group-hover:text-primary transition-colors truncate" title={survey.title}>
                    {survey.title}
                </h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{survey.responses} Respuestas</span>
                    <span className="mx-2">&middot;</span>
                    <span>{survey.createdAt}</span>
                </div>
            </div>
            <div className="border-t border-gray-200 p-3 flex justify-end items-center bg-gray-50/50 rounded-b-xl space-x-2" onClick={e => e.stopPropagation()}>
                <button onClick={handleViewResults} title="Ver Resultados" className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-indigo-50 transition-colors">
                    <ChartBarIcon className="w-5 h-5" />
                </button>
                <button onClick={handleShare} title="Compartir Encuesta" className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-indigo-50 transition-colors">
                    <ShareIcon className="w-5 h-5" />
                </button>
                <button onClick={handleTakeSurvey} title="Tomar Encuesta" className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-indigo-50 transition-colors">
                    <LinkIcon className="w-5 h-5" />
                </button>
                 <div className="relative" ref={menuRef}>
                    <button 
                        title="Más Opciones"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-gray-400 hover:text-primary rounded-full hover:bg-indigo-50 transition-colors"
                    >
                        <DotsVerticalIcon className="w-5 h-5" />
                    </button>
                    {menuOpen && (
                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-dark rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 py-1">
                            <button onClick={handleEdit} className="flex items-center w-full text-left px-4 py-2 text-sm text-secondary hover:bg-gray-100">
                               <PencilSquareIcon className="w-4 h-4 mr-3" /> Editar
                            </button>
                             <button onClick={handleDuplicate} className="flex items-center w-full text-left px-4 py-2 text-sm text-secondary hover:bg-gray-100">
                               <DuplicateIcon className="w-4 h-4 mr-3" /> Duplicar
                            </button>
                            <button onClick={handleDelete} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700">
                               <TrashIcon className="w-4 h-4 mr-3" /> Eliminar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default SurveyCard;