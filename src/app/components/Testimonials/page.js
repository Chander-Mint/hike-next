'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

export default function Testimonials({ testimonials }) {
    const testimonialData = testimonials && testimonials.length > 0 ? testimonials.map(testimonial => ({
        name: testimonial.author,
        text: testimonial.content.replace(/<\/?[^>]+(>|$)/g, ''),

        image: testimonial.image,
    })) : [];

    if (testimonialData.length === 0) {
        return <section className="bg-[#2e2d2c] py-12 sm:py-16 px-4 sm:px-6 relative"></section>;
    }

    return (
        <section className="bg-[#2e2d2c] py-12 sm:py-16 px-4 sm:px-6 relative">
            <div className='max-w-7xl mx-auto'>
                <div className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-orange-700">TESTIMONIALS</h2>
                </div>

                <Swiper
                    modules={[Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    className="pb-12"
                >
                    {testimonialData.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-lg p-4 sm:p-6 m-1 sm:m-2 shadow-md flex flex-col items-center text-center h-full">
                                <Image
                                    width={20}
                                    height={20}
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 sm:mb-4"
                                />
                                <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-6">{testimonial.text}</p>
                                <h4 className="font-bold text-black text-base sm:text-lg">{testimonial.name}</h4>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}