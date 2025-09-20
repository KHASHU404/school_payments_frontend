// src/components/ui/Input.tsx
import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
  helper?: string | null;
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className = '', ...rest }, ref) => {
    const base = 'w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-brand-400';
    const border = error ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 dark:border-gray-700';
    const bg = 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100';
    return (
      <div className={`text-sm ${className}`}>
        {label && <label className="block mb-1 font-medium text-sm">{label}</label>}
        <input
          ref={ref}
          {...rest}
          className={`${base} ${border} ${bg}`}
        />
        {helper && !error && <p className="mt-1 text-xs text-gray-500">{helper}</p>}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
