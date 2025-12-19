import React from 'react';
import { Field, ErrorMessage } from 'formik';

const InclusionsExclusionsTab = ({ inclusionFields, setInclusionFields, exclusionFields, setExclusionFields, isSubmitting }) => {
    const addInclusionField = () => {
        setInclusionFields([...inclusionFields, '']);
    };

    const removeInclusionField = (index) => {
        setInclusionFields(inclusionFields.filter((_, i) => i !== index));
    };

    const addExclusionField = () => {
        setExclusionFields([...exclusionFields, '']);
    };

    const removeExclusionField = (index) => {
        setExclusionFields(exclusionFields.filter((_, i) => i !== index));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Inclusions</label>
                {inclusionFields.map((_, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-3">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Inclusion</label>
                            <Field
                                as="textarea"
                                name={`inclusions[${index}]`}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-18"
                                placeholder="Enter inclusion"
                            />
                            <ErrorMessage name={`inclusions[${index}]`} component="div" className="text-xs text-red-500 mt-1" />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeInclusionField(index)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:bg-red-300"
                            disabled={inclusionFields.length === 1 || isSubmitting}
                        >
                            Remove Inclusion
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addInclusionField}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:bg-green-300"
                    disabled={isSubmitting}
                >
                    Add Inclusion
                </button>
            </div>
            <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Exclusions</label>
                {exclusionFields.map((_, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-3">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">Exclusion</label>
                            <Field
                                as="textarea"
                                name={`exclusions[${index}]`}
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-18"
                                placeholder="Enter exclusion"
                            />
                            <ErrorMessage name={`exclusions[${index}]`} component="div" className="text-xs text-red-500 mt-1" />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeExclusionField(index)}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:bg-red-300"
                            disabled={exclusionFields.length === 1 || isSubmitting}
                        >
                            Remove Exclusion
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addExclusionField}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:bg-green-300"
                    disabled={isSubmitting}
                >
                    Add Exclusion
                </button>
            </div>
        </div>
    );
};

export default InclusionsExclusionsTab;