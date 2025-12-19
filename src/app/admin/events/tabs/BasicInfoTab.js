import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { WithContext as ReactTags } from 'react-tag-input';
import FileInput from '../../components/inputs/FileInput';
import '../eventForm/react-tags.css';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('../../components/TextEditor'), {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
});
const basicInfoFields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'location', label: 'Region', type: 'text' },
    { name: 'duration', label: 'Duration', type: 'text' },
    { name: 'bestTime', label: 'Best Time', type: 'text' },
    { name: 'maxElevation', label: 'Max Elevation (M)', type: 'text' },
    { name: 'route', label: 'Route', type: 'text' },
    { name: 'difficulty', label: 'Level', type: 'text' },
    { name: 'basePrice', label: 'Base Price', type: 'text' },
    { name: 'video', label: 'Video URL', type: 'text' },
    { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },

];

const BasicInfoTab = ({ values, setFieldValue, errors, touched, categories, categoryLoading, categoryError, subcategories, subcategoryLoading, subcategoryError, isSubmitting }) => {
    const [newActivity, setNewActivity] = useState('');

    const handleTagAddition = (activity) => {
        if (activity.trim() && !values.activities.includes(activity.trim())) {
            setFieldValue('activities', [...values.activities, activity.trim()]);
            setNewActivity('');
        }
    };

    const handleTagDelete = (index) => {
        const updatedActivities = values?.activities?.filter((_, i) => i !== index);
        setFieldValue('activities', updatedActivities);
    };
    const handleDrag = (tag, currPos, newPos) => {
        const updatedActivities = [...values.activities];
        updatedActivities.splice(currPos, 1);
        updatedActivities.splice(newPos, 0, tag.text);
        setFieldValue('activities', updatedActivities);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && newActivity.trim()) {
            e.preventDefault();
            handleTagAddition(newActivity);
        }
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 mb-1">
                    Category
                </label>
                {categoryLoading ? (
                    <p className="text-sm text-gray-500">Loading categories...</p>
                ) : categoryError ? (
                    <p className="text-xs text-red-500">{categoryError}</p>
                ) : (
                    <Field
                        as="select"
                        id="category"
                        name="category"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        disabled={isSubmitting}
                    >
                        <option value="">Select a Category</option>
                        {categories?.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </Field>
                )}
                <ErrorMessage name="category" component="div" className="text-xs text-red-500 mt-1" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="subCategoryId" className="text-sm font-medium text-gray-700 mb-1">
                    Subcategory
                </label>
                <Field
                    as="select"
                    id="subCategoryId"
                    name="subCategoryId"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    disabled={isSubmitting || !values.category || subcategoryLoading || subcategoryError}
                >
                    <option value="">Select a subcategory</option>
                    {!values.category ? (
                        <option value="" disabled>
                            Select a category first
                        </option>
                    ) : subcategoryLoading ? (
                        <option value="" disabled>
                            Loading subcategories...
                        </option>
                    ) : subcategoryError ? (
                        <option value="" disabled>
                            Error loading subcategories
                        </option>
                    ) : subcategories.length === 0 ? (
                        <option value="" disabled>
                            No subcategories available
                        </option>
                    ) : (
                        subcategories?.map((subcat) => (
                            <option key={subcat._id} value={subcat._id}>
                                {subcat.title}
                            </option>
                        ))
                    )}
                </Field>
                <ErrorMessage name="subCategoryId" component="div" className="text-xs text-red-500 mt-1" />
            </div>
            {basicInfoFields.map((field) => (
                <div key={field.name} className="flex flex-col">
                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                    </label>
                    {field.type === 'select' ? (
                        <Field
                            as="select"
                            id={field.name}
                            name={field.name}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        >
                            <option value="">Select {field.label}</option>
                            {field.options.map(option => (
                                <option key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </option>
                            ))}
                        </Field>
                    ) : (
                        <Field
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    )}
                    <ErrorMessage name={field.name} component="div" className="text-xs text-red-500 mt-1" />
                </div>
            ))}

            <div className="md:col-span-2">
                <label htmlFor="activities" className="block text-sm font-medium text-gray-700 mb-1">
                    Activities
                </label>
                <input
                    type="text"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add activity and press Enter"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full"
                />
                <ReactTags
                    tags={values?.activities?.map((activity) => ({ id: activity, text: activity }))}
                    handleDelete={handleTagDelete}
                    handleAddition={() => { }}
                    handleDrag={handleDrag}
                    classNames={{
                        tags: 'react-tags__tags',
                        tag: 'react-tags__tag',
                        remove: 'react-tags__remove',
                    }}
                />
                <ErrorMessage name="activities" component="div" className="mt-1 text-xs text-red-500" />
            </div>
            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">Program Overview</label>
                <TextEditor
                    value={values.description}
                    onChange={(value) => setFieldValue('description', value)}
                    placeholder="Enter program overview here"
                />

                <ErrorMessage name="description" component="div" className="text-xs text-red-500 mt-1" />
            </div>
            <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                <FileInput
                    name="img"
                    accept="image/*"
                    onChange={(event) => setFieldValue('img', event.currentTarget.files[0])}
                    defaultValue={values.img}
                />
                <ErrorMessage name="img" component="div" className="text-xs text-red-500 mt-1" />
            </div>
        </div>
    );
};

export default BasicInfoTab;