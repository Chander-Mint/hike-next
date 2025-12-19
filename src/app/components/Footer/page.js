'use client'

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const settings = JSON.parse(localStorage.getItem('hikeSettings'))

    useEffect(() => {
        async function fetchGalleryImages() {
            try {
                const response = await fetch('/api/gallery');
                const data = await response.json();

                if (data?.images && Array.isArray(data?.images)) {
                    const images = data?.images.slice(0, 6).map(image => ({
                        url: image.url,
                    }));
                    setGalleryImages(images);
                } else {
                    setGalleryImages([]);
                }
            } catch (error) {
                console.error('Footer: Error fetching gallery images:', error.message);
                setGalleryImages([]);
            }
        }

        fetchGalleryImages();
    }, []);

    const openImage = (index) => {
        setSelectedIndex(index);
    };

    const closeImage = () => {
        setSelectedIndex(null);
    };

    const showNext = () => {
        if (selectedIndex !== null && galleryImages.length > 0) {
            setSelectedIndex((selectedIndex + 1) % galleryImages.length);
        }
    };

    const showPrev = () => {
        if (selectedIndex !== null && galleryImages.length > 0) {
            setSelectedIndex((selectedIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    return (
        <footer className="bg-[#333] text-white  pt-8 pb-3 px-4 sm:px-6">
            <div className="container mx-auto px-6 pt-10 pb-10 flex flex-wrap gap-8 sm:gap-12 justify-between">
                {/* Logo + About */}
                <div className="w-full sm:w-auto lg:max-w-sm flex flex-col items-center sm:items-start">
                    <Image width={200} height={100} src={settings?.logo || "/hike_logo.png"} alt="Hike" className="w-24 sm:w-22 mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base font-400 leading-relaxed text-center sm:text-left">
                        {settings?.description}
                    </p>
                </div>

                {/* Quick Links */}
                <div className="w-full lg:w-auto lg:min-w-fit flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 border-b border-white inline-block pb-1">
                        Quick Links
                    </h3>
                    <ul className="space-y-1 mt-2 text-base sm:text-md whitespace-nowrap">
                        <li className='mb-2'><a href="/event" className="hover:text-orange-600 transition-400">All Events</a></li>
                        <li className='mb-2'><a href="#" className=" hover:text-orange-600 transition-400">Rent</a></li>
                        <li className='mb-2'><a href="/blog" className=" hover:text-orange-600 transition-400">Blogs</a></li>
                        <li className='mb-2'><a href="/privacy" className=" hover:text-orange-600 transition-400">Privacy Policy</a></li>
                        <li className='mb-2'><a href="/career" className=" hover:text-orange-600 transition-400">Career in Hike</a></li>
                        <li><a href="#" className=" hover:text-orange-600 transition-400">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Gallery */}
                <div className="w-full lg:w-auto flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 border-b border-white inline-block pb-1">
                        Our Gallery
                    </h3>
                    {galleryImages?.length === 0 ? (
                        <div className="text-center text-gray-300 text-base sm:text-lg mt-2">
                            No Images Found
                        </div>
                    ) : (
                        <div className="grid grid-cols-6 sm:grid-cols-3 gap-1 sm:gap-2 mt-2">
                            {galleryImages.map((image, index) => (
                                <Image
                                    width={640}
                                    height={480}
                                    key={index}
                                    src={image.url}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded cursor-pointer hover:opacity-40 transition-opacity duration-300"
                                    onClick={() => openImage(index)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Contact Info */}
                <div className="w-full sm:w-auto max-w-xs flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 border-b border-white inline-block pb-1">
                        Contacts
                    </h3>
                    <ul className="space-y-3 sm:space-y-4 mt-3 sm:mt-4 text-base text-md font-light">
                        <li className="text-md flex items-start gap-2 sm:gap-3">
                            {/* <Icon icon="mdi:map-marker" className="text-3xl sm:text-4xl mt-0.5 sm:mt-1" /> */}
                            <span>{settings?.address}</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                            {/* <Icon icon="mdi:phone" className="text-xl sm:text-2xl" /> */}
                            <a href="tel:+918288969648" className="hover:underline">{settings?.phoneNumber}</a>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                            {/* <Icon icon="mdi:email-outline" className="text-xl sm:text-2xl" /> */}
                            <a href="mailto:info@hike.com" className="hover:underline">{settings?.email}</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-10 border-t border-gray-400 pt-3 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center sm:justify-between text-sm sm:text-base max-w-7xl mx-auto">
                <div className="text-center sm:text-left flex items-center">
                    <p>Copyright © 2025, {settings?.title}. | All Rights Reserved</p>
                    <p>
                        Designed by <a href="https://minterminds.com" className="underline">Minterminds</a>
                    </p>
                </div>
                <div className="flex gap-3 sm:gap-4">
                    <a href={settings?.socialMedia?.facebook} target="_blank">
                        <Icon icon="mdi:facebook" className="text-xl sm:text-xl hover:text-orange-600" />

                    </a>
                    <a href={settings?.socialMedia?.twitter} target="_blank">
                        <Icon icon="mdi:twitter" className="text-xl sm:text-xl hover:text-orange-600" />
                    </a>
                    <a href={settings?.socialMedia?.linkedin} target="_blank">
                        <Icon icon="mdi:linkedin" className="text-xl sm:text-xl hover:text-orange-600" />
                    </a>
                    <a href={settings?.socialMedia?.instagram} target="_blank">
                        <Icon icon="mdi:instagram" className="text-xl sm:text-xl hover:text-orange-600" />
                    </a>
                    <a href={settings?.socialMedia?.youtube} target="_blank">
                        <Icon icon="mdi:youtube" className="text-xl sm:text-xl hover:text-orange-600" />
                    </a>
                </div>
            </div>

            {/* Fullscreen Image Modal with Next/Prev */}
            {
                selectedIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                            <Image
                                width={640}
                                height={480}
                                src={galleryImages[selectedIndex]?.url}
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
                )
            }
        </footer >
    );
}
