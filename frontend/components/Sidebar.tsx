import React from 'react';
import { Page } from '../types';
import { HomeIcon, PricingIcon, LogoutIcon, SurveyIcon, MailIcon, AcademicCapIcon } from './icons';

interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
    userPlan: string;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <li className="px-3">
        <button
            onClick={onClick}
            className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-200 hover:text-secondary'
            }`}
        >
            {icon}
            <span className="ml-4 font-medium">{label}</span>
        </button>
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout, userPlan }) => {
    return (
        <aside className="w-64 bg-light flex-shrink-0 flex flex-col border-r border-gray-200">
            <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200">
                 <div className="flex items-center">
                    <SurveyIcon className="w-8 h-8 text-primary" />
                    <span className="ml-3 text-xl font-bold text-secondary">Miencuesta</span>
                </div>
            </div>
            <nav className="flex-1 py-6">
                <ul className="space-y-3">
                    <NavItem
                        icon={<HomeIcon className="w-6 h-6" />}
                        label="Inicio"
                        isActive={currentPage === 'home'}
                        onClick={() => onNavigate('home')}
                    />
                    <NavItem
                        icon={<AcademicCapIcon className="w-6 h-6" />}
                        label="Capacitación"
                        isActive={currentPage === 'training'}
                        onClick={() => onNavigate('training')}
                    />
                    <NavItem
                        icon={<PricingIcon className="w-6 h-6" />}
                        label="Precios"
                        isActive={currentPage === 'pricing'}
                        onClick={() => onNavigate('pricing')}
                    />
                    <NavItem
                        icon={<MailIcon className="w-6 h-6" />}
                        label="Contacto"
                        isActive={currentPage === 'contact'}
                        onClick={() => onNavigate('contact')}
                    />
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center p-3 rounded-lg">
                    <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/100" alt="User" />
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-secondary">Usuario Demo</p>
                        <p className="text-xs text-gray-500">Plan {userPlan}</p>
                    </div>
                </div>
                <button onClick={onLogout}
                        className="flex items-center w-full p-3 mt-4 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                    <LogoutIcon className="w-6 h-6" />
                    <span className="ml-4 font-medium">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
