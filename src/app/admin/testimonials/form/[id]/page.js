'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import CommonForm from '@/src/app/admin/components/CommonForm';

const TestimonialSchema = Yup.object().shape({
    author: Yup.string().required('Name is required'),
    content: Yup.string().required('Content is required'),
    image: Yup.mixed().test('file-required', 'Image is required', (value) => {
        return value instanceof File || typeof value === 'string';
    }),
    status: Yup.string().required('Status is required').oneOf(['Active', 'Inactive'], 'Invalid status'),
});

export default function EditTestimonialPage({ params }) {
    const router = useRouter();
    const isNew = params.id === 'new';
    const [initialValues, setInitialValues] = useState({ author: '', content: '', image: '', status: 'Active' });
    const [isLoading, setIsLoading] = useState(!isNew);
    const [error, setError] = useState(null);

    const formFields = [
        { name: 'author', type: 'text', label: 'Name', placeholder: 'Enter author name' },
        { name: 'content', type: 'textInput', label: 'Content', placeholder: 'Enter content' },
        { name: 'image', type: 'file', label: 'Image', placeholder: 'Upload image' },
        {
            name: 'status',
            type: 'select',
            label: 'Status',
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
            ],
            placeholder: 'Select status',
        },
    ];

    useEffect(() => {
        if (!isNew && params.id) {
            const fetchTestimonial = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/api/testimonial/${params.id}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch testimonial');
                    }
                    const data = await response.json();
                    const testimonial = data?.testimonial || data;
                    setInitialValues({
                        author: testimonial?.author || '',
                        content: testimonial?.content || '',
                        image: testimonial?.image || '',
                        status: testimonial?.status || 'Active',
                    });
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTestimonial();
        } else if (!isNew && !params.id) {
            setError('Invalid testimonial ID');
            setIsLoading(false);
        }
    }, [params.id, isNew]);

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('author', values.author);
            formData.append('content', values.content);
            formData.append('status', values.status);
            if (values.image instanceof File) {
                formData.append('image', values.image);
            } else if (typeof values.image === 'string' && values.image) {
                formData.append('imageUrl', values.image);
            }

            const response = await fetch(`/api/testimonial${isNew ? '' : `/${params.id}`}`, {
                method: isNew ? 'POST' : 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to ${isNew ? 'create' : 'update'} testimonial`);
            }

            router.push('/admin/testimonials');
        } catch (err) {
            setError(err.message);
        }
    };

    if (isLoading) {
        return <div className="p-6">Loading testimonial...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
                {isNew ? 'Add New Testimonial' : 'Edit Testimonial'}
            </h2>
            <CommonForm
                initialValues={initialValues}
                validationSchema={TestimonialSchema}
                onSubmit={handleSubmit}
                onCancel={() => router.push('/admin/testimonials')}
                fields={formFields}
            />
        </div>
    );
}