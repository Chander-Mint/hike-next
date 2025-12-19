'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryForm } from '../../components/CategoryForm';

export default function CategoryFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const categoryId = searchParams.get('id');
    if (categoryId) {
      fetchCategory(categoryId);
      setIsEditing(true);
    }
  }, [searchParams]);

  const fetchCategory = async (id) => {
    try {
      const res = await fetch(`/api/category/${id}`);
      const data = await res.json();

      setEditingCategory({
        id: data.categories._id,
        name: data.categories.name || '',
        status: data.categories.status === 'Active',
        categoryImg: null,
        categoryImgUrl: data.categories.categoryImg || '',
      });
    } catch (error) {
      console.error('Failed to fetch category:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const method = isEditing ? 'PATCH' : 'POST';
      const endpoint = isEditing
        ? `/api/category/${editingCategory.id}`
        : '/api/category';

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Submission failed');

      router.push('/admin/categories');
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleCancel = () => {
    router.push('/admin/categories');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Category' : 'New Category'}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <CategoryForm
          initialValues={editingCategory || { name: '', status: true, categoryImg: null }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editing={isEditing}
        />
      </div>
    </div>
  );
}
