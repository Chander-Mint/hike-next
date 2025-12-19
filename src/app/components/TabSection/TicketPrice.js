'use client'

import React from 'react'
import { useCart } from '../../(website)/context/CartContext';
import { useRouter } from 'next/navigation';

function TicketPrice({ event }) {
    const router = useRouter();
    const { addToCart } = useCart()

    const handleAddToCart = (event, ticket) => {
        const item = {
            eventSlug: event.slug,
            eventName: event.title,
            quantity: 1,
            ticketId: ticket._id,
            price: ticket.price,
            startDate: ticket.startDate,
            endDate: ticket.endDate
        }
        addToCart(item);
        router.push('/cart');
    };

    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Ticket & Price</h2>
            <div className="overflow-x-auto border border border-gray-300 shadow-lg">
                <table className="w-full border-collapse bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-300 text-gray-800 text-sm sm:text-base">
                            <th className="p-3 sm:p-4 text-center font-semibold border-b border-gray-300">Start Date</th>
                            <th className="p-3 sm:p-4 text-center font-semibold border-b border-gray-300">End Date</th>
                            <th className="p-3 sm:p-4 text-center font-semibold border-b border-gray-300">Price</th>
                            <th className="p-3 sm:p-4 text-center font-semibold border-b border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.tickets.map((ticket, index) => (
                            <tr
                                key={index}
                                className={`text-gray-900 text-sm sm:text-base ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-gray-100 transition-colors`}
                            >
                                <td className="p-3 sm:p-4 border-b text-center border-gray-200">
                                    {new Date(ticket.startDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td className="p-3 sm:p-4 text-center border-b border-gray-200">
                                    {ticket.endDate
                                        ? new Date(ticket.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                        : 'N/A'}
                                </td>
                                <td className="p-3 sm:p-4 text-center border-b border-gray-200">₹{ticket.price.toLocaleString()}</td>
                                <td className="p-3 sm:p-4 text-center border-b border-gray-200">
                                    {ticket.status === 'Available' ? (
                                        <button className="bg-gray-800 text-white px-4 sm:px-3 py-1.5 sm:py-1 rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-sm" onClick={() => handleAddToCart(event, ticket)}>
                                            Book Now
                                        </button>
                                    ) : (
                                        <span className="text-red-500 text-sm sm:text-base">{ticket.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TicketPrice