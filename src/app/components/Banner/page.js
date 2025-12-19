'use client';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Banner({ mainEvents }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();
    const [currentSlideData, setCurrentSlideData] = useState(mainEvents?.[0] || {});

    const slides = mainEvents && mainEvents?.length > 0 ? mainEvents?.map(event => ({
        title: event?.title,
        subtitle: "Adventure Awaits with Hike",
        img: event?.img,
        slug: event?.slug,
    })) : [];

    if (slides?.length === 0) {
        return <section className="relative h-[70vh] lg:h-[100vh] w-full"></section>;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides?.length);
            setCurrentSlideData(slides[(currentSlide + 1) % slides.length]);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="relative h-[70vh] lg:h-[90vh] w-full">

            <div className="relative h-full">
                <Image
                    src={currentSlideData?.img}
                    alt={currentSlideData?.title}
                    className="w-full h-full object-cover max-h-[100vh]"
                    width={600}
                    height={480}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20  flex flex-col items-start justify-center px-4 sm:px-8 md:px-12 lg:px-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold primary-color mb-4 sm:mb-6">
                        {currentSlideData?.title}
                    </h1>
                    <button
                        onClick={() => router.push(`/event/${currentSlideData?.slug}`)}
                        className="primary-color text-black px-6 py-2 sm:px-8 sm:py-3 rounded hover:primary-color transition-colors duration-300 text-xs sm:text-base"
                    >
                        Know More
                    </button>
                </div>
            </div>
            <button
                onClick={() => {
                    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
                    setCurrentSlideData(slides[(currentSlide - 1 + slides.length) % slides.length]);
                }}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 rounded bg-black bg-opacity-50 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
                <Icon icon="iconoir:nav-arrow-left" width="20" height="20" className="sm:w-24 sm:h-24" />
            </button>
            <button
                onClick={() => {
                    setCurrentSlide((prev) => (prev + 1) % slides?.length);
                    setCurrentSlideData(slides[(currentSlide + 1) % slides.length]);
                }}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 rounded bg-black bg-opacity-50 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
                <Icon icon="iconoir:nav-arrow-right" width="20" height="20" className="sm:w-24 sm:h-24" />
            </button>
        </section>
    );
}