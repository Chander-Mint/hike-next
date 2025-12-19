'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function OurGallery({ gallery }) {
    const galleryImages = (Array.isArray(gallery) ? gallery : []).map(image => ({
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
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % galleryImages.length);
        }
    };

    const showPrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    return (
        <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6">
            <div className='max-w-7xl mx-auto'>
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-orange-700">OUR GALLERY</h2>
                    <a href="/gallery" className="text-orange-700 hover:text-orange-700 text-sm sm:text-base">
                        View All Photos →
                    </a>
                </div>

                {galleryImages.length === 0 ? (
                    <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
                        No Images Found
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {galleryImages.slice(0, 4).map((image, index) => (
                            <div key={index} className="cursor-pointer">
                                <Image
                                    width={640}
                                    height={480}
                                    src={image.url}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-40 sm:h-44 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300"
                                    onClick={() => openImage(index)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                        <Image
                            width={640}
                            height={480}
                            src={galleryImages[selectedIndex].url}
                            alt="Full page gallery image"
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
        </section>
    );
}
