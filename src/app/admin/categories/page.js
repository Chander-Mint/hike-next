'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItemCard from '../components/ItemCard';
import AdminLoader from '../components/AdminLoader';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/category');
      const data = await res.json();
      setCategories(data?.categories);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    router.push(`/admin/categories/category?id=${category._id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    await fetch(`/api/category/${id}`, { method: 'DELETE' });
    fetchCategories();
  };


  return (
    <div className="p-6">
      <div className="flex justify-end items-center mb-6">
        <button
          onClick={() => router.push('/admin/categories/category')}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Add New Category
        </button>
      </div>
      {(loading) ? <AdminLoader /> :

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <ItemCard
              key={category?._id}
              title={category?.name}
              imageUrl={category?.categoryImg}
              subcategories={category?.subcategories || []}
              onEdit={() => handleEdit(category)}
              onDelete={() => handleDelete(category._id)}
              onAddSubcategory={() => {
                router.push(`/admin/categories/${category._id}/subcategories`);
              }}
              onViewSubcategories={() => {
                router.push(`/admin/categories/${category._id}/subcategories`);
              }}
            />
          ))}
        </div>
      }
    </div>
  );
}

