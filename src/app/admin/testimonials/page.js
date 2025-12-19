'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ItemCard from './card';
import { apiRequest } from '../utils/api';
import AdminLoader from '../components/AdminLoader';

export default function TestimonialsPage() {
    const router = useRouter();
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setIsLoading(true);
                const response = await apiRequest('/api/testimonial', 'GET');
                // if (!response.ok) {
                //     throw new Error('Failed to fetch testimonials');
                // }
                const data = await response
                const testimonialsData = data.testimonials || data || [];
                setTestimonials(testimonialsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const handleAddNew = () => {
        router.push('/admin/testimonials/form/new');
    };

    const handleEdit = (testimonial) => {
        const id = testimonial._id || testimonial.id;
        if (!id) {
            setError('Testimonial ID is missing');
            return;
        }
        router.push(`/admin/testimonials/form/${id}`);
    };

    // const handleDelete = async (id) => {
    //     if (!confirm('Delete this testimonial?')) return;
    //     try {
    //         const response = await fetch(`/api/testimonial/${id}`, {
    //             method: 'DELETE',
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to delete testimonial');
    //         }
    //         setTestimonials(testimonials.filter((testimonial) => (testimonial._id || testimonial.id) !== id));
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };

    if (isLoading) {
        return <div className="p-6"><AdminLoader /></div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-end items-center mb-6">
                <button
                    onClick={handleAddNew}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
                >
                    Add New Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <ItemCard
                        key={testimonial._id || testimonial.id}
                        title={testimonial.author}
                        content={testimonial.content}
                        imageUrl={testimonial.image}
                        onEdit={() => handleEdit(testimonial)}
                        onDelete={() => handleDelete(testimonial._id || testimonial.id)}
                    />
                ))}
            </div>
        </div>
    );
}