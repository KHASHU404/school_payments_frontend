// src/components/ui/Button.tsx
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'ghost' | 'danger';
  className?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size = 'md', variant = 'primary', className = '', ...props }, ref) => {
    const sizeCls =
      size === 'sm' ? 'px-3 py-1 text-sm' : size === 'lg' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm';
    const variantCls =
      variant === 'primary'
        ? 'bg-brand-600 hover:bg-brand-700 text-white'
        : variant === 'danger'
        ? 'bg-red-600 hover:bg-red-700 text-white'
        : 'bg-transparent border border-gray-200 hover:bg-gray-50 text-gray-800';

    return (
      <button
        ref={ref}
        {...props}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-400 ${sizeCls} ${variantCls} ${className}`}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
