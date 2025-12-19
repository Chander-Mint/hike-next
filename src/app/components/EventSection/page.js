'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import parse from 'html-react-parser';
import TabContent from '@/src/app/components/TabSection/page';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showToast } from '@/src/utils/toast';

export default function EventSection({ event = {} }) {

    const [activeTab, setActiveTab] = useState('index');
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [selectedGuidelineIndex, setSelectedGuidelineIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        message: '',
    });
    const [isRegistering, setIsRegistering] = useState(false);

    const tabs = [
        { name: 'index', label: 'INDEX', key: 'guideLines' },
        { name: 'itinerary', label: 'ITINERARY', key: 'itinerary' },
        { name: 'inclusion-exclusion', label: 'INCLUSION & EXCLUSION', keys: ['inclusions', 'exclusions'] },
        { name: 'policy', label: 'POLICY', key: 'policy' },
        { name: 'ticket-price', label: 'TICKET & PRICE', key: 'tickets' },
        { name: 'download-docs', label: 'DOWNLOAD DOCS', key: 'documents' },
        { name: 'faq', label: 'FAQ', key: 'FAQs' },
        { name: 'comments', label: 'COMMENTS' },
    ];

    const isValidTabData = (value) => {
        if (!value) return false;

        if (Array.isArray(value)) {
            return value.some(item => {
                if (typeof item === 'string') return item.trim().length > 0;
                if (typeof item === 'object') {
                    return Object.entries(item).some(([key, val]) => {
                        if (key === '_id') return false;
                        if (typeof val === 'string') return val.trim().length > 0;
                        return Boolean(val);
                    });
                }
                return Boolean(item);
            });
        }

        if (typeof value === 'string') return value.trim().length > 0;

        if (typeof value === 'object') {
            return Object.entries(value).some(([key, val]) => {
                if (key === '_id') return false;
                if (typeof val === 'string') return val.trim().length > 0;
                return Boolean(val);
            });
        }

        return Boolean(value);
    };



    const availableTabs = tabs.filter((tab) => {
        if (tab.name === 'comments') return true;

        if (tab.keys && Array.isArray(tab.keys)) {
            const isValid = tab.keys.some((key) => {
                const val = event[key];
                const valid = isValidTabData(val);
                return valid;
            });
            return isValid;
        }

        if (tab.key) {
            const val = event[tab.key];
            const valid = isValidTabData(val);
            return valid;
        }

        return false;
    });



    useEffect(() => {
        const firstTab = availableTabs.length > 0 ? availableTabs[0].name : 'index';
        if (activeTab === 'index' && firstTab !== 'index') {
            setActiveTab(firstTab);
        }
    }, [availableTabs]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.contactNumber || !formData.message) {
            showToast('Please fill in all fields.', 'warning');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            showToast('Please enter a valid email address.', 'warning');
            return;
        }

        try {
            const response = await fetch('/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.contactNumber,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                showToast('Form submitted successfully!', 'success');
                setFormData({
                    name: '',
                    email: '',
                    contactNumber: '',
                    message: '',
                });
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showToast('Something went wrong. Please try again.', 'error');
        }
    };

    const handleRegisterClick = () => {
        setIsRegistering(true);
        setTimeout(() => {
            window.location.href = `/register/${event.slug}`;
        }, 1000);
    };

    const getEmbedUrl = (url) => {
        if (!url) return null;
        if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    const embedUrl = getEmbedUrl(event.video);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div
                className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[63vh] bg-cover bg-center flex items-end justify-center pb-4 sm:pb-6 lg:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${event.img}')`,
                }}
            >
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-[52px] font-bold text-white capitalize tracking-wider text-center px-4">
                    {event.title}
                </h1>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-11 py-8 sm:py-10 lg:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">

                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/region.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Region</h3>
                            {event.location && (
                                <p className="text-xs sm:text-sm">{event.location}</p>
                            )}

                        </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/timee.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Duration</h3>
                            {event.duration && (

                                <p className="text-xs sm:text-sm">{event.duration}</p>
                            )}

                        </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/clock.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Best Time</h3>
                            {event.bestTime && (

                                <p className="text-xs sm:text-sm">{event.bestTime}</p>
                            )}

                        </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/eject.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Max Elevation</h3>
                            {event.maxElevation && (

                                <p className="text-xs sm:text-sm">{event.maxElevation} M</p>
                            )}

                        </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/activity.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Activities</h3>
                            {event.activities && Array.isArray(event.activities) && event.activities.length > 0 && (

                                <p className="text-xs sm:text-sm">{event.activities.join(', ')}</p>
                            )}

                        </div>
                    </div>

                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/route.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Route</h3>
                            {event.route && (
                                <p className="text-xs sm:text-sm">{event.route}</p>
                            )}

                        </div>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/graph.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Level</h3>
                            {event.difficulty && (
                                <p className="text-xs sm:text-sm">{event.difficulty}</p>
                            )}

                        </div>
                    </div>
                    {/* {event.tickets && Array.isArray(event.tickets) && event.tickets.length > 0 && event.tickets[0].price && ( */}

                    <div className="flex items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                        <img src="/price.png" alt="region-img" className='w-[60px] h-[60px]'></img>
                        <div className='ml-3'>
                            <h3 className="font-bold text-gray-700 text-sm sm:text-base">Fee</h3>
                            {event?.basePrice && event.basePrice !== 0 && (
                                <p className="text-xs sm:text-sm">{event?.basePrice}</p>
                            )}

                        </div>
                    </div>

                    {/* )} */}
                </div>

                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className="bg-white py-4 sm:py-6 lg:py-8 md:w-full lg:w-[70%]">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Program Overview</h2>
                        <div className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {event.description && typeof event.description === 'string'
                                ? parse(event.description)
                                : <p>No description available.</p>}
                        </div>
                    </div>

                    <div className="md:w-full lg:w-[30%] flex flex-col gap-4 sm:gap-6">
                        {/* <button
                            onClick={handleRegisterClick}
                            disabled={isRegistering}
                            className={`w-full px-4 sm:px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors text-base sm:text-lg ${isRegistering ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isRegistering ? 'Registering...' : 'REGISTER EVENT NOW'}
                        </button> */}

                        {embedUrl && (
                            <div className="bg-white p-4 sm:p-6 rounded-lg">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Event Video</h3>
                                <div className="relative w-full pb-[56.25%] mb-3 sm:mb-4">
                                    <iframe
                                        src={embedUrl}
                                        title="Event Video"
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        allowFullScreen
                                    />
                                </div>
                                <a
                                    href={event.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline break-all text-sm sm:text-base"
                                >
                                    {event.video}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {availableTabs.length > 0 && (
                    <div className="mb-6 sm:mb-8 bg-orange-500">
                        <div className="flex flex-wrap sm:flex-nowrap border-b border-gray-200 px-4 sm:px-0 overflow-x-auto">
                            {availableTabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    className={`px-3 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase text-white whitespace-nowrap ${activeTab === tab.name
                                        ? 'bg-[#333] text-white'
                                        : 'text-gray-800 hover:bg-gray-800'
                                        }`}
                                    onClick={() => setActiveTab(tab.name)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <TabContent
                    activeTab={activeTab}
                    event={event}
                    comments={event.comments || []}
                    selectedDayIndex={selectedDayIndex}
                    setSelectedDayIndex={setSelectedDayIndex}
                    selectedGuidelineIndex={selectedGuidelineIndex}
                    setSelectedGuidelineIndex={setSelectedGuidelineIndex}
                />
                <hr className="border-t border-gray-400 border-dotted my-4 sm:my-8 mt-4" />
                <div className="bg-gray-100 rounded-lg px-0 sm:px-0 lg:px-6 lg:py-6 mb-8 sm:mb-12">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                        {/* <Icon icon="mdi:email" className="mr-2 text-2xl sm:text-3xl" /> */}
                        CONTACT INFO
                    </h2>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            contactNumber: '',
                            message: '',
                        }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Name is required'),
                            email: Yup.string().email('Invalid email address').required('Email is required'),
                            contactNumber: Yup.string()
                                .matches(/^[0-9]+$/, 'Only numbers are allowed')
                                .min(7, 'Too short')
                                .max(15, 'Too long')
                                .required('Contact number is required'),
                            message: Yup.string().required('Message is required'),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <Field
                                            name="name"
                                            placeholder="Your Name"
                                            className="w-full p-3 bg-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <Field
                                            name="email"
                                            type="email"
                                            placeholder="Your Email"
                                            className="w-full p-3 bg-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <Field
                                            name="contactNumber"
                                            placeholder="Contact Number"
                                            className="w-full p-3 bg-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
                                        />
                                        <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <Field
                                        name="message"
                                        as="textarea"
                                        placeholder="Your Message"
                                        rows="5"
                                        className="w-full p-3 bg-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base"
                                    />
                                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-4 sm:px-8 py-3 bg-orange-700 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base"
                                >
                                    {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

            </div>
        </div>
    );
}
