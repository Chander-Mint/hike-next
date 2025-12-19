import React from 'react';
import { Field, ErrorMessage } from 'formik';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../../components/TextEditor'), {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
});
const ItineraryTab = ({ values, setFieldValue, itineraryFields, setItineraryFields, isSubmitting }) => {
    const addItineraryField = () => {
        setItineraryFields([...itineraryFields, { day: '', title: '', description: '' }]);
    };

    const removeItineraryField = (index) => {
        setItineraryFields(itineraryFields.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Itinerary</label>
            {itineraryFields.map((_, index) => (
                <div key={index} className="border p-4 rounded-md space-y-3">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Day</label>
                        <Field
                            type="text"
                            name={`itinerary[${index}].day`}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <ErrorMessage name={`itinerary[${index}].day`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Field
                            type="text"
                            name={`itinerary[${index}].title`}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <ErrorMessage name={`itinerary[${index}].title`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <TextEditor
                            value={values.itinerary[index]?.description || ''}
                            onChange={(value) => setFieldValue(`itinerary[${index}].description`, value)}
                            placeholder="Enter itinerary description"
                        />
                        <ErrorMessage name={`itinerary[${index}].description`} component="div" className="text-xs text-red-500 mt-1" />
                    </div>
                    <button
                        type="button"
                        onClick={() => removeItineraryField(index)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:bg-red-300"
                        disabled={itineraryFields.length === 1 || isSubmitting}
                    >
                        Remove Day
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addItineraryField}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:bg-green-300"
                disabled={isSubmitting}
            >
                Add Day
            </button>
        </div>
    );
};

export default ItineraryTab;