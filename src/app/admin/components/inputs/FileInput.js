'use client';
import { forwardRef, useState, useEffect } from 'react';

export const FileInput = forwardRef(({
    label,
    name,
    onChange,
    onBlur,
    error,
    required = false,
    accept = 'image/*',
    className = '',
    showPreview = true,
    defaultValue = '',
    multiple = false,
    ...props
}, ref) => {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (defaultValue) {
            if (Array.isArray(defaultValue)) {
                setPreviews(defaultValue.map((item) =>
                    typeof item === 'string' ? `/uploads/${item}` : ''
                ));
            } else if (typeof defaultValue === 'string') {
                setPreviews([`${defaultValue}`]);
            }
        }
    }, [defaultValue]);

    const handleChange = (e) => {
        const files = Array.from(e.target.files);

        if (showPreview && files.length) {
            const previewPromises = files.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(previewPromises).then(setPreviews);
        } else if (!files.length) {
            setPreviews([]);
        }

        if (onChange) {
            onChange(e);
        }
    };

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
                type="file"
                id={name}
                name={name}
                onChange={handleChange}
                onBlur={onBlur}
                accept={accept}
                multiple={multiple}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...props}
            />

            {showPreview && previews.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                    {previews.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt={`Preview ${idx}`}
                            className="h-24 w-24 object-cover border rounded-md"
                        />
                    ))}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
});

FileInput.displayName = 'FileInput';

export default FileInput;
