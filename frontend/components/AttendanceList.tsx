import React from 'react';
import { TrainingSession } from '../types';
import { Card } from './Card';
import { EyeIcon } from './icons';

interface AttendanceListProps {
    sessions: TrainingSession[];
    onViewAttendance: (session: TrainingSession) => void;
}

const statusMap = {
    Programada: 'bg-blue-100 text-blue-800',
    Realizada: 'bg-green-100 text-green-800',
    Cancelada: 'bg-red-100 text-red-800',
};

const AttendanceList: React.FC<AttendanceListProps> = ({ sessions, onViewAttendance }) => {
    return (
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-gray-600">Capacitación</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Fecha</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Instructor</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Asistentes</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Estado</th>
                            <th className="p-4 text-sm font-semibold text-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sessions.map(session => (
                            <tr key={session.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-secondary whitespace-nowrap">{session.topic}</td>
                                <td className="p-4 text-gray-600 whitespace-nowrap">{session.date}</td>
                                <td className="p-4 text-gray-600 whitespace-nowrap">{session.instructor}</td>
                                <td className="p-4 text-gray-600">{session.attendees.length}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[session.status]}`}>
                                        {session.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button onClick={() => onViewAttendance(session)} className="flex items-center text-primary hover:text-accent text-sm font-medium">
                                        <EyeIcon className="w-5 h-5 mr-1" />
                                        Ver Asistentes
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {sessions.length === 0 && (
                    <p className="text-center py-12 text-gray-500">No hay sesiones de capacitación programadas.</p>
                )}
            </div>
        </Card>
    );
};

export default AttendanceList;
