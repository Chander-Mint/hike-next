'use client';

import { useEffect, useState } from 'react';

export default function TrekLoader() {
    const [textIndex, setTextIndex] = useState(0);
    const loadingTexts = [
        'Packing your gear...',
        'Checking trail maps...',
        'Filling water bottles...',
        'Lacing up your boots...',
        'Scouting the route...',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % loadingTexts.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-blue-200 via-white to-green-100 relative overflow-hidden">
            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-300 to-transparent z-0">
                <svg className="w-full h-full" viewBox="0 0 1440 320">
                    <path
                        fill="#9CA3AF"
                        fillOpacity="1"
                        d="M0,192L60,186.7C120,181,240,171,360,170.7C480,171,600,181,720,197.3C840,213,960,235,1080,218.7C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </div>

            <div className="z-10 flex flex-col items-center space-y-4 animate-float">
                <span role="img" aria-label="hiker" className="text-6xl">
                    🧗‍♂️
                </span>
                <p className="text-gray-700 text-lg font-medium animate-pulse">
                    {loadingTexts[textIndex]}
                </p>
            </div>

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-yellow-300 rounded-full opacity-80 animate-slow-bounce shadow-xl"></div>
        </div>
    );
}
