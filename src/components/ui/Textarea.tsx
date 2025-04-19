import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800
            min-h-[80px]
            ${error ? 'border-error-500 focus:ring-error-500' : ''}
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;