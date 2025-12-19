import React from 'react';
import { ErrorMessage } from 'formik';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../../components/TextEditor'), {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
});
const PolicyTab = ({ values, setFieldValue }) => (
    <div>
        <label className="text-sm font-medium text-gray-700 mb-1">Policy</label>
        <TextEditor
            value={values.policy}
            onChange={(value) => setFieldValue('policy', value)}
            placeholder="Enter policy here"
        />
        <ErrorMessage name="policy" component="div" className="text-xs text-red-500 mt-1" />
    </div>
);

export default PolicyTab;