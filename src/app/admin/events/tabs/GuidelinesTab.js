import React from 'react';
import { Field, ErrorMessage } from 'formik';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../../components/TextEditor'), {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
});
const GuidelinesTab = ({ values, guidelineFields, setGuidelineFields, setFieldValue, isSubmitting }) => {
    const addGuidelineField = () => {
        setGuidelineFields([...guidelineFields, { title: '', content: '' }]);
    };

    const removeGuidelineField = (index) => {
        setGuidelineFields(guidelineFields.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Guidelines (Optional)</label>
            {guidelineFields.map((_, index) => (
                <div key={index} className="border p-4 rounded-md space-y-3">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Field
                            type="text"
                            name={`guideLines[${index}].title`}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Enter guideline title"
                        />
                        <ErrorMessage name={`guideLines[${index}].title`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Content</label>
                        <TextEditor
                            value={values.guideLines[index]?.content || ''}
                            onChange={(value) => setFieldValue(`guideLines[${index}].content`, value)}
                            placeholder="Enter guideline content"
                        />
                        <ErrorMessage name={`guideLines[${index}].content`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeGuidelineField(index)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:bg-red-300"
                        disabled={guidelineFields.length === 1 || isSubmitting}
                    >
                        Remove Guideline
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addGuidelineField}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:bg-green-300"
                disabled={isSubmitting}
            >
                Add Guideline
            </button>
        </div>
    );
};

export default GuidelinesTab;