import Image from 'next/image';
import React from 'react';

export default function EventCard({ title = "", description = "", month = "", year = "", location = "", price = "", image = "" }) {
    // Strip all HTML tags from description
    const plainDescription = description.replace(/<\/?[^>]+(>|$)/g, '');

    return (
        <div className="bg-white overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-500">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    width={640}
                    height={400}
                />
                {/* Black overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-500" />
                {/* Uncomment if you want to restore the month/year badge */}
                {/* <div className="absolute top-4 left-4 bg-orange-400 rounded-full w-16 h-16 flex flex-col items-center justify-center text-gray-900">
                    <div className="text-xl font-bold leading-none">{month}</div>
                    <div className="text-sm leading-none">{year}</div>
                </div> */}
            </div>
            <div className="p-6 border-b border-r border-l border-gray-200">
                <h3 className="text-lg group-hover:text-orange-700 font-semibold mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{plainDescription}</p>
                {location && (
                    <div className="flex items-center mb-4">
                        <svg className="w-5 h-5 text-orange-700 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-800">{location}</span>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <button className="group-hover:bg-black transition-300 bg-orange-700 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors duration-300">
                        Book Now
                    </button>
                    {price && (
                        <div className="text-lg font-semibold text-gray-800">
                            INR {price.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}