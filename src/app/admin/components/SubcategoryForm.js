'use client';
import { Formik, Form } from 'formik';
import { TextInput } from './inputs/TextInput';
import { FileInput } from './inputs/FileInput';
import { SelectInput } from './inputs/SelectInput';
import * as Yup from 'yup';
import Image from 'next/image';

const SubcategoryFormValues = {
    title: '',
    image: null,
    banner: null,
    status: true,
    imageUrl: '',
    bannerUrl: ''
};

export const SubcategorySchema = Yup.object().shape({
    title: Yup.string().required('Subcategory title is required'),
    status: Yup.boolean(),
    image: Yup.mixed().nullable(),
    banner: Yup.mixed().nullable(),
    imageUrl: Yup.string(),
    bannerUrl: Yup.string()
});

export const SubcategoryForm = ({
    initialValues = SubcategoryFormValues,
    onSubmit,
    onCancel,
    editing = false,
}) => {
    return (
        <Formik
            initialValues={{ ...SubcategoryFormValues, ...initialValues }}
            validationSchema={SubcategorySchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ values, setFieldValue }) => (
                <Form className="space-y-6">
                    <TextInput
                        label="Subcategory Title"
                        name="title"
                        required
                        value={values.title}
                        onChange={(e) => setFieldValue('title', e.target.value)}
                    />
                    <FileInput
                        label="Subcategory Image"
                        name="image"
                        showPreview
                        defaultValue={values.imageUrl}
                        onChange={(e) => setFieldValue('image', e.currentTarget.files[0])}
                    />

                    <FileInput
                        label="Banner Image"
                        name="banner"
                        showPreview
                        defaultValue={values.bannerUrl}
                        onChange={(e) => setFieldValue('banner', e.currentTarget.files[0])}
                    />

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
                    />

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
                            {editing ? 'Update' : 'Create'} Subcategory
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default SubcategoryForm;
