'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchApiData } from '@/src/app/utils/api';
import { showToast } from '@/src/utils/toast';

const Banner = dynamic(() => import('@/src/app/components/Banner/page'));
const UpcomingEvents = dynamic(() => import('@/src/app/components/UpcomingEvents/page'), { ssr: true });
const LatestBlogs = dynamic(() => import('@/src/app/components/LatestBlogs/page'), { ssr: true });
const WhyWithUs = dynamic(() => import('@/src/app/components/WhyWithUs/page'), { ssr: true });
const OurGallery = dynamic(() => import('@/src/app/components/OurGallery/page'), { ssr: true });
const Testimonials = dynamic(() => import('@/src/app/components/Testimonials/page'), { ssr: true });

export default function Home({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsModalOpen(true);
    //     }, 10000);

    //     return () => clearTimeout(timer);
    // }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string()
                .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const queryData = {
                    name: values.name,
                    email: values.email,
                    phoneNumber: values.phone,
                    message: values.message,
                };

                const response = await fetchApiData('/api/query', 'POST', 'application/json', queryData);

                resetForm();
                showToast('Query submitted successfully!', 'success')
                setTimeout(() => setIsModalOpen(false), 1500);
            } catch (error) {
                console.error('Home Modal: Error submitting query:', error.message);
                showToast('Failed to submit query: ' + error.message, 'error')
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen">
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-4 sm:p-4 md:p-6 lg:p-8 w-full max-w-sm sm:max-w-md md:max-w-md mx-2 relative animate-fadeSlideUp">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">CONTACT US</h2>
                        <form onSubmit={formik.handleSubmit} className="space-y-2 sm:space-y-2">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-400 text-sm sm:text-base ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                                        }`}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.name}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-400 text-sm sm:text-base ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                                        }`}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.email}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    maxLength={10}
                                    className={`w-full p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-400 text-sm sm:text-base ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
                                        }`}
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.phone}</p>
                                ) : null}
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full p-1 sm:p-2 border border-gray-300 rounded focus:outline-none focus:border-orange-400 resize-none text-sm sm:text-base ${formik.touched.message && formik.errors.message ? 'border-red-500' : ''
                                        }`}
                                    rows="3 sm:rows-4"
                                />
                                {formik.touched.message && formik.errors.message ? (
                                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.message}</p>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className={`w-full bg-gray-200 text-orange-700 border-orange px-6 sm:px-8 py-2 sm:py-3 rounded hover:bg-orange-400 hover:text-gray-200 transition-colors duration-300 text-sm sm:text-base ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {formik.isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                            </button>
                        </form>
                    </div>
                    <style jsx>{`
                        @keyframes fadeSlideUp {
                            0% {
                                opacity: 0;
                                transform: translateY(20px);
                            }
                            100% {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                        .animate-fadeSlideUp {
                            animation: fadeSlideUp 0.5s ease-out forwards;
                        }
                    `}</style>
                </div>
            )}

            <Banner mainEvents={data?.mainEvents} />
            <section>
                <UpcomingEvents upcomingEvents={data?.upcomingEvents} />
            </section>
            <section>
                <LatestBlogs blogs={data?.blogs} />
            </section>
            <section>
                <WhyWithUs />
            </section>
            <section>
                <OurGallery gallery={data?.gallery} />
            </section>
            <section>
                <Testimonials testimonials={data?.testimonials} />
            </section>
        </div>
    );
}