import React from 'react';
import { Field, ErrorMessage } from 'formik';
import FileInput from '../../components/inputs/FileInput';

const DocumentsTab = ({ setFieldValue }) => (
    <div className="space-y-4">
        <div className="flex flex-col mb-2">
            <label className="text-sm font-medium text-gray-700 mb-2">Title</label>
            <Field
                name="documents[0].header"
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Enter document title"
                onChange={(e) => {
                    setFieldValue('documents[0].header', e.target.value);
                    setFieldValue('documents[0].headerKey', e.target.value.split(' ')[0] || '');
                }}
            />
            <ErrorMessage name="documents[0].header" component="div" className="text-xs text-red-500 mt-1" />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Document Banner Image</label>
            <FileInput
                accept="image/*"
                name="documents[0].imgFile"
                onChange={(event) => setFieldValue('documents[0].imgFile', event.currentTarget.files[0])}
            />
            <ErrorMessage name="documents[0].imgFile" component="div" className="text-xs text-red-500 mt-1" />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">Document PDF</label>
            <FileInput
                accept="application/pdf"
                name="documents[0].pdfFile"
                onChange={(event) => setFieldValue('documents[0].pdfFile', event.currentTarget.files[0])}
            />
            <ErrorMessage name="documents[0].pdfFile" component="div" className="text-xs text-red-500 mt-1" />
        </div>
    </div>
);

export default DocumentsTab;
