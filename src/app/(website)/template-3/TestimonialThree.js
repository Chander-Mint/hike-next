"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

export default function Testimonials({ testimonials }) {
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
        <div className="flex items-center justify-center relative mb-8">
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-semibold text-gray-800 opacity-15 absolute top-1/4 left-0 w-full transform -translate-y-1/2">
              TESTIMONIALS
            </h2>
            <h2 className="text-3xl text-center md:text-4xl font-semibold text-gray-900 relative uppercase mt-6 z-10 inline-block">
              What Our Clients Say About Hike
            </h2>
            <p className="text-gray-600 mt-2">
              Hear from those who have experienced our services firsthand. </p>
          </div>
        </div>

        <div className="relative pb-12">
          <Swiper
            modules={[Pagination]}
            spaceBetween={15}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 25 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="pt-6"
          >
            {testimonialData.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#eef3f7]  p-4 sm:p-6 m-1 sm:m-2 flex flex-col items-center text-center h-full">
                  <Image
                    width={80}
                    height={80}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 sm:mb-6"
                  />
                  <p className="text-gray-700 text-sm sm:text-lg mb-3 sm:mb-4 line-clamp-6">
                    {testimonial.text}
                  </p>
                  <h4 className="font-bold text-black text-base sm:text-lg">
                    {testimonial.name}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
