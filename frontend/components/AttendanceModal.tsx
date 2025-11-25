import React from 'react';
import { TrainingSession } from '../types';
import { Card } from './Card';
import { XIcon } from './icons';

interface AttendanceModalProps {
    session: TrainingSession;
    onClose: () => void;
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ session, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <Card className="shadow-2xl max-h-[80vh] flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-secondary">Lista de Asistencia</h2>
                                <p className="mt-1 text-sm text-gray-500" title={session.topic}>{session.topic}</p>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-secondary transition-colors">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    <div className="p-6 overflow-y-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="p-3 text-sm font-semibold text-gray-600">Nombre</th>
                                    <th className="p-3 text-sm font-semibold text-gray-600">Departamento</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {session.attendees.map(attendee => (
                                    <tr key={attendee.id} className="hover:bg-gray-50">
                                        <td className="p-3 text-secondary">{attendee.name}</td>
                                        <td className="p-3 text-gray-600">{attendee.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {session.attendees.length === 0 && (
                            <p className="text-center py-8 text-gray-500">No hay asistentes registrados para esta sesión.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AttendanceModal;
