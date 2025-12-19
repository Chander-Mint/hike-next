import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FAQsTab = ({ faqFields, setFaqFields, isSubmitting }) => {
    const addFaqField = () => {
        const lastFaq = faqFields[faqFields.length - 1];
        setFaqFields([...faqFields, { question: '', answer: '' }]);
    };

    const removeFaqField = (index) => {
        setFaqFields(faqFields.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">FAQs</label>
            {faqFields.map((_, index) => (
                <div key={index} className="border p-4 rounded-md space-y-3">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Question</label>
                        <Field
                            type="text"
                            name={`FAQs[${index}].question`}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Enter question"
                        />
                        <ErrorMessage name={`FAQs[${index}].question`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Answer</label>
                        <Field
                            as="textarea"
                            name={`FAQs[${index}].answer`}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-24"
                            placeholder="Enter answer"
                        />
                        <ErrorMessage name={`FAQs[${index}].answer`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeFaqField(index)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:bg-red-300"
                        disabled={faqFields.length === 1 || isSubmitting}
                    >
                        Remove FAQ
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addFaqField}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:bg-green-300"
                disabled={isSubmitting}
            >
                Add FAQ
            </button>
        </div>
    );
};

export default FAQsTab;