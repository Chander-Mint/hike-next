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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-black text-center">
            Our Gallery
          </h2>{" "}
          <a
            href="/gallery"
            className="text-orange-700 hover:text-orange-900 text-md sm:text-base"
          >
            View All Photos →
          </a>
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
                className="w-full h-full object-cover rounded-xl cursor-pointer hover:opacity-70 transition"
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
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
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
                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
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
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
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
