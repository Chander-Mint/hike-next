'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { TextInput } from '@/src/app/admin/components/inputs/TextInput';
import { FileInput } from '@/src/app/admin/components/inputs/FileInput';
import { SelectInput } from '@/src/app/admin/components/inputs/SelectInput';

// Dynamically import TextEditor with SSR disabled
const TextEditor = dynamic(() => import('@/src/app/admin/components/TextEditor'), {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
});

const BlogPostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    shortDescription: Yup.string().required('Short description is required'),
    status: Yup.string().oneOf(['Draft', 'Published']).required('Status is required'),
    bannerImg: Yup.mixed().nullable(),
    img: Yup.mixed().nullable(),
});

export default function NewBlog({ post, onSubmit, onCancel }) {
    const router = useRouter();
    const [error, setError] = useState(null);

    const initialValues = {
        title: post?.title || '',
        content: post?.content || '',
        shortDescription: post?.shortDescription || '',
        status: post?.status || 'Draft',
        bannerImg: null,
        img: null,
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setError(null);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('content', values.content);
        formData.append('shortDescription', values.shortDescription);
        formData.append('status', values.status);
        if (values.bannerImg) formData.append('bannerImg', values.bannerImg);
        if (values.img) formData.append('img', values.img);

        try {
            const url = post ? `/api/blog/${post._id}` : '/api/blog';
            const method = post ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to save blog post');
            }

            if (onSubmit) {
                onSubmit(data.blog);
            }

            router.push('/admin/blog-posts');
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteImage = async (imageField, imagePath) => {
        try {
            const response = await fetch('/api/blog/image', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blogId: post?._id, imagePath }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete image');
            }

            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200 flex items-center">
                    <Icon icon="mdi:alert-circle" width="24" height="24" className="mr-2" />
                    {error}
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={BlogPostSchema}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-10 gap-4">
                            <div className="col-span-7">
                                <TextInput
                                    label="Blog Title"
                                    name="title"
                                    required
                                    value={values.title}
                                    onChange={(e) => setFieldValue('title', e.target.value)}
                                    placeholder="Enter blog post title"
                                />
                            </div>
                            <div className="col-span-3">
                                <SelectInput
                                    label="Status"
                                    name="status"
                                    required
                                    value={values.status}
                                    options={[
                                        { value: 'Draft', label: 'Draft' },
                                        { value: 'Published', label: 'Published' },
                                    ]}
                                    onChange={(e) => setFieldValue('status', e.target.value)}
                                />
                            </div>
                        </div>

                        <TextInput
                            label="Short Description"
                            name="shortDescription"
                            required
                            as="textarea"
                            rows="3"
                            value={values.shortDescription}
                            onChange={(e) => setFieldValue('shortDescription', e.target.value)}
                            placeholder="Enter a brief description of the blog post"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                            <TextEditor
                                value={values.content}
                                onChange={(value) => setFieldValue('content', value)}
                                className="min-h-[300px] rounded-md border-gray-300 shadow-sm focus:border-gray-600 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
                            />
                            <ErrorMessage
                                name="content"
                                component="div"
                                className="mt-1 text-sm text-red-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <FileInput
                                    label="Banner Image"
                                    name="bannerImg"
                                    showPreview
                                    onChange={(e) => setFieldValue('bannerImg', e.currentTarget.files[0])}
                                />
                                {post?.bannerImg && !values.bannerImg && (
                                    <div className="flex items-center mt-2">
                                        <img
                                            src={post.bannerImg}
                                            alt="Banner Image"
                                            width={100}
                                            height={100}
                                            className="rounded-md mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage('bannerImg', post.bannerImg)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Icon icon="mdi:delete" width="24" height="24" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <FileInput
                                    label="Main Image"
                                    name="img"
                                    showPreview
                                    onChange={(e) => setFieldValue('img', e.currentTarget.files[0])}
                                />
                                {post?.img && !values.img && (
                                    <div className="flex items-center mt-2">
                                        <img
                                            src={post.img}
                                            alt="Main Image"
                                            width={100}
                                            height={100}
                                            className="rounded-md mr-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage('img', post.img)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Icon icon="mdi:delete" width="24" height="24" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onCancel || (() => router.push('/admin/blog-posts'))}
                                className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition duration-200 disabled:opacity-50"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}