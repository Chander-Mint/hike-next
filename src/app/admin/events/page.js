'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CommonTable from '@/src/app/admin/components/CommonTable';

const columns = [
    { label: 'Title', accessor: 'title' },
    { label: 'Region', accessor: 'location' },
    // {
    //     label: 'Ticket Price (₹)',
    //     accessor: 'latestTicket.price',
    //     render: (value) => (value != null ? `${value.toLocaleString('en-IN')}` : '-')
    // },
    // {
    //     label: 'Event Starts on',
    //     accessor: 'latestTicket.startDate',
    //     render: (value) =>
    //         value
    //             ? new Date(value).toLocaleDateString('en-IN', {
    //                 year: 'numeric',
    //                 month: 'long',
    //                 day: 'numeric',
    //             })
    //             : '-',
    // },
    // {
    //     label: 'Status',
    //     accessor: 'latestTicket.status',
    //     render: (value) => (value || '-')
    // },
];

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const res = await fetch('/api/event');
        const data = await res.json();
        setEvents(data.events);
    };

    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Events</h1>
                <button
                    onClick={() => router.push('/admin/events/event')}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                >
                    + Add New Event
                </button>
            </div>

            <CommonTable
                columns={columns}
                data={events}
                onEdit={(event) => router.push(`/admin/events/${event._id}`)}
            />
        </div>
    );
}
