'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SubcategoryForm } from '@/src/app/admin/components/SubcategoryForm';
import { showToast } from '@/src/utils/toast';

export default function EditSubcategoryPage({ params }) {
    const router = useRouter();
    const [initialValues, setInitialValues] = useState({
        title: '',
        image: null,
        banner: null,
        status: 'Active',
        imageUrl: '',
        bannerUrl: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const isNew = params.subcategoryId === 'new';
    const categoryId = params.id;

    useEffect(() => {
        if (!isNew) {
            fetchSubcategory();
        } else {
            setIsLoading(false);
        }
    }, [params.subcategoryId]);

    const fetchSubcategory = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/category/subCategory/${params.subcategoryId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch subcategory');
            }

            const subCategory = data?.data?.subCategory || {};

            setInitialValues({
                title: subCategory.title || '',
                image: null,
                banner: null,
                status: subCategory.status === 'Active',
                imageUrl: Array.isArray(subCategory.img) && subCategory.img.length > 0
                    ? subCategory.img[0]
                    : '',
                bannerUrl: subCategory.bannerImg || ''
            });
        } catch (err) {
            console.error('Failed to fetch subcategory:', err);
            showToast(`Failed to fetch subcategory: ${err.message}`, 'error');

        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();

            const subcategoryData = {
                title: values.title,
                status: values.status === true ? 'Active' :
                    values.status === false ? 'Inactive' :
                        values.status.toString()
            };

            formData.append('title', subcategoryData.title);
            formData.append('status', subcategoryData.status);

            if (values.image instanceof File) {
                formData.append('img', values.image);
            }

            if (values.banner instanceof File) {
                formData.append('bannerImg', values.banner);
            }

            const url = isNew
                ? `/api/category/subCategory/${categoryId}`
                : `/api/category/subCategory/${params.subcategoryId}`;

            const method = isNew ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                body: formData,
            });
            const responseData = await response.json();
            if (responseData.status === 200) {
                showToast('Subcategory saved successfully!', 'success');
            }
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to save subcategory');
            }

            router.push(`/admin/categories/${categoryId}/subcategories`);
            router.refresh();
        } catch (err) {
            console.error('Failed to save subcategory:', err);
            showToast(`Failed to save subcategory: ${err.message}`, 'error');

        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
                {isNew ? 'Add New Subcategory' : 'Edit Subcategory'}
            </h2>
            <div className="max-w-4xl mx-auto">
                <SubcategoryForm
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    onCancel={() => router.push(`/admin/categories/${categoryId}/subcategories`)}
                    editing={!isNew}
                />
            </div>
        </div>
    );
}
