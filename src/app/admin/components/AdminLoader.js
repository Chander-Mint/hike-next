'use client';

import { useEffect, useState } from 'react';

const loadingMessages = [
    'Verifying admin access...',
    'Fetching category data...',
    'Preparing control panel...',
    'Syncing with server...',
    'Almost there...',
];

export default function AdminLoader() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
            <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                <span className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center text-xl font-bold text-gray-700">
                    🛠️
                </span>
            </div>
            <p className="text-gray-600 text-base font-medium animate-pulse">{loadingMessages[messageIndex]}</p>
        </div>
    );
}
