"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchApiData } from "@/src/app/utils/api";
import { showToast } from "@/src/utils/toast";
import { useEffect, useState } from "react";

export default function Contact() {
    const [settings, setSettings] = useState({});

    const getSettingsData = () => {
        const settingsData = JSON.parse(localStorage.getItem("hikeSettings"));
        setSettings(settingsData);
    };

    useEffect(() => {
        getSettingsData();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
            message: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            phoneNumber: Yup.string().matches(
                /^\d{10}$/,
                "Phone number must be exactly 10 digits"
            ),
            message: Yup.string().required("Message is required"),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const queryData = {
                    name: values?.name,
                    email: values?.email,
                    phoneNumber: values?.phoneNumber,
                    message: values?.message,
                };

                const response = await fetchApiData(
                    "/api/query",
                    "POST",
                    "application/json",
                    queryData
                );

                if (response.ok) {
                    showToast('Query submitted successfully!', 'success');
                    resetForm();
                } else {
                    throw new Error('Failed to submit query');
                }
            } catch (error) {
                showToast(`Failed to submit query`, 'error');
                console.error('Contact: Error submitting query:', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="relative">
            <div className="relative h-[calc(50vh)] lg:h-[calc(80vh)] w-full">
                <div className="absolute inset-0 z-10 bg-black/40">
                    <div className="h-full flex items-end justify-center pb-8">
                        <h1 className="text-white text-6xl font-bold">Contact Us</h1>
                    </div>
                </div>
                <Image
                    src="/contact.png"
                    alt="Contact Banner"
                    className="w-full h-full position-center"
                    loading="lazy"
                    fill
                    sizes="100vw"
                    quality={80}
                />
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col  md:flex-row gap-8">
                    <div className="md:basis-1/2 space-y-8  lg:pl-8 lg:mr-24">
                        <div className="group bg-gray-100 p-6 shadow-lg rounded-md transform transition-all duration-300 hover:scale-105 hover:translate-y-2 flex items-start gap-4">
                            <span className="text-orange-700 bg-orange-200 mr-4 w-14 h-12 sm:w-14 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-orange-700 group-hover:text-white">
                                <Icon icon="mdi:map-marker" className="w-[28px] h-[26px]" />
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">VISIT US</h3>
                                <p className="text-gray-600">{settings?.address}</p>
                            </div>
                        </div>

                        <div className="group bg-gray-100 p-6 shadow-lg rounded-md transform transition-all duration-300 hover:scale-105 hover:translate-y-2 flex items-start gap-4">
                            <span className="text-orange-700 bg-orange-200 mr-4 w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-orange-700 group-hover:text-white">
                                <Icon icon="ic:baseline-phone" className="w-[26px] h-[26px]" />
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">PHONE</h3>
                                <p className="text-gray-600">{settings?.phoneNumber}</p>
                            </div>
                        </div>

                        <div className="group bg-gray-100 p-6 shadow-lg rounded-md transform transition-all duration-300 hover:scale-105 hover:translate-y-2 flex items-start gap-4">
                            <span className="text-orange-700 bg-orange-200 mr-4 w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-orange-700 group-hover:text-white">
                                <Icon icon="mdi:email-outline" className="w-[25px] h-[25px]" />
                            </span>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">WORK WITH US</h3>
                                <p className="text-gray-600">{settings?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:basis-2/3 p-8 rounded-2xl bg-[#0284c7]">
                        <h2 className="text-3xl text-white font-semibold">
                            Need any help? We're here for you!
                        </h2>
                        <p className="text-sm text-gray-200 mb-2 border-b pb-6 border-gray-300 opacity-90">
                            Please feel free to make a call with your queries or fill out the
                            contact form and we’ll get back to you as soon as possible!!
                        </p>
                        <form onSubmit={formik.handleSubmit} className="space-y-6 pt-6">
                            <div>
                                <label htmlFor="name" className="block mb-0 text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter Your Name"
                                    className={`w-full p-3 placeholder-gray-100 bg-transparent text-white border border-gray-300 rounded focus:outline-none focus:border-black ${formik.touched.name && formik.errors.name
                                            ? "border-black"
                                            : ""
                                        }`}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-700 text-sm mt-1">
                                        {formik.errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-0 text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Your Email"
                                    className={`w-full p-3 placeholder-gray-100 bg-transparent text-white border border-gray-300 rounded focus:outline-none focus:border-black ${formik.touched.email && formik.errors.email
                                            ? "border-black"
                                            : ""
                                        }`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-700 text-sm mt-1">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="block mb-0 text-white">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Phone Number (10 digits)"
                                    maxLength={10}
                                    className={`w-full p-3 placeholder-gray-100 bg-transparent text-white border border-gray-300 rounded focus:outline-none focus:border-black ${formik.touched.phoneNumber && formik.errors.phoneNumber
                                            ? "border-black"
                                            : ""
                                        }`}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <p className="text-red-700 text-sm mt-1">
                                        {formik.errors.phoneNumber}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block mb-0 text-white">

                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formik.values.message}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Your Message"
                                    rows="4"
                                    className={`w-full p-3 placeholder-gray-100 bg-transparent text-white border border-gray-300 rounded focus:outline-none focus:border-black ${formik.touched.message && formik.errors.message
                                            ? "border-black"
                                            : ""
                                        }`}
                                />
                                {formik.touched.message && formik.errors.message && (
                                    <p className="text-red-700 text-sm mt-1">
                                        {formik.errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className={`bg-gray-300 text-black border-orange px-12 font-semibold py-3 rounded hover:bg-orange-700 hover:text-white transition-colors duration-300 ${formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                {formik.isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 mb-8 h-[400px] w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2844837169474!2d76.77928847607055!3d30.705563074593386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed9aa18f9d4f%3A0x880b2f2f4e3c4e4b!2sIndustrial%20Area%20Phase%201%2C%20Chandigarh!5e0!3m2!1sen!2sin!4v1709365548761!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
}
