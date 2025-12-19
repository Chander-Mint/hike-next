import { forwardRef } from 'react';

export const TextInput = forwardRef(({
    label,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
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
            <input
                ref={ref}
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;