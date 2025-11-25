import React from 'react';
import { PricingPlan } from '../types';
import { Card } from './Card';
import { CheckIcon } from './icons';

interface PricingProps {
    onSelectPlan: (plan: PricingPlan) => void;
}

const pricingPlans: PricingPlan[] = [
    {
        name: 'Básico',
        price: 'Gratis',
        features: [
            'Acceso a información general',
            'Resúmenes de tipos de encuestas',
            'Actualizaciones mensuales de contenido',
            'Soporte por correo electrónico',
        ],
        isPopular: false,
    },
    {
        name: 'Profesional',
        price: '$49/mes',
        features: [
            'Todo en el plan Básico',
            'Análisis detallados de metodologías',
            'Estudios de caso exclusivos',
            'Acceso a webinars',
            'Soporte prioritario',
        ],
        isPopular: true,
    },
    {
        name: 'Empresarial',
        price: 'Contacto',
        features: [
            'Todo en el plan Profesional',
            'Consultoría personalizada',
            'Integración API de datos',
            'Informes a medida',
            'Soporte dedicado 24/7',
        ],
        isPopular: false,
    },
];

const PricingCard: React.FC<{ plan: PricingPlan; onSelectPlan: (plan: PricingPlan) => void }> = ({ plan, onSelectPlan }) => {
    return (
        <Card className={`flex flex-col transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${plan.isPopular ? 'border-primary border-2' : 'border-gray-200 hover:border-primary'}`}>
            {plan.isPopular && (
                <div className="bg-primary text-white text-center py-1.5 px-4 text-sm font-semibold rounded-t-xl -mt-px -mx-px">
                    Más Popular
                </div>
            )}
            <div className="p-8 flex-grow">
                <h3 className="text-2xl font-semibold text-secondary">{plan.name}</h3>
                <p className="mt-4 text-4xl font-extrabold text-secondary">{plan.price}</p>
                <p className="mt-1 text-gray-500">{plan.price !== 'Contacto' ? 'por usuario' : 'para soluciones a medida'}</p>
                <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <span className="ml-3 text-gray-600">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="p-8 pt-0 mt-auto">
                <button 
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${plan.isPopular ? 'bg-primary text-white hover:bg-accent shadow-md hover:shadow-lg' : 'bg-gray-100 text-secondary hover:bg-gray-200'}`}>
                    {plan.price === 'Contacto' ? 'Contactar Ventas' : 'Elegir Plan'}
                </button>
            </div>
        </Card>
    );
};


const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
    return (
        <div className="container mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-secondary sm:text-5xl">Planes de Precios Flexibles</h1>
                <p className="mt-4 text-xl text-gray-500">Elija el plan que se adapte a sus necesidades de conocimiento.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {pricingPlans.map((plan, index) => (
                    <PricingCard key={index} plan={plan} onSelectPlan={onSelectPlan} />
                ))}
            </div>
        </div>
    );
};

export default Pricing;