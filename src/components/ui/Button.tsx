// src/components/ui/Button.tsx
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  loading?: boolean;
};

export default function Button({ variant = 'primary', loading = false, children, className = '', ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-medium transition-all duration-200 transform focus:outline-none focus:ring-2';

  const styles =
    variant === 'primary'
      ? 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-300'
      : 'bg-transparent border text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-300';

  return (
    <button {...rest} className={`${base} ${styles} ${className}`} disabled={loading || rest.disabled}>
      {loading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
          <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
}
