import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
    return (
        <div className={`
      relative bg-cyber-card backdrop-blur-md border border-cyber-border rounded-xl p-6
      ${hoverEffect ? 'hover:border-cyber-green/50 transition-colors duration-300' : ''}
      ${className}
    `}>
            {children}
        </div>
    );
};
