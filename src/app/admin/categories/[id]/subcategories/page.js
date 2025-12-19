'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/src/app/admin/utils/api';

export default function SubcategoriesPage({ params }) {
  const router = useRouter();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchSubcategories();
  }, [params.id]);

  const fetchSubcategories = async () => {
    try {
      const data = await apiRequest(`/api/category/${params.id}`, 'GET');
      setSubcategories(data?.categories?.subCategories);
    } catch (err) {
      console.error('Failed to fetch subcategories:', err.message);
    }
  };

  const handleAddNew = () => {
    router.push(`/admin/categories/${params.id}/subcategories/edit/new`);
  };

  const handleEdit = (subcategory) => {
    router.push(`/admin/categories/${params.id}/subcategories/edit/${subcategory._id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this subcategory?')) return;

    try {
      await apiRequest(`/api/category/subCategory/${id}`, 'DELETE');
      fetchSubcategories();
    } catch (err) {
      console.error('Failed to delete subcategory:', err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          {/* <button
            onClick={() => router.push('/admin/categories')}
            className="text-gray-800 hover:text-gray-900"
          >
            ← Back to Categories
          </button> */}
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Add New Subcategory
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subcategories?.map((subcategory) => (
          <div
            key={subcategory?._id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{subcategory?.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(subcategory)}
                  className="px-3 py-1 text-sm text-green-800 hover:text-green-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subcategory?._id)}
                  className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Status: {subcategory.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}