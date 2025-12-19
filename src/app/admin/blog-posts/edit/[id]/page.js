'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import NewBlog from '@/src/app/admin/blog-posts/new-blog/page';
import { Icon } from '@iconify/react';

export default function EditBlogPost() {
  const router = useRouter();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/blog/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blog post');
        }

        setPost(data.blog);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-600">
        <div className="flex items-center justify-center space-x-2">
          <Icon icon="mdi:loading" width="24" height="24" className="animate-spin" />
          <span>Loading blog post...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md border border-red-200 flex items-center">
          <Icon icon="mdi:alert-circle" width="24" height="24" className="mr-2" />
          {error}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-600">
        Blog post not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
        <button
          onClick={() => router.push('/admin/blog-posts')}
          className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 transition duration-200"
        >
          <Icon icon="mdi:arrow-left" width="20" height="20" className="inline-block mr-1" />
          Back to Blog Posts
        </button>
      </div>
      <NewBlog post={post} />
    </div>
  );
}