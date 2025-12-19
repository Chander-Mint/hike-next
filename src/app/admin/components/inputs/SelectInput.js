'use client';
import { forwardRef } from 'react';

export const SelectInput = forwardRef(({
    label,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    error,
    required = false,
    className = '',
    ...props
}, ref) => {
    return (
        <div className="mb-4">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <select
                ref={ref}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

SelectInput.displayName = 'SelectInput';

export default SelectInput;