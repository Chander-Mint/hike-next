'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import EventForm from '../eventForm/page';
import { apiRequest } from '../../utils/api';
import AdminLoader from '../../components/AdminLoader';
import { showToast } from '@/src/utils/toast';

export default function EditEventPage() {
    const router = useRouter();
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchEvent = async () => {
        try {
            const res = await apiRequest(`/api/event/${id}`, 'GET');
            if (res?.events) {
                const formattedData = {
                    ...res.events,
                    tickets: res.events.tickets?.map(ticket => ({
                        ...ticket,
                        status: ticket.status || 'Available',
                        startDate: ticket.startDate?.split('T')[0] || '',
                        endDate: ticket.endDate?.split('T')[0] || '',
                    })) || [],
                };
                setEventData(formattedData);
            } else {

                showToast('Event not found', 'error');
            }
        } catch (error) {
            showToast('Event not found', 'error');

        }
    };

    useEffect(() => {
        if (id) {
            fetchEvent();
        }
    }, [id]);


    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/event/${id}`, {
                method: 'PATCH',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update event');
            }

            showToast('Event updated successfully!', 'success');

            router.push('/admin/events');
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Update error:`, error);

            showToast(`Error updating event: ${error.message}`, 'error');

        } finally {
            setIsSubmitting(false);
        }
    };

    if (!eventData) {
        return (
            <div className="p-6">
                <AdminLoader />
            </div>
        );
    }


    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-semibold mb-4">Edit Event</h1> */}
            <EventForm
                initialValues={eventData}
                onSubmit={handleSubmit}
                onCancel={() => {
                    router.push('/admin/events');
                }}
            />
            {isSubmitting && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-medium">Updating event...</p>
                        <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}