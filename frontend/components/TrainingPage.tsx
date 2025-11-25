import React, { useState } from 'react';
import TrainingRequest from './TrainingRequest';
import AttendanceList from './AttendanceList';
import { TrainingSession } from '../types';

interface TrainingPageProps {
    sessions: TrainingSession[];
    onViewAttendance: (session: TrainingSession) => void;
}

const TrainingPage: React.FC<TrainingPageProps> = ({ sessions, onViewAttendance }) => {
    const [activeTab, setActiveTab] = useState<'request' | 'list'>('request');

    const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 w-full text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-primary text-white shadow' : 'text-gray-500 hover:bg-gray-200'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight">Gestión de Capacitaciones</h1>
                    <p className="mt-2 text-lg text-gray-500">Solicita nuevas formaciones y consulta la asistencia a eventos pasados.</p>
                </div>
            </div>

            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg max-w-md">
                <TabButton label="Solicitar Capacitación" isActive={activeTab === 'request'} onClick={() => setActiveTab('request')} />
                <TabButton label="Listado de Asistencia" isActive={activeTab === 'list'} onClick={() => setActiveTab('list')} />
            </div>

            <div className="mt-6">
                {activeTab === 'request' && <TrainingRequest />}
                {activeTab === 'list' && <AttendanceList sessions={sessions} onViewAttendance={onViewAttendance} />}
            </div>
        </div>
    );
};

export default TrainingPage;
