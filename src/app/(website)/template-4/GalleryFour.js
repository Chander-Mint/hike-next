"use client";

import Image from "next/image";
import { useState } from "react";

export default function OurGalleryTwo({ gallery }) {
  const galleryImages = (Array.isArray(gallery) ? gallery : []).map(
    (image) => ({
      url: image.url,
    })
  );

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openImage = (index) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);
  const showNext = () =>
    setSelectedIndex((selectedIndex + 1) % galleryImages.length);
  const showPrev = () =>
    setSelectedIndex(
      (selectedIndex - 1 + galleryImages.length) % galleryImages.length
    );

  const displayedImages = galleryImages.slice(0, 4);

  return (
    <section className="container mx-auto relative w-full py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative text-center py-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-full h-24 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              ></path>
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-cyan-500 text-2xl font-semibold mb-4 font-new">
              Recent Journey Photos
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Gallery Of Our Tours{" "}
            </h1>
          </div>
        </div>
        {displayedImages.length === 0 ? (
          <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
            No Images Found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {/* Left Big Image (First Image) */}
            <div className="sm:row-span-2">
              <Image
                src={displayedImages[0].url}
                alt="Gallery image 1"
                width={640}
                height={480}
                onClick={() => openImage(0)}
                className="w-full h-full object-cover cursor-pointer hover:opacity-70 transition"
              />
            </div>

            {/* Right Side Images */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 col-span-2">
              {displayedImages.slice(1).map((image, index) => (
                <Image
                  key={index + 1}
                  src={image.url}
                  alt={`Gallery image ${index + 2}`}
                  width={320}
                  height={240}
                  onClick={() => openImage(index + 1)}
                  className="w-full h-48 object-cover cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
            <div className="sm:row-span-2">
              <Image
                src={displayedImages[0].url}
                alt="Gallery image 1"
                width={640}
                height={480}
                onClick={() => openImage(0)}
                className="w-full h-full object-cover  cursor-pointer hover:opacity-80 transition"
              />
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              width={640}
              height={480}
              src={galleryImages[selectedIndex].url}
              alt="Full page gallery image"
              className="max-w-full max-h-[90vh] object-contain "
            />

            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={showPrev}
              className="absolute left-4 text-white hover:text-orange-700 text-4xl sm:text-5xl"
            >
              ‹
            </button>

            {/* Next */}
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
