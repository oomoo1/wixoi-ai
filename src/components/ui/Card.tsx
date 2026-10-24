import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  interactive = false,
  children,
  className = '',
  ...props
}) => {
  const cardClass = interactive ? 'card--interactive' : 'card';

  return (
    <div className={`${cardClass} p-6 sm:p-8 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
