import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Pricing from './components/Pricing';
import Landing from './components/Landing';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import SurveyCreator from './components/SurveyCreator';
import SurveyResults from './components/SurveyResults';
import { Page, PricingPlan, Survey, Question, TrainingSession, Attendee } from './types';
import SurveyTaker from './components/SurveyTaker';
import SurveyPreview from './components/SurveyPreview';
import ShareModal from './components/ShareModal';
import TrainingPage from './components/TrainingPage';
import AttendanceModal from './components/AttendanceModal';

const initialSurveys: Survey[] = [
    {
        id: '1',
        title: 'Satisfacción del cliente con la atención telefónica',
        description: 'Encuesta para medir la calidad del soporte recibido por nuestros clientes.',
        questions: [
            { id: 'q1', text: 'En una escala del 1 al 5, ¿cómo calificaría la amabilidad del agente?', type: 'multiple-choice', options: [{id: 'o1', value: '1 - Pobre'}, {id: 'o2', value: '2 - Regular'}, {id: 'o3', value: '3 - Bueno'}, {id: 'o4', value: '4 - Muy Bueno'}, {id: 'o5', value: '5 - Excelente'}] },
            { id: 'q2', text: '¿Su problema fue resuelto en la primera llamada?', type: 'multiple-choice', options: [{id: 'o6', value: 'Sí'}, {id: 'o7', value: 'No'}] },
            { id: 'q3', text: '¿Qué podríamos mejorar?', type: 'paragraph', options: [] },
        ],
        status: 'active',
        responses: 182,
        createdAt: '15/07/2024',
    },
    {
        id: '2',
        title: 'Percepción de aseo en espacios de la empresa',
        description: 'Feedback interno sobre la limpieza de nuestras instalaciones.',
        questions: [
            { id: 'q4', text: '¿Cómo califica la limpieza general de las oficinas?', type: 'multiple-choice', options: [{id: 'o8', value: 'Excelente'}, {id: 'o9', value: 'Buena'}, {id: 'o10', value: 'Regular'}, {id: 'o11', value: 'Mala'}] },
            { id: 'q5', text: '¿Qué área considera que necesita más atención?', type: 'short-text', options: [] },
        ],
        status: 'draft',
        responses: 74,
        createdAt: '12/07/2024',
    },
    {
        id: '3',
        title: 'Satisfacción del cliente con el envío de productos',
        description: 'Evaluación del proceso de logística y entrega de productos.',
        questions: [],
        status: 'closed',
        responses: 531,
        createdAt: '01/06/2024',
    },
    {
        id: '4',
        title: 'Identificación de necesidades de capacitación',
        description: 'Encuesta para el equipo sobre nuevas áreas de formación profesional.',
        questions: [
            { id: 'q6', text: '¿En qué área te gustaría recibir más capacitación?', type: 'multiple-choice', options: [{id: 'o12', value: 'Tecnología'}, {id: 'o13', value: 'Habilidades blandas'}, {id: 'o14', value: 'Idiomas'}, {id: 'o15', value: 'Otro'}] },
            { id: 'q7', text: 'Si eligió "Otro", por favor especifique:', type: 'short-text', options: [] },
        ],
        status: 'active',
        responses: 45,
        createdAt: '18/07/2024',
    },
    {
        id: '5',
        title: 'Satisfacción de empleados post-capacitación',
        description: 'Feedback sobre la utilidad de los cursos de formación recientes.',
        questions: [],
        status: 'closed',
        responses: 88,
        createdAt: '25/05/2024',
    },
     {
        id: '6',
        title: 'Satisfacción del cliente con el uso del producto X',
        description: 'Medición de la experiencia de usuario con nuestro producto estrella.',
        questions: [],
        status: 'closed',
        responses: 1204,
        createdAt: '10/04/2024',
    },
];

const mockAttendees: Attendee[] = [
    { id: 'a1', name: 'Juan Pérez', department: 'Ventas' },
    { id: 'a2', name: 'Ana Gómez', department: 'Marketing' },
    { id: 'a3', name: 'Carlos Ruiz', department: 'TI' },
    { id: 'a4', name: 'Sofía López', department: 'Ventas' },
    { id: 'a5', name: 'Luis Fernández', department: 'RRHH' },
    { id: 'a6', name: 'Laura Martínez', department: 'Marketing' },
];

const initialTrainingSessions: TrainingSession[] = [
    {
        id: 't1',
        topic: 'Técnicas de Venta Avanzadas',
        date: '25/07/2024',
        instructor: 'Ricardo Morales',
        attendees: mockAttendees.slice(0, 3),
        status: 'Realizada',
    },
    {
        id: 't2',
        topic: 'Introducción a React',
        date: '10/08/2024',
        instructor: 'Isabel Castillo',
        attendees: mockAttendees.slice(2, 5),
        status: 'Programada',
    },
    {
        id: 't3',
        topic: 'Marketing Digital 2024',
        date: '05/07/2024',
        instructor: 'Mónica Díaz',
        attendees: mockAttendees.slice(1, 6),
        status: 'Realizada',
    },
    {
        id: 't4',
        topic: 'Gestión del Tiempo',
        date: '15/08/2024',
        instructor: 'Jorge Torres',
        attendees: [],
        status: 'Programada',
    },
     {
        id: 't5',
        topic: 'Seguridad Informática',
        date: '20/06/2024',
        instructor: 'Carlos Ruiz',
        attendees: [],
        status: 'Cancelada',
    },
];


const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [authPage, setAuthPage] = useState<'landing' | 'login' | 'register'>('landing');
    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
    const [userPlan, setUserPlan] = useState<string>('Básico');
    const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
    const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);
    const [viewingSurvey, setViewingSurvey] = useState<Survey | null>(null);
    const [takingSurvey, setTakingSurvey] = useState<Survey | null>(null);
    const [previewingSurvey, setPreviewingSurvey] = useState<Survey | null>(null);
    const [sharingSurvey, setSharingSurvey] = useState<Survey | null>(null);
    const [showPostLoginLanding, setShowPostLoginLanding] = useState<boolean>(false);
    const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(initialTrainingSessions);
    const [viewingAttendance, setViewingAttendance] = useState<TrainingSession | null>(null);

    useEffect(() => {
        const rememberUser = localStorage.getItem('rememberUser');
        if (rememberUser === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const surveyId = urlParams.get('surveyId');
        if (surveyId) {
            const surveyToTake = surveys.find(s => s.id === surveyId);
            if (surveyToTake) {
                setTakingSurvey(surveyToTake);
                setCurrentPage('take-survey');
            }
        }
    }, [surveys]);


    const handleLogin = (rememberMe: boolean) => {
        setIsLoggedIn(true);
        setShowPostLoginLanding(true);
        setCurrentPage('home');
        if (rememberMe) {
            localStorage.setItem('rememberUser', 'true');
        } else {
            localStorage.removeItem('rememberUser');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAuthPage('landing');
        setShowPostLoginLanding(false);
        setUserPlan('Básico'); // Reset plan on logout
        localStorage.removeItem('rememberUser');
    };

    const handleNavigation = (page: Page) => {
        setShowPostLoginLanding(false);
        if (page !== 'checkout') {
            setCurrentPage(page);
        }
    };
    
    const navigateToLogin = () => {
        setAuthPage('login');
    };

    const navigateToRegister = () => {
        setAuthPage('register');
    }

    const handleSelectPlan = (plan: PricingPlan) => {
        setSelectedPlan(plan);
        setCurrentPage('checkout');
    };
    
    const handleCheckoutComplete = (planName: string) => {
        setUserPlan(planName);
        setTimeout(() => {
            setCurrentPage('home');
            setSelectedPlan(null);
        }, 2500);
    };

    const handleBackToPricing = () => {
        setCurrentPage('pricing');
        setSelectedPlan(null);
    }

    const handleNavigateToCreator = () => {
        setCurrentPage('create-survey');
    }
    
    const handleGoToDashboard = () => {
        setShowPostLoginLanding(false);
        setCurrentPage('home');
    };

    const handleBackToHome = () => {
        setCurrentPage('home');
        setEditingSurvey(null);
        setViewingSurvey(null);
        setTakingSurvey(null);
    }

    const handleSaveOrUpdateSurvey = (surveyData: { id?: string; title: string; description: string; questions: Question[] }, saveAsDraft: boolean = false) => {
        if (surveyData.id) {
            // Update existing survey
            setSurveys(surveys.map(s => {
                if (s.id === surveyData.id) {
                    const currentStatus = s.status === 'draft' && !saveAsDraft ? 'active' : s.status;
                    return {
                        ...s,
                        title: surveyData.title,
                        description: surveyData.description,
                        questions: surveyData.questions,
                        status: currentStatus,
                    };
                }
                return s;
            }));
        } else {
            // Create new survey
            const newSurvey: Survey = {
                id: crypto.randomUUID(),
                title: surveyData.title,
                description: surveyData.description,
                questions: surveyData.questions,
                status: saveAsDraft ? 'draft' : 'active',
                responses: 0,
                createdAt: new Date().toLocaleDateString('es-ES'),
            };
            setSurveys([newSurvey, ...surveys]);
        }
        setCurrentPage('home');
        setEditingSurvey(null);
    };

    const handleDeleteSurvey = (surveyId: string) => {
        setSurveys(surveys.filter(survey => survey.id !== surveyId));
    };

    const handleEditSurvey = (surveyId: string) => {
        const surveyToEdit = surveys.find(s => s.id === surveyId);
        if (surveyToEdit) {
            setEditingSurvey(surveyToEdit);
            setCurrentPage('edit-survey');
        }
    };

    const handleDuplicateSurvey = (surveyId: string) => {
        const surveyToDuplicate = surveys.find(s => s.id === surveyId);
        if (surveyToDuplicate) {
            const newSurvey: Survey = {
                ...surveyToDuplicate,
                id: crypto.randomUUID(),
                title: `Copia de ${surveyToDuplicate.title}`,
                status: 'draft',
                responses: 0,
                createdAt: new Date().toLocaleDateString('es-ES'),
                questions: surveyToDuplicate.questions.map(q => ({
                    ...q,
                    id: crypto.randomUUID(),
                    options: q.options.map(o => ({...o, id: crypto.randomUUID()}))
                }))
            };
            setSurveys([newSurvey, ...surveys]);
        }
    };
    
    const handleViewResults = (surveyId: string) => {
        const surveyToView = surveys.find(s => s.id === surveyId);
        if (surveyToView) {
            setViewingSurvey(surveyToView);
            setCurrentPage('results');
        }
    };

    const handleTakeSurvey = (surveyId: string) => {
        const surveyToTake = surveys.find(s => s.id === surveyId);
        if (surveyToTake) {
            setTakingSurvey(surveyToTake);
            setCurrentPage('take-survey');
        }
    };

    const handleSubmitSurvey = (surveyId: string) => {
        setSurveys(surveys.map(s => {
            if (s.id === surveyId) {
                return { ...s, responses: s.responses + 1 };
            }
            return s;
        }));
        // The SurveyTaker component handles showing the thank you message.
        // We just need to update the state.
    };
    
    const handlePreviewSurvey = (surveyData: { title: string; description: string; questions: Question[] }) => {
        const surveyToPreview: Survey = {
            id: 'preview-id',
            title: surveyData.title,
            description: surveyData.description,
            questions: surveyData.questions,
            status: 'draft',
            responses: 0,
            createdAt: 'Ahora',
        };
        setPreviewingSurvey(surveyToPreview);
        setCurrentPage('preview-survey');
    };

    const handleExitPreview = () => {
        setPreviewingSurvey(null);
        setCurrentPage(editingSurvey ? 'edit-survey' : 'create-survey');
    };

    const handleShareSurvey = (surveyId: string) => {
        const surveyToShare = surveys.find(s => s.id === surveyId);
        if (surveyToShare) {
            setSharingSurvey(surveyToShare);
        }
    };

    const handleViewAttendance = (session: TrainingSession) => {
        setViewingAttendance(session);
    };

    const handleCloseAttendanceModal = () => {
        setViewingAttendance(null);
    };

    if (currentPage === 'take-survey' && takingSurvey) {
        return <SurveyTaker survey={takingSurvey} onSubmit={handleSubmitSurvey} onBackToHome={handleBackToHome} />;
    }

    if (currentPage === 'preview-survey' && previewingSurvey) {
        return <SurveyPreview survey={previewingSurvey} onExitPreview={handleExitPreview} />;
    }

    if (!isLoggedIn) {
        switch (authPage) {
            case 'landing':
                return <Landing onNavigateToLogin={navigateToLogin} onNavigateToRegister={navigateToRegister} />;
            case 'login':
                return <Login onLogin={handleLogin} onNavigateToRegister={navigateToRegister} />;
            case 'register':
                return <Register onRegister={() => handleLogin(false)} onNavigateToLogin={navigateToLogin} />;
            default:
                 return <Landing onNavigateToLogin={navigateToLogin} onNavigateToRegister={navigateToRegister} />;
        }
    }

    if (showPostLoginLanding) {
        return <Landing isLoggedIn={true} onNavigateToDashboard={handleGoToDashboard} />;
    }


    return (
        <div className="flex h-screen bg-dark text-secondary font-sans">
            {sharingSurvey && <ShareModal survey={sharingSurvey} onClose={() => setSharingSurvey(null)} />}
            {viewingAttendance && <AttendanceModal session={viewingAttendance} onClose={handleCloseAttendanceModal} />}
            <Sidebar onNavigate={handleNavigation} currentPage={currentPage} onLogout={handleLogout} userPlan={userPlan} />
            <main className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
                {currentPage === 'home' && <Home surveys={surveys} onDeleteSurvey={handleDeleteSurvey} onEditSurvey={handleEditSurvey} onDuplicateSurvey={handleDuplicateSurvey} onViewResults={handleViewResults} onNavigateToCreator={handleNavigateToCreator} onTakeSurvey={handleTakeSurvey} onShareSurvey={handleShareSurvey}/>}
                {currentPage === 'pricing' && <Pricing onSelectPlan={handleSelectPlan} />}
                {currentPage === 'contact' && <Contact />}
                {currentPage === 'training' && <TrainingPage sessions={trainingSessions} onViewAttendance={handleViewAttendance} />}
                {(currentPage === 'create-survey' || currentPage === 'edit-survey') && (
                    <SurveyCreator 
                        onBack={handleBackToHome} 
                        onSave={handleSaveOrUpdateSurvey} 
                        surveyToEdit={editingSurvey} 
                        onPreview={handlePreviewSurvey}
                    />
                )}
                {currentPage === 'checkout' && selectedPlan && (
                    <Checkout
                        plan={selectedPlan}
                        onBack={handleBackToPricing}
                        onCheckoutComplete={handleCheckoutComplete}
                    />
                )}
                {currentPage === 'results' && viewingSurvey && (
                    <SurveyResults survey={viewingSurvey} onBack={handleBackToHome} />
                )}
            </main>
        </div>
    );
};

export default App;
