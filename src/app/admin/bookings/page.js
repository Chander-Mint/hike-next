'use client';

import { useEffect, useState } from 'react';
import CommonTable from '@/src/app/admin/components/CommonTable';

const columns = [
    {
        label: 'Order ID',
        accessor: '_id',
        render: (value) => value?.substring(0, 8) + '...' || 'N/A'
    },
    {
        label: 'Customer',
        accessor: 'shippingAddress',
        render: (value) => value?.phoneNumber || 'N/A'
    },
    {
        label: 'Event',
        accessor: 'items',
        render: (items) => items?.[0]?.event || 'N/A'
    },
    {
        label: 'Date',
        accessor: 'createdAt',
        render: (value) =>
            value
                ? new Date(value).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
                : '-',
    },
    {
        label: 'Items',
        accessor: 'items',
        render: (items) => items?.reduce((total, item) => total + item.quantity, 0) || 0
    },
    {
        label: 'Amount (₹)',
        accessor: 'totalAmount',
        render: (value) => (value != null ? `₹${value.toLocaleString('en-IN')}` : '-')
    },
    {
        label: 'Status',
        accessor: 'orderStatus',
        render: (value) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${value === 'Completed' ? 'bg-green-100 text-green-800' :
                value === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                }`}>
                {value || 'Processing'}
            </span>
        )
    },
    {
        label: 'Payment',
        accessor: 'paymentStatus',
        render: (value) => (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${value === 'Paid' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
                }`}>
                {value || 'Pending'}
            </span>
        )
    },
    {
        label: 'Actions',
        accessor: '_id',
        render: (id) => (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/admin/bookings/${id}`;
                }}
                className="text-blue-600 hover:text-blue-900 p-1"
                title="View Details"
            >
                View Details
            </button>
        )
    }
];

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: '',
        payment: '',
        date: ''
    });

    useEffect(() => {
        fetchBookings();
    }, [filters]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams();
            if (filters.status) query.append('status', filters.status);
            if (filters.payment) query.append('payment', filters.payment);
            if (filters.date) query.append('date', filters.date);

            const res = await fetch(`/api/order?${query.toString()}`);
            const data = await res.json();
            setBookings(data.orders || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6 bg-white">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Bookings</h1>
                {/* <div className="flex space-x-4">
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="border rounded px-3 py-2 text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <select
                        name="payment"
                        value={filters.payment}
                        onChange={handleFilterChange}
                        className="border rounded px-3 py-2 text-sm"
                    >
                        <option value="">All Payments</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <input
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                        className="border rounded px-3 py-2 text-sm"
                    />
                </div> */}
            </div>

            <CommonTable
                columns={columns}
                data={bookings}
                onRowClick={(booking) => {
                    window.location.href = `/admin/bookings/${booking._id}`;
                }}
                rowClassName="cursor-pointer hover:bg-gray-50"
            />
        </div>
    );
}