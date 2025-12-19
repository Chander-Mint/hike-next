"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function GalleryFive({ gallery }) {
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

  return (
    <motion.section
      className="container mx-auto relative w-full py-12 sm:py-16 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="relative text-center py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
            <h3 className="text-cyan-500 text-2xl font-semibold mb-4 ">
              Recent Journey Photos
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 font-new">
              Gallery Of Our Tours
            </h1>
          </div>
        </motion.div>

        {/* Marquee Images */}
        {galleryImages.length === 0 ? (
          <div className="text-center text-gray-700 text-lg sm:text-xl md:text-2xl">
            No Images Found
          </div>
        ) : (
          <div className="space-y-8 overflow-hidden">
            {/* Row 1 */}
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {galleryImages.map((img, idx) => (
                <Image
                  key={`row1-${idx}`}
                  src={img.url}
                  alt={`Gallery Image ${idx + 1}`}
                  width={300}
                  height={200}
                  className="w-[300px] h-[200px] object-cover rounded cursor-pointer hover:opacity-80 transition"
                  onClick={() => openImage(idx)}
                />
              ))}
            </div>

            {/* Row 2 (reverse direction) */}
            <div className="flex gap-4 animate-marquee-reverse whitespace-nowrap">
              {galleryImages.map((img, idx) => (
                <Image
                  key={`row2-${idx}`}
                  src={img.url}
                  alt={`Gallery Image ${idx + 1}`}
                  width={300}
                  height={200}
                  className="w-[300px] h-[200px] object-cover rounded cursor-pointer hover:opacity-80 transition"
                  onClick={() => openImage(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              width={640}
              height={480}
              src={galleryImages[selectedIndex].url}
              alt="Full page gallery image"
              className="max-w-full max-h-[90vh] object-contain"
            />

            {/* Close */}
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
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
        </motion.div>
      )}
    </motion.section>
  );
}
