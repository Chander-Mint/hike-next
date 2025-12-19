"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TestimonialFive({ testimonials }) {
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
    <motion.section
      className="py-12 relative testimonial-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <img
            src="/download.svg"
            alt="line"
            className="design-image"
          />
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="relative text-center py-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-full h-24 text-gray-200 opacity-40"
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
              <h3 className="text-white text-2xl font-semibold mb-4 ">
                Voices of Hike
              </h3>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 font-new">
                Latest Experiences
              </h1>
            </div>
          </motion.div>

          {/* Swiper Section */}
          <motion.div
            className="relative pb-12 px-0 sm:px-10 md:px-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={15}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
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
                  <motion.div
                    className="bg-[#ff7102] p-4 sm:p-6 m-1 shadow-white sm:m-2 flex flex-col sm:flex-row items-center text-center sm:text-left h-full rounded-lg shadow-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-0 sm:px-6 feedback-text">
                      <p className="text-white text-sm sm:text-lg mb-3 sm:mb-4 line-clamp-6">
                        {testimonial.text}
                      </p>
                      <h4 className="font-bold text-gray-700 text-2xl sm:text-2xl">
                        {testimonial.name}
                      </h4>
                    </div>
                    <motion.div
                      initial={{ y: -100, rotate: -125, opacity: 0 }}
                      whileInView={{ y: 0, rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="feedback-image"
                    
                    >
                      <Image
                        width={230}
                        height={230}
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-[230px] w-[230px] rounded-xl object-cover mb-3 sm:mb-0"
                      />
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
