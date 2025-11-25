import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={`bg-dark rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};