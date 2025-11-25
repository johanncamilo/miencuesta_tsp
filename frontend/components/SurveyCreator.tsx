import React, { useState, useEffect } from 'react';
import { Question, QuestionType, Survey } from '../types';
import QuestionEditor from './QuestionEditor';
import { Card } from './Card';
import { PlusIcon, CheckCircleIcon, ShortTextIcon, ParagraphIcon, ClipboardDocumentListIcon, EyeIcon } from './icons';

interface SurveyCreatorProps {
    onBack: () => void;
    onSave: (surveyData: { id?: string; title: string; description: string; questions: Question[] }, saveAsDraft?: boolean) => void;
    surveyToEdit?: Survey | null;
    onPreview: (surveyData: { title: string; description: string; questions: Question[] }) => void;
}

const ToolButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
     <button onClick={onClick} className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-left text-sm transition-colors group">
        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-indigo-100 transition-colors">
            {icon}
        </div>
        <span className="ml-4 font-semibold text-gray-700">{label}</span>
    </button>
)


const SurveyCreator: React.FC<SurveyCreatorProps> = ({ onBack, onSave, surveyToEdit, onPreview }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    
    // Drag and drop state for questions
    const [draggedQuestionId, setDraggedQuestionId] = useState<string | null>(null);
    const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

    const isEditing = !!surveyToEdit;
    const isDraft = isEditing && surveyToEdit.status === 'draft';

    useEffect(() => {
        if (isEditing && surveyToEdit) {
            setTitle(surveyToEdit.title);
            setDescription(surveyToEdit.description);
            setQuestions(surveyToEdit.questions);
        }
    }, [isEditing, surveyToEdit]);

    const createNewQuestion = (type: QuestionType): Question => {
        const newQuestion: Question = {
            id: crypto.randomUUID(),
            text: '',
            type,
            options: type === 'multiple-choice' ? [{ id: crypto.randomUUID(), value: 'Opción 1' }] : [],
        };
        return newQuestion;
    };
    
    const addQuestion = (type: QuestionType) => {
        setQuestions([...questions, createNewQuestion(type)]);
    };

    const updateQuestion = (updatedQuestion: Question) => {
        setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
    };

    const removeQuestion = (questionId: string) => {
        setQuestions(questions.filter(q => q.id !== questionId));
    };
    
    const duplicateQuestion = (questionId: string) => {
        const questionToDuplicate = questions.find(q => q.id === questionId);
        if (questionToDuplicate) {
            const duplicatedQuestion = {
                ...questionToDuplicate,
                id: crypto.randomUUID(),
                 options: questionToDuplicate.options.map(o => ({...o, id: crypto.randomUUID() }))
            };
            const index = questions.findIndex(q => q.id === questionId);
            const newQuestions = [...questions];
            newQuestions.splice(index + 1, 0, duplicatedQuestion);
            setQuestions(newQuestions);
        }
    };
    
    const handleSave = (saveAsDraft: boolean = false) => {
        if (!title.trim()) {
            alert('Por favor, añade un título a tu encuesta antes de guardarla.');
            return;
        }
        onSave({ 
            id: isEditing ? surveyToEdit.id : undefined,
            title, 
            description, 
            questions 
        }, saveAsDraft);
    };
    
     const handlePreviewClick = () => {
        onPreview({ title, description, questions });
    };
    
    // Question Drag and Drop Handlers
    const handleQuestionDragStart = (e: React.DragEvent, questionId: string) => {
        setDraggedQuestionId(questionId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleQuestionDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (dropTargetIndex !== index) {
            setDropTargetIndex(index);
        }
    };
    
    const handleQuestionDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedQuestionId === null || dropTargetIndex === null) return;

        const draggedIndex = questions.findIndex(q => q.id === draggedQuestionId);
        if (draggedIndex === -1) return;

        const newQuestions = [...questions];
        const [draggedItem] = newQuestions.splice(draggedIndex, 1);
        newQuestions.splice(dropTargetIndex, 0, draggedItem);
        
        setQuestions(newQuestions);
        setDraggedQuestionId(null);
        setDropTargetIndex(null);
    };

    const handleQuestionDragEnd = () => {
        setDraggedQuestionId(null);
        setDropTargetIndex(null);
    };


    return (
        <div className="container mx-auto max-w-5xl">
             <div className="mb-8 flex justify-between items-center">
                <div>
                    <button onClick={onBack} className="text-sm font-medium text-primary hover:text-accent transition-colors">
                        &larr; Volver a Mis Encuestas
                    </button>
                    <h1 className="text-4xl font-extrabold text-secondary tracking-tight mt-2">{isEditing ? 'Editar Encuesta' : 'Creador de Encuestas'}</h1>
                </div>
                 <div className="flex items-center gap-3">
                    <button 
                        onClick={handlePreviewClick} 
                        className="flex items-center px-5 py-2.5 bg-white text-secondary font-semibold rounded-lg border border-gray-300 hover:bg-gray-100 shadow-sm transition-all transform hover:scale-105">
                        <EyeIcon className="w-5 h-5 mr-2" />
                        Previsualizar
                    </button>
                    <button onClick={() => handleSave()} className="flex items-center px-5 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-accent shadow-sm transition-all transform hover:scale-105">
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        {isDraft ? 'Publicar' : isEditing ? 'Actualizar Encuesta' : 'Guardar y Publicar'}
                    </button>
                </div>
            </div>

            <div className="flex items-start gap-8">
                <div className="w-full lg:w-3/4 space-y-4">
                    <Card>
                       <div className="p-8">
                           <input
                               type="text"
                               placeholder="Título de la Encuesta"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                               className="w-full text-3xl font-bold border-0 p-2 -ml-2 focus:ring-0 focus:border-b-2 focus:border-primary transition-colors placeholder-gray-400"
                           />
                           <textarea
                               placeholder="Añade una descripción (opcional)..."
                               value={description}
                               onChange={(e) => setDescription(e.target.value)}
                               rows={2}
                               className="w-full mt-2 text-base border-0 p-2 -ml-2 focus:ring-0 focus:border-b-2 focus:border-primary transition-colors resize-none placeholder-gray-500"
                           />
                       </div>
                    </Card>

                    <div className="space-y-4" onDragOver={(e) => e.preventDefault()}>
                        {questions.map((question, index) => (
                           <div key={question.id} onDrop={handleQuestionDrop} onDragOver={(e) => handleQuestionDragOver(e, index)}>
                                {dropTargetIndex === index && <div className="h-1 bg-primary rounded-full my-2 animate-pulse"></div>}
                                <div
                                    draggable
                                    onDragStart={(e) => handleQuestionDragStart(e, question.id)}
                                    onDragEnd={handleQuestionDragEnd}
                                    className={`cursor-grab ${draggedQuestionId === question.id ? 'opacity-50' : ''}`}
                                >
                                    <QuestionEditor
                                        question={question}
                                        onUpdate={updateQuestion}
                                        onRemove={removeQuestion}
                                        onDuplicate={duplicateQuestion}
                                    />
                                </div>
                            </div>
                        ))}
                         {dropTargetIndex === questions.length && <div className="h-1 bg-primary rounded-full my-2 animate-pulse"></div>}
                    </div>

                     {questions.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg bg-dark">
                            <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-4 text-lg font-semibold text-secondary">Tu encuesta está vacía</h3>
                            <p className="mt-1 text-gray-500">Añade tu primera pregunta usando la caja de herramientas.</p>
                        </div>
                    )}
                </div>

                <div className="w-1/4 sticky top-8 hidden lg:block">
                     <Card>
                        <div className="p-4 space-y-2">
                            <h3 className="font-bold text-secondary mb-2 px-2">Herramientas</h3>
                             <ToolButton onClick={() => addQuestion('multiple-choice')} label="Opción Múltiple" icon={<CheckCircleIcon className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors"/>} />
                             <ToolButton onClick={() => addQuestion('short-text')} label="Respuesta Corta" icon={<ShortTextIcon className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors"/>} />
                             <ToolButton onClick={() => addQuestion('paragraph')} label="Párrafo" icon={<ParagraphIcon className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors"/>} />
                        </div>
                    </Card>
                </div>
            </div>
             <div className="lg:hidden fixed bottom-4 right-4 z-20">
                <button onClick={() => addQuestion('multiple-choice')} className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-accent transform transition-transform hover:scale-110">
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default SurveyCreator;