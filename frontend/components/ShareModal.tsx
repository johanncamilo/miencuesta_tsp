import React, { useState, useEffect } from 'react';
import { Survey } from '../types';
import { Card } from './Card';
import { XIcon, CheckIcon, ClipboardDocumentListIcon } from './icons';

interface ShareModalProps {
    survey: Survey;
    onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ survey, onClose }) => {
    const [copied, setCopied] = useState(false);
    const [shareLink, setShareLink] = useState('');

    useEffect(() => {
        // Construct the link only on the client-side
        setShareLink(`${window.location.origin}${window.location.pathname}?surveyId=${survey.id}`);
    }, [survey.id]);
    
    const handleCopy = () => {
        if (!shareLink) return;
        navigator.clipboard.writeText(shareLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={onClose}>
            <div className="relative w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <Card className="shadow-2xl">
                    <div className="p-6">
                        <div className="flex justify-between items-start">
                             <div>
                                <h2 className="text-xl font-bold text-secondary">Compartir Encuesta</h2>
                                <p className="mt-1 text-sm text-gray-500 truncate" title={survey.title}>{survey.title}</p>
                            </div>
                            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-secondary transition-colors">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                       
                        <div className="mt-6">
                            <p className="text-sm font-medium text-secondary mb-2">Enlace para compartir</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={shareLink}
                                    className="relative block w-full px-4 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                />
                                <button
                                    onClick={handleCopy}
                                    className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-300 w-32 ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-accent'}`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckIcon className="w-5 h-5 mr-2"/>
                                            ¡Copiado!
                                        </>
                                    ) : (
                                        <>
                                            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                                            Copiar
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Cualquier persona con el enlace podrá responder esta encuesta.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ShareModal;
