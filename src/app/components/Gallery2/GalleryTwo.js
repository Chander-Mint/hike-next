'use client';

import Image from "next/image";
import { useState } from "react";

export default function GalleryTwo({ images, bannerImage, heading }) {
    const galleryImages = (Array.isArray(images) ? images : []).map(image => ({
        url: image.url,
    }));

    const [selectedIndex, setSelectedIndex] = useState(null);

    const openImage = (index) => {
        setSelectedIndex(index);
    };

    const closeImage = () => {
        setSelectedIndex(null);
    };

    const showNext = () => {
        if (galleryImages.length > 0) {
            setSelectedIndex((selectedIndex + 1) % galleryImages.length);
        }
    };

    const showPrev = () => {
        if (galleryImages.length > 0) {
            setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Banner */}
            <div
                className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center flex items-end justify-center pb-6 sm:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`,
                }}
            >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-orange-700 uppercase tracking-wider text-center px-4">
                    {heading}
                </h1>
            </div>

            {/* Gallery */}
            <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
                {galleryImages?.length === 0 ? (
                    <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
                        No Images Found
                    </div>
                ) : (
                    <>
                        {/* Mobile Horizontal Scroll */}
                        <div className="sm:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
                            {galleryImages.map((image, index) => (
                                <div key={index} className="flex-shrink-0 snap-start">
                                    <Image
                                        width={640}
                                        height={480}
                                        src={image.url}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-64 h-40 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                        onClick={() => openImage(index)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {galleryImages.map((image, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <Image
                                        width={640}
                                        height={480}
                                        src={image.url}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-48 md:h-56 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                        onClick={() => openImage(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* Fullscreen Modal with Navigation */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <Image
                            width={640}
                            height={480}
                            src={galleryImages[selectedIndex].url}
                            alt={`Full screen image ${selectedIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />

                        {/* Close Button */}
                        <button
                            onClick={closeImage}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300"
                        >
                            <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Prev Button */}
                        <button
                            onClick={showPrev}
                            className="absolute left-4 text-white hover:text-orange-700 text-4xl sm:text-5xl"
                        >
                            ‹
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={showNext}
                            className="absolute right-4 text-white hover:text-orange-700 text-4xl sm:text-5xl"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
