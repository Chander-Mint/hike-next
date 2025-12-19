"use client";
import Image from "next/image";
import { useState } from "react";

export default function OurGalleryT({ gallery }) {
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

  const displayedImages = galleryImages.slice(0, 6); // Adjusted to 6 to match 2x3 grid

  return (
    <section className="container mx-auto relative w-full py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative text-center py-16">
          <div className="flex items-center justify-center relative mb-8">
            <div className="text-center">
              <h2 className="text-6xl md:text-8xl font-semibold text-gray-800 opacity-15 absolute top-1/4 left-0 w-full transform -translate-y-1/2">
                JOURNEYS
              </h2>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 relative uppercase mt-6 z-10 inline-block">
                GALLERY OF OUR TOURS
              </h2>
              <p className="text-gray-600 mt-2">
                Explore the beauty of our journeys through stunning visuals.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 py-6">
          {displayedImages.length === 0 ? (
            <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl col-span-full">
              No Images Found
            </div>
          ) : (
            <>
              {/* First Row */}
              <div
                className="h-[240px] sm:col-span-1 row-span-1 relative overflow-hidden  cursor-pointer hover:opacity-80 transition"
                onClick={() => openImage(0)}
              >
                <Image
                  src={displayedImages[0]?.url || ""}
                  alt="Gallery image 1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className=" h-[240px] sm:col-span-3 row-span-1 relative overflow-hidden  cursor-pointer hover:opacity-80 transition"
                onClick={() => openImage(1)}
              >
                <Image
                  src={displayedImages[1]?.url || ""}
                  alt="Gallery image 2"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="h-[240px] sm:col-span-2 row-span-1 relative overflow-hidden  cursor-pointer hover:opacity-80 transition"
                onClick={() => openImage(2)}
              >
                <Image
                  src={displayedImages[2]?.url || ""}
                  alt="Gallery image 3"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Second Row */}
              <div
                className="h-[240px] sm:col-span-2 row-span-1 relative overflow-hidden  cursor-pointer hover:opacity-80 transition"
                onClick={() => openImage(3)}
              >
                <Image
                  src={displayedImages[3]?.url || ""}
                  alt="Gallery image 4"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="h-[240px] sm:col-span-3 row-span-1 relative overflow-hidden  cursor-pointer hover:opacity-80 transition"
                onClick={() => openImage(4)}
              >
                <Image
                  src={displayedImages[4]?.url || ""}
                  alt="Gallery image 5"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="h-[240px] sm:col-span-1 row-span-1 relative overflow-hidden  cursor-pointer hover:opacity-80 transition"
                onClick={() => openImage(5)}
              >
                <Image
                  src={displayedImages[5]?.url || ""}
                  alt="Gallery image 6"
                  width={200}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
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
                className="max-w-full max-h-[90vh] object-contain"
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
      </div>
    </section>
  );
}
