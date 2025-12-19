'use client';
import { forwardRef } from 'react';

export const RadioInput = forwardRef(({
    label,
    name,
    options = [],
    value,
    onChange,
    onBlur,
    error,
    required = false,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="mb-4">
            {label && (
                <div className="block text-sm font-medium text-gray-700 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </div>
            )}
            <div className="space-y-2">
                {options.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <input
                            ref={option.value === value ? ref : null}
                            type="radio"
                            id={`${name}-${option.value}`}
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ${className}`}
                            {...props}
                        />
                        <label
                            htmlFor={`${name}-${option.value}`}
                            className="ml-2 block text-sm text-gray-700"
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

RadioInput.displayName = 'RadioInput';

export default RadioInput;