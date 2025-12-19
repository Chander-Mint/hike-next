'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextEditor from './TextEditor';
import { useState } from 'react';
import FileInput from './inputs/FileInput';

const CommonForm = ({ initialValues, validationSchema, onSubmit, onCancel, fields }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === 'file' ? (
                <FileInput
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  showPreview
                  required
                  onChange={(event) => {
                    setFieldValue(field.name, event.currentTarget.files[0]);
                  }}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  accept="image/*"
                />
              ) : field.type === 'textInput' ? (
                <TextEditor
                  value={values[field.name] || ''}
                  onChange={(value) => setFieldValue(field.name, value)}
                />
              ) : field.type === 'select' ? (
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <Field
                    as="select"
                    name={field.name}
                    className="mt-1 block w-full border rounded-md shadow-sm p-2"
                  >
                    <option value="">{field.placeholder || 'Select an option'}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
              ) : (
                <Field
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full border rounded-md shadow-sm p-2"
                />
              )}
              <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
            </div>
          ))}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default CommonForm;