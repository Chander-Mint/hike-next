"use client";

import { useEffect, useState } from "react";

const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function HeroBannerThree() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[120vh] overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center items-center px-4 text-white text-center min-h-[120vh] pb-10">
        {/* Background HIKKER text */}
        <h2 className="absolute bottom-[300px] text-[120px] sm:text-[120px] md:text-[150px] lg:text-[240px] font-extrabold uppercase opacity-10 tracking-tight leading-none z-99 select-none pointer-events-none">
          HIKKER
        </h2>

        {/* Foreground Heading + Buttons */}
        <div className="relative z-20 pt-24 mt-10 max-w-7xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase">
            Be Prepared for the Mountains and Beyond
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-200 max-w-5xl mx-auto">
            Discover top-rated gear and expert guides that help you go farther,
            climb higher, and explore deeper.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 px-8 py-4 text-white font-bold">
              Contact Us
            </button>
            <button className="border border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-black transition">
              Watch Intro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
