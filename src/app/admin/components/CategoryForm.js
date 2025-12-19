'use client';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextInput } from './inputs/TextInput';
import { FileInput } from './inputs/FileInput';
import { SelectInput } from './inputs/SelectInput';
import { Icon } from '@iconify/react';
import { apiRequest } from '../utils/api';
import { showToast } from '@/src/utils/toast';

export const CategoryForm = ({
    initialValues = {
        name: '',
        status: true,
        categoryImg: null,
        categoryImgUrl: '',
        subcategories: [
            {
                title: '',
                status: true,
                image: [],
                banner: null,
                imageUrls: [],
                bannerUrl: '',
            },
        ],
    },
    onSubmit,
    onCancel,
    editing = false,
}) => {
    const [subcategories, setSubcategories] = useState(
        initialValues.subcategories?.length
            ? initialValues.subcategories.map((sub) => ({
                title: sub.title || '',
                status: sub.status ?? true,
                image: sub.image || [],
                banner: sub.banner || null,
                imageUrls: sub.imageUrls || [],
                bannerUrl: sub.bannerUrl || '',
            }))
            : [
                {
                    title: '',
                    status: true,
                    image: [],
                    banner: null,
                    imageUrls: [],
                    bannerUrl: '',
                },
            ]
    );

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Category title is required'),
        status: Yup.boolean().required('Status is required'),
        categoryImg: editing ? Yup.mixed().nullable() : Yup.mixed().required('Category image is required'),
    });

    const handleDelete = async (image) => {
        if (!initialValues.id || !image) return;
        try {
            const payload = {
                categoryId: initialValues.id,
                imagePath: image,
            };
            await apiRequest('/api/category/image', 'DELETE', 'application/json', payload);
        } catch (err) {
            console.error('Failed to delete image:', err);
            showToast('Failed to delete image', 'error');
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('status', values.status ? 'Active' : 'Inactive');

        // Append category image
        if (values.categoryImg instanceof File) {
            formData.append('categoryImg', values.categoryImg);
        } else if (!editing && !values.categoryImg) {
            console.warn('No category image provided in create mode');
        }

        // Append subcategories metadata and files
        const subCategoriesMetadata = subcategories.map((sub) => ({
            title: sub.title,
            status: sub.status ? 'Active' : 'Inactive',
        }));
        formData.append('subCategories', JSON.stringify(subCategoriesMetadata));

        subcategories.forEach((sub, index) => {
            if (sub.image && Array.isArray(sub.image) && sub.image.length > 0) {
                sub.image.forEach((img, i) => {
                    if (img instanceof File) {
                        formData.append(sub.title, img);
                    }
                });
            }
            if (sub.banner instanceof File) {
                formData.append(`${sub.title}_banner`, sub.banner);
            }
        });


        try {
            await onSubmit(formData);
        } catch (err) {
            console.error('Form submission error:', err);

            showToast('Failed to submit form', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ ...initialValues, subcategories }}
            validationSchema={validationSchema}
            enableReinitialize
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Form className="space-y-6">
                    <TextInput
                        label="Category Title"
                        name="name"
                        required
                        value={values.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        error={touched.name && errors.name}
                    />

                    <FileInput
                        label="Category Image"
                        name="categoryImg"
                        required={!editing}
                        showPreview={editing ? false : true}
                        defaultValue={values.categoryImgUrl}
                        onChange={(e) => {
                            const file = e.currentTarget.files[0];
                            setFieldValue('categoryImg', file);
                        }}
                        error={touched.categoryImg && errors.categoryImg}
                    />

                    {editing && values.categoryImgUrl && (
                        <div className="flex items-center space-x-4">
                            <img
                                src={`${values.categoryImgUrl}`}
                                alt="Category"
                                className="h-20 w-20 object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => handleDelete(values.categoryImgUrl)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <Icon icon="mdi:delete" width="24" height="24" />
                            </button>
                        </div>
                    )}

                    <SelectInput
                        label="Status"
                        name="status"
                        required
                        value={values.status}
                        options={[
                            { value: true, label: 'Active' },
                            { value: false, label: 'Inactive' },
                        ]}
                        onChange={(e) => setFieldValue('status', e.target.value === 'true')}
                        error={touched.status && errors.status}
                    />

                    <div className="space-y-6">
                        <h3 className="text-lg font-medium">Subcategories</h3>

                        {subcategories.map((subcategory, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-2 relative bg-gray-50">
                                <div className="flex flex-wrap md:flex-nowrap gap-4 w-full">
                                    <div className="flex-1 min-w-[150px]">
                                        <TextInput
                                            label="Subcategory Title"
                                            name={`subcategories[${index}].title`}
                                            required
                                            value={subcategory.title}
                                            onChange={(e) => {
                                                const newSubcategories = [...subcategories];
                                                newSubcategories[index].title = e.target.value;
                                                setSubcategories(newSubcategories);
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="w-[200px]">
                                        <SelectInput
                                            label="Status"
                                            name={`subcategories[${index}].status`}
                                            required
                                            value={subcategory.status}
                                            options={[
                                                { value: true, label: 'Active' },
                                                { value: false, label: 'Inactive' },
                                            ]}
                                            onChange={(e) => {
                                                const newSubcategories = [...subcategories];
                                                newSubcategories[index].status = e.target.value === 'true';
                                                setSubcategories(newSubcategories);
                                            }}
                                            className="w-full"
                                        />
                                    </div>

                                    {subcategories.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = subcategories.filter((_, i) => i !== index);
                                                setSubcategories(updated);
                                            }}
                                            className="text-red-600 hover:text-red-800 self-start"
                                            title="Remove this subcategory"
                                        >
                                            <Icon icon="mdi:delete" width="24" height="24" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <FileInput
                                        label="Subcategory Images"
                                        name={`subcategories[${index}].image`}
                                        multiple
                                        showPreview
                                        defaultValue={subcategory.imageUrls}
                                        onChange={(e) => {
                                            const files = Array.from(e.currentTarget.files);
                                            const newSubcategories = [...subcategories];
                                            newSubcategories[index].image = files;
                                            setSubcategories(newSubcategories);
                                        }}
                                    />

                                    <FileInput
                                        label="Banner Image"
                                        name={`subcategories[${index}].banner`}
                                        showPreview
                                        defaultValue={subcategory.bannerUrl}
                                        onChange={(e) => {
                                            const file = e.currentTarget.files[0];
                                            const newSubcategories = [...subcategories];
                                            newSubcategories[index].banner = file;
                                            setSubcategories(newSubcategories);
                                        }}
                                    />
                                </div>

                                {subcategory.imageUrls?.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {subcategory.imageUrls.map((url, i) => (
                                            <div key={i} className="flex items-center space-x-2">
                                                <img
                                                    src={`/uploads/${url}`}
                                                    alt={`Subcategory ${index} image ${i}`}
                                                    className="h-16 w-16 object-cover rounded"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(url)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Icon icon="mdi:delete" width="20" height="20" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() =>
                                    setSubcategories([
                                        ...subcategories,
                                        {
                                            title: '',
                                            image: [],
                                            banner: null,
                                            status: true,
                                            imageUrls: [],
                                            bannerUrl: '',
                                        },
                                    ])
                                }
                                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                            >
                                <Icon icon="mdi:plus" width="20" height="20" className="mr-1" />
                                Add New Subcategory
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center space-x-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-900 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                            {editing ? 'Update' : 'Create'} Category
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default CategoryForm;