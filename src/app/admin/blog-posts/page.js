'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import CommonTable from '@/src/app/admin/components/CommonTable';

export default function BlogPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    postId: null,
    postTitle: ''
  });

  const columns = [
    { label: 'Title', accessor: 'title' },
    { 
      label: 'Status', 
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'published' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      label: 'Date', 
      accessor: 'date',
      render: (date) => new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    {
      label: 'Actions',
      accessor: 'id',
      render: (id, row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/blog-posts/edit/${id}`);
            }}
            className="text-blue-600 hover:text-blue-900 p-1"
            title="Edit"
          >
            <Icon icon="mdi:pencil" width="18" height="18" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModal({
                isOpen: true,
                postId: id,
                postTitle: row.title
              });
            }}
            className="text-red-600 hover:text-red-900 p-1"
            title="Delete"
          >
            <Icon icon="mdi:delete" width="18" height="18" />
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/blog');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blogs');
        }

        const formattedPosts = data.blogs.map(blog => ({
          id: blog._id,
          title: blog.title,
          status: blog.status.toLowerCase(),
          date: blog.updatedAt || blog.createdAt
        }));

        setPosts(formattedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal.postId) return;
    
    try {
      const response = await fetch(`/api/blog/${deleteModal.postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete blog post');
      }

      setPosts(posts.filter(post => post.id !== deleteModal.postId));
      setDeleteModal({ isOpen: false, postId: null, postTitle: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-gray-600">
            <Icon icon="mdi:loading" width="24" height="24" className="animate-spin" />
            <span>Loading blog posts...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-white">
        <div className="p-4 bg-red-100 text-red-700 rounded-md border border-red-200 flex items-center">
          <Icon icon="mdi:alert-circle" width="24" height="24" className="mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Blog Posts</h1>
        <button
          onClick={() => router.push('/admin/blog-posts/new-blog')}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 flex items-center"
        >
          <Icon icon="mdi:plus" width="20" height="20" className="mr-1" />
          New Post
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={posts}
        onRowClick={(post) => router.push(`/admin/blog-posts/edit/${post.id}`)}
        rowClassName="hover:bg-gray-50 cursor-pointer"
      />

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Blog Post</h3>
            <p className="mb-6">
              Are you sure you want to delete "{deleteModal.postTitle}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, postId: null, postTitle: '' })}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}