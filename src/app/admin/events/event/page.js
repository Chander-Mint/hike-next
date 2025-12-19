'use client';

import { useRouter } from 'next/navigation';
import EventForm from '../eventForm/page';

export default function CreateEventPage() {
    const router = useRouter();

    const handleSubmit = async (formData) => {
        const res = await fetch('/api/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            router.push('/admin/events');
        }
    };

    return (
        <div className="p-6">
            {/* <h1 className="text-2xl font-semibold mb-4">Create Event</h1> */}
            <EventForm initialValues={null} onSubmit={handleSubmit} onCancel={() => router.push('/admin/events')} />
        </div>
    );
}
