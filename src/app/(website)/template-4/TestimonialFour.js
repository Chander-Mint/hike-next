"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Added Autoplay
import Image from "next/image";

export default function TestimonialFour({ testimonials }) {
  const testimonialData =
    testimonials && testimonials.length > 0
      ? testimonials.map((testimonial) => ({
          name: testimonial.author,
          text: testimonial.content.replace(/<\/?[^>]+(>|$)/g, ""),
          image: testimonial.image,
        }))
      : [];

  if (testimonialData.length === 0) {
    return (
      <section className="bg-[#2e2d2c] py-12 sm:py-16 px-4 sm:px-6 relative"></section>
    );
  }

  return (
    <section className="container mx-auto py-12 sm:py-16 px-4 sm:px-6 relative">
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
               What They Say About Hike
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Latest Experiences
            </h1>
          </div>
        </div>
        <div className="relative pb-12 px-32">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Added Autoplay module
            spaceBetween={15}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ // Added autoplay configuration
              delay: 3000, // Delay between transitions in milliseconds (3 seconds)
              disableOnInteraction: false, // Autoplay continues even after user interaction
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 1, spaceBetween: 25 },
              1024: { slidesPerView: 1, spaceBetween: 30 },
            }}
            className="pt-6"
          >
            {testimonialData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#f7f7f7] p-4 sm:p-6 m-1 sm:m-2 flex items-center text-center h-full">
                  <Image
                    width={130}
                    height={130}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-[130px] w-[130px] rounded-full object-cover mb-3 sm:mb-6"
                  />
                  <div className="px-6 text-left">
                    <p className="text-gray-700 text-sm sm:text-lg mb-3 sm:mb-4 line-clamp-6">
                      {testimonial.text}
                    </p>
                    <h4 className="font-bold text-black text-base sm:text-lg">
                      {testimonial.name}
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}