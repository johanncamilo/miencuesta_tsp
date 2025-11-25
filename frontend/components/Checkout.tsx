import React, { useState } from 'react';
import { PricingPlan } from '../types';
import { Card } from './Card';
import { CheckIcon } from './icons';

interface CheckoutProps {
    plan: PricingPlan;
    onBack: () => void;
    onCheckoutComplete: (planName: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ plan, onBack, onCheckoutComplete }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsComplete(true);
            onCheckoutComplete(plan.name);
        }, 2000);
    };

    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto py-12">
                <Card>
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-green-100 rounded-full">
                                <CheckIcon className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-secondary">¡Felicidades!</h2>
                        <p className="mt-2 text-gray-500">
                            Has cambiado al plan <span className="font-semibold text-primary">{plan.name}</span>.
                            Serás redirigido al inicio en un momento.
                        </p>
                    </div>
                </Card>
            </div>
        );
    }
    
    const isEnterprise = plan.name === 'Empresarial';

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-4">
                <button onClick={onBack} className="text-sm font-medium text-primary hover:text-accent transition-colors">
                    &larr; Volver a Precios
                </button>
            </div>
            <Card>
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-secondary">Completa tu selección</h1>
                        <p className="text-gray-500 mt-2">Estás a un paso de acceder a tu plan <span className="font-semibold text-primary">{plan.name}</span>.</p>
                    </div>
                    
                    <div className="bg-light p-6 rounded-lg border border-gray-200 mb-8">
                        <h3 className="text-lg font-semibold text-secondary">{plan.name}</h3>
                        <p className="mt-2 text-3xl font-bold text-secondary">{plan.price}</p>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                           {plan.features.slice(0, 4).map((feature, i) => (
                               <li key={i} className="flex items-center">
                                   <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                                   {feature}
                               </li>
                           ))}
                           {plan.features.length > 4 && <li className="text-gray-500 ml-6">& más...</li>}
                        </ul>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                       {isEnterprise ? (
                           <div className="space-y-4">
                               <div>
                                   <label htmlFor="company-name" className="block text-sm font-medium text-secondary">Nombre de la empresa</label>
                                   <input type="text" name="company-name" id="company-name" required className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                               </div>
                               <div>
                                   <label htmlFor="email-contact" className="block text-sm font-medium text-secondary">Correo de contacto</label>
                                   <input type="email" name="email-contact" id="email-contact" required defaultValue="demo@miencuesta.com" className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                               </div>
                               <div>
                                   <label htmlFor="message" className="block text-sm font-medium text-secondary">Mensaje (opcional)</label>
                                   <textarea id="message" name="message" rows={3} className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Cuéntanos sobre tus necesidades..."></textarea>
                               </div>
                           </div>
                       ) : (
                           <div className="space-y-4">
                               <div>
                                   <label htmlFor="card-number" className="block text-sm font-medium text-secondary">Número de Tarjeta</label>
                                   <input type="text" name="card-number" id="card-number" required placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                   <div>
                                       <label htmlFor="expiry-date" className="block text-sm font-medium text-secondary">Vencimiento</label>
                                       <input type="text" name="expiry-date" id="expiry-date" required placeholder="MM/YY" defaultValue="12/28" className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                   </div>
                                   <div>
                                       <label htmlFor="cvc" className="block text-sm font-medium text-secondary">CVC</label>
                                       <input type="text" name="cvc" id="cvc" required placeholder="123" defaultValue="123" className="mt-1 relative block w-full px-4 py-3 border border-gray-300 bg-gray-50 text-secondary placeholder-gray-500 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                   </div>
                               </div>
                           </div>
                       )}

                        <div className="pt-2">
                            <button type="submit" disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-indigo-400 transition-colors">
                                {isLoading ? (
                                    <>
                                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                     </svg>
                                      Procesando...
                                    </>
                                ) : isEnterprise ? 'Enviar Contacto' : 'Confirmar y Pagar'}
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    )
};

export default Checkout;
