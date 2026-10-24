import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asAnchor?: boolean;
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asAnchor = false,
  href,
  children,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none touch-target focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 min-h-[44px] gap-2',
    md: 'text-sm px-6 py-3 min-h-[44px] gap-2.5',
    lg: 'text-base px-8 py-3.5 min-h-[48px] gap-3 font-semibold',
  }[size];

  const variantClasses = {
    primary:
      'bg-[var(--accent-primary)] hover:bg-[oklch(0.60_0.22_260)] text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_32px_rgba(100,206,251,0.4)] active:scale-[0.98]',
    secondary:
      'bg-white/10 hover:bg-white/15 text-white border border-white/15 active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-white/5 text-[var(--text-primary)] border border-white/20 hover:border-[var(--accent-highlight)] active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-white/5 text-[var(--text-secondary)] hover:text-white',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
