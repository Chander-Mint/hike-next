'use client';
import { forwardRef } from 'react';

export const CheckboxInput = forwardRef(({
    label,
    name,
    checked,
    onChange,
    onBlur,
    error,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="mb-4">
            <div className="flex items-center">
                <input
                    ref={ref}
                    type="checkbox"
                    id={name}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${className}`}
                    {...props}
                />
                {label && (
                    <label
                        htmlFor={name}
                        className="ml-2 block text-sm text-gray-700"
                    >
                        {label}
                    </label>
                )}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;