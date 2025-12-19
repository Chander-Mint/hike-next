'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showToast } from '@/src/utils/toast';

const validationSchema = Yup.object({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export default function ProfilePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/admin/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                showToast('Password updated successfully', 'success');
                router.push('/admin/dashboard');
            } else {
                const data = await response.json();
                setErrors({ submit: data.message });
            }
        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setSubmitting(false);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Change Password</h1>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                Current Password
                            </label>
                            <Field
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            />
                            <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <Field
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            />
                            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        {errors.submit && <div className="text-red-500 text-sm">{errors.submit}</div>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
