import React, { useState } from 'react';
import { Question, QuestionType, AnswerOption } from '../types';
import { Card } from './Card';
import { DuplicateIcon, TrashIcon, CheckCircleIcon, ShortTextIcon, ParagraphIcon, XIcon, Bars3Icon } from './icons';

interface QuestionEditorProps {
    question: Question;
    onUpdate: (question: Question) => void;
    onRemove: (questionId: string) => void;
    onDuplicate: (questionId: string) => void;
}

const questionTypeOptions: { value: QuestionType, label: string, icon: React.ReactNode }[] = [
    { value: 'multiple-choice', label: 'Opción Múltiple', icon: <CheckCircleIcon className="w-5 h-5 mr-2" /> },
    { value: 'short-text', label: 'Respuesta Corta', icon: <ShortTextIcon className="w-5 h-5 mr-2" /> },
    { value: 'paragraph', label: 'Párrafo', icon: <ParagraphIcon className="w-5 h-5 mr-2" /> },
];

const TypeSelectorButton: React.FC<{
    label: string,
    icon: React.ReactNode,
    isActive: boolean,
    onClick: () => void,
}> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center p-2 rounded-md text-sm font-semibold transition-colors ${
            isActive ? 'bg-primary text-white shadow' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
    >
        {icon} {label}
    </button>
);


const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onUpdate, onRemove, onDuplicate }) => {
    
    const [draggedOptionId, setDraggedOptionId] = useState<string | null>(null);
    const [dropTargetOptionIndex, setDropTargetOptionIndex] = useState<number | null>(null);


    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate({ ...question, text: e.target.value });
    };

    const handleTypeChange = (newType: QuestionType) => {
        const newOptions = newType === 'multiple-choice' && question.options.length === 0 
            ? [{ id: crypto.randomUUID(), value: 'Opción 1' }] 
            : newType !== 'multiple-choice' ? [] : question.options;
            
        onUpdate({ ...question, type: newType, options: newOptions });
    };

    const handleOptionChange = (optionId: string, value: string) => {
        const newOptions = question.options.map(opt =>
            opt.id === optionId ? { ...opt, value } : opt
        );
        onUpdate({ ...question, options: newOptions });
    };

    const addOption = () => {
        const newOption: AnswerOption = {
            id: crypto.randomUUID(),
            value: `Opción ${question.options.length + 1}`
        };
        onUpdate({ ...question, options: [...question.options, newOption] });
    };
    
    const removeOption = (optionId: string) => {
        if (question.options.length <= 1) return; // Must have at least one option
        const newOptions = question.options.filter(opt => opt.id !== optionId);
        onUpdate({ ...question, options: newOptions });
    }

    // Option Drag and Drop Handlers
    const handleOptionDragStart = (e: React.DragEvent, optionId: string) => {
        setDraggedOptionId(optionId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleOptionDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (dropTargetOptionIndex !== index) {
            setDropTargetOptionIndex(index);
        }
    };

    const handleOptionDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedOptionId === null || dropTargetOptionIndex === null) return;
        
        const draggedIndex = question.options.findIndex(opt => opt.id === draggedOptionId);
        if (draggedIndex === -1) return;

        const newOptions = [...question.options];
        const [draggedItem] = newOptions.splice(draggedIndex, 1);
        newOptions.splice(dropTargetOptionIndex, 0, draggedItem);

        onUpdate({ ...question, options: newOptions });
        setDraggedOptionId(null);
        setDropTargetOptionIndex(null);
    };

    const handleOptionDragEnd = () => {
        setDraggedOptionId(null);
        setDropTargetOptionIndex(null);
    };


    return (
        <Card>
            <div className="p-6 space-y-6">
                <input
                    type="text"
                    placeholder="Escribe tu pregunta aquí..."
                    value={question.text}
                    onChange={handleTextChange}
                    className="w-full text-lg font-semibold border-0 p-1 -ml-1 focus:ring-0 focus:border-b focus:border-primary transition-colors placeholder-gray-500"
                />
                
                <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1">
                    {questionTypeOptions.map(opt => (
                        <TypeSelectorButton 
                            key={opt.value}
                            label={opt.label}
                            icon={opt.icon}
                            isActive={question.type === opt.value}
                            onClick={() => handleTypeChange(opt.value)}
                        />
                    ))}
                </div>
                
                <div>
                    {question.type === 'multiple-choice' && (
                        <div className="space-y-3 mt-4" onDragOver={(e) => e.preventDefault()}>
                            {question.options.map((option, index) => (
                                <div key={option.id} onDrop={handleOptionDrop} onDragOver={(e) => handleOptionDragOver(e, index)}>
                                    {dropTargetOptionIndex === index && <div className="h-1 bg-indigo-200 rounded-full my-1"></div>}
                                    <div 
                                        className={`flex items-center group transition-all duration-150 ${draggedOptionId === option.id ? 'opacity-60 bg-white scale-[1.01] shadow-lg rounded-md' : ''}`}
                                    >
                                        <div 
                                            draggable
                                            onDragStart={(e) => handleOptionDragStart(e, option.id)}
                                            onDragEnd={handleOptionDragEnd}
                                            className="cursor-grab p-1"
                                        >
                                            <Bars3Icon className="w-5 h-5 text-gray-400 mr-2"/>
                                        </div>
                                        <input
                                            type="text"
                                            value={option.value}
                                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                            className="flex-grow text-base border-0 border-b border-gray-200 focus:ring-0 focus:border-primary p-2 bg-transparent"
                                        />
                                        <button onClick={() => removeOption(option.id)} className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" title="Eliminar Opción">
                                            <XIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {dropTargetOptionIndex === question.options.length && <div className="h-1 bg-indigo-200 rounded-full my-1"></div>}

                            <div className="flex items-center mt-3 pt-2 border-t border-dashed">
                                <div className="w-5 mr-3"></div> {/* Spacer */}
                                <button onClick={addOption} className="text-sm text-primary font-semibold hover:text-accent p-2">
                                    Añadir opción
                                </button>
                            </div>
                        </div>
                    )}
                    {question.type === 'short-text' && (
                        <div className="mt-4 p-2 border-b-2 border-dotted border-gray-300">
                           <p className="text-gray-400">Texto de respuesta corta</p>
                        </div>
                    )}
                    {question.type === 'paragraph' && (
                         <div className="mt-4 p-2 border-b-2 border-dotted border-gray-300">
                           <p className="text-gray-400">Texto de respuesta larga</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50/50 p-3 flex justify-end items-center space-x-3">
                 <button onClick={() => onDuplicate(question.id)} className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-secondary rounded-md hover:bg-gray-200 transition-colors" title="Duplicar">
                    <DuplicateIcon className="w-4 h-4 mr-2"/>
                    Duplicar
                </button>
                <button onClick={() => onRemove(question.id)} className="flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 rounded-md hover:bg-red-50 transition-colors" title="Eliminar">
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Eliminar
                </button>
            </div>
        </Card>
    );
};

export default QuestionEditor;