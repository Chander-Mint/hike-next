'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// import { FaArrowLeft } from 'react-icons/fa';

export default function BookingDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/order/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to fetch booking');
                setBooking(data.order);
            } catch (err) {
                setError(err.message || 'Something went wrong');
                console.error('Error fetching booking:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBooking();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen p-6 bg-white">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="min-h-screen p-6 bg-white">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center"
                >
                    {/* <FaArrowLeft className="mr-2" /> Go Back */}
                </button>
            </div>
        );
    }


    if (!booking) {
        return (
            <div className="min-h-screen p-6 bg-white">
                <p>No booking found</p>
                <button
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 flex items-center"
                >
                    {/* <FaArrowLeft className="mr-2" /> Go Back */}
                </button>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusBadge = (status) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status === 'Completed' ? 'bg-green-100 text-green-800' :
            status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
            }`}>
            {status || 'Processing'}
        </span>
    );

    return (
        <div className="min-h-screen p-6 bg-white">
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    {/* <FaArrowLeft className="mr-2" /> Back to Bookings */}
                </button>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold">Booking Details</h1>
                        <p className="text-gray-600">Order ID: {booking._id}</p>
                    </div>
                    <div className="flex space-x-4">
                        <span className="text-sm text-gray-600">
                            Created: {formatDate(booking.createdAt)}
                        </span>
                        {getStatusBadge(booking.orderStatus)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Order Status:</span>
                            <span className="font-medium">{booking.orderStatus || 'Processing'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Payment Status:</span>
                            <span className="font-medium">{booking.paymentStatus || 'Pending'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium">{booking.paymentMethod || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold mt-4 pt-4 border-t">
                            <span>Total Amount:</span>
                            <span>₹{booking.totalAmount?.toLocaleString('en-IN') || '0'}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
                    {booking.user ? (
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">
                                    {booking.shippingAddress.phoneNumber || 'Guest'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">
                                    {booking.user.email || 'N/A'}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p>Guest User</p>
                    )}

                    <h3 className="text-md font-semibold mt-4 mb-2">Shipping Address</h3>
                    <div className="space-y-1 text-sm">
                        <p>{booking.shippingAddress?.address || 'N/A'}</p>
                        {booking.shippingAddress?.city && <p>{booking.shippingAddress.city}</p>}
                        {booking.shippingAddress?.state && <p>{booking.shippingAddress.state}</p>}
                        {booking.shippingAddress?.country && <p>{booking.shippingAddress.country}</p>}
                        {/* {booking.shippingAddress?.phoneNumber && (
                            <p>Phone: {booking.shippingAddress.phoneNumber}</p>
                        )} */}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                    <div className="space-y-4">
                        {booking.items?.map((item, index) => (
                            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex justify-between">
                                    <div>
                                        <h4 className="font-medium">{item.event || 'Event'}</h4>
                                        {/* <p className="text-sm text-gray-600">Ticket ID: {item.ticketId}</p> */}
                                    </div>
                                    <div className="text-right">
                                        <p>₹{item.price?.toLocaleString('en-IN')} × {item.quantity}</p>
                                        <p className="font-medium">
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Order Actions</h2>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Update Status
                        </button>
                        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                            Send Invoice
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
