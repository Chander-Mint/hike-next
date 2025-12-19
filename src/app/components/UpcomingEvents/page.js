
'use client';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function UpcomingEvents({ upcomingEvents }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(typeof window !== "undefined" && window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const events = upcomingEvents && upcomingEvents?.length > 0 ? upcomingEvents?.map(event => ({
        title: event?.title,
        image: event?.img,
        slug: event?.slug,
    })) : [];

    const next = () => {
        const cardsToMove = isSmallScreen ? 1 : 2;
        setCurrentIndex((prev) => (prev + cardsToMove) % events?.length);
    };

    const prev = () => {
        const cardsToMove = isSmallScreen ? 1 : 2;
        setCurrentIndex((prev) => (prev - cardsToMove + events?.length) % events?.length);
    };

    const translatePercentage = isSmallScreen ? 100 : 51.5;

    const handleViewAllEvents = (e) => {
        e.preventDefault();
        router.push('/event');
    };

    if (events?.length === 0) {
        return <div className="relative w-full max-w-6xl mx-auto"></div>;
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-0 py-8 sm:py-10">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-700">UPCOMING EVENTS</h2>
                <a
                    href="#"
                    onClick={handleViewAllEvents}
                    className="text-orange-700 font-semibold flex items-center hover:underline text-xs sm:text-base"
                >
                    View All Events
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            next();
                        }}
                        className="bg-white text-orange-700 rounded-full h-4 w-4 sm:h-5 sm:w-5 text-4xl sm:text-5xl px-0.5 sm:px-1 border-2 border-orange-500 flex items-center justify-center hover:bg-opacity-75 transition-all m-1 sm:m-2"
                    >
                        <Icon icon="iconoir:nav-arrow-right" width="12" height="12" className="sm:w-16 sm:h-16" />
                    </button>
                </a>
            </div>

            <div className="relative w-full mx-auto">
                <div className="relative overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Array.from({ length: isSmallScreen ? 1 : 2 }).map((_, i) => {
                            const index = (currentIndex + i) % events.length;
                            const event = events[index];
                            return (
                                <div key={index} className="cursor-pointer" onClick={() => router.push(`/event/${event.slug}`)}>
                                    <div className="relative w-full h-[400px] sm:h-[350px]">
                                        <Image
                                            src={event.image}
                                            alt={event.title || 'Event image'}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                    <h3 className="mt-2 text-sm text-center font-semibold">{event.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-2 sm:px-0 z-10">
                    <button
                        onClick={prev}
                        className="bg-white text-orange-700 rounded-full h-8 w-8 sm:h-10 sm:w-10 text-xl sm:text-2xl px-1 border-2 border-orange-500 flex items-center justify-center hover:bg-opacity-75 transition-all"
                    >
                        <Icon icon="iconoir:nav-arrow-left" width="20" height="20" className="sm:w-24 sm:h-24" />
                    </button>
                    <button
                        onClick={next}
                        className="bg-white text-orange-700 rounded-full h-8 w-8 sm:h-10 sm:w-10 text-xl sm:text-2xl px-1 border-2 border-orange-500 flex items-center justify-center hover:bg-opacity-75 transition-all"
                    >
                        <Icon icon="iconoir:nav-arrow-right" width="20" height="20" className="sm:w-24 sm:h-24" />
                    </button>
                </div>
            </div>
        </div>
    );
}