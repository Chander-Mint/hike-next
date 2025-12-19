'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../(website)/context/CartContext';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { apiRequest } from '../../admin/utils/api';
import { useRouter } from 'next/navigation';
import { showToast } from '@/src/utils/toast';

export default function Checkout() {

    const { cartItems, clearCart } = useCart();
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(null);
    const [sessionExpired, setSessionExpired] = useState(false);

    const subtotal = cartItems.reduce((total, item) => total + (item?.price * (item?.quantity || 1)), 0);
    const gst = subtotal * 0.05;
    const total = subtotal + gst;


    useEffect(() => {
        const sessionDataRaw = localStorage.getItem('checkoutSession');
        if (!sessionDataRaw) {
            showToast('Session not found. Redirecting to cart.', 'warning');
            return router.push('/cart');
        }

        const sessionData = JSON.parse(sessionDataRaw);
        const expiresAt = sessionData?.expiresAt;

        const updateTimer = () => {
            const now = Date.now();
            const remaining = expiresAt - now;

            if (remaining <= 0 && !sessionExpired) {
                localStorage.removeItem('checkoutSession');
                setSessionExpired(true);
                showToast('Checkout session expired. Redirecting to cart.', 'warning');
                return router.push('/cart');
            }

            if (!sessionExpired) {
                setTimeLeft(Math.floor(remaining / 1000));
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [router, sessionExpired]);


    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            country: 'India',
            phoneNumber: '',
            paymentMethod: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            address: Yup.string().required('Address is required'),
            country: Yup.string().required('Country is required'),
            phoneNumber: Yup.string().required('Phone number is required')
                .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
            paymentMethod: Yup.string().required('Payment method is required'),
        }),
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const formData = {
                    email: values.email,
                    name: values.firstName + ' ' + values.lastName,
                    paymentMethod: values.paymentMethod,
                    shippingAddress: {
                        address: values.address,
                        country: values.country,
                        phoneNumber: values.phoneNumber,
                        // city: "Delhi",
                        // state: "Delhi",

                    },
                    items: cartItems.map(item => ({
                        ticketId: item?.ticketId,
                        price: item?.price,
                        quantity: item?.quantity || 1,
                        event: item?.eventSlug
                    }))
                }
                const res = await fetch('/api/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })

                if (res.status === 201 || res.status === 200) {
                    showToast('Checkout successful!', 'success');
                    resetForm();
                    localStorage.removeItem('hike');
                    clearCart();
                    localStorage.removeItem('checkoutSession');
                    router.push('/');
                }
            } catch (error) {
                showToast('Checkout failed: ' + error.message, 'error');
            } finally {
                setSubmitting(false);
            }
        }
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    }

    return (
        <>
            <div
                className="relative w-full h-[40vh] sm:h-[50vh] md:h-[63vh] bg-cover bg-center flex items-end justify-center pb-6 sm:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/common-banner.webp')`,
                }}
            >
                <h1 className="text-4xl sm:text-5xl md:text-[69px] font-bold text-orange-700 uppercase tracking-wider text-center px-4">
                    CHECKOUT
                </h1>
            </div>
            {timeLeft !== null && (
                <div className="bg-red-100 text-red-800 text-center p-3 rounded mb-4 font-semibold">
                    Session expires in : {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                </div>
            )}

            <form onSubmit={formik.handleSubmit} className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-2/3 space-y-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email address"
                                className="w-full px-4 py-2 border rounded mb-1"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}

                            <label className="flex items-center gap-2 mt-2">
                                <input type="checkbox" className="rounded" />
                                <span className="text-sm text-gray-600">
                                    I would like to receive exclusive emails with discounts
                                </span>
                            </label>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 space-y-4">
                            <h2 className="text-xl font-bold mb-4">Billing Address</h2>
                            <input
                                name="country"
                                readOnly
                                value="India"
                                className="w-full px-4 py-2 border rounded bg-gray-50"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        name="firstName"
                                        placeholder="First name"
                                        className="px-4 py-2 border rounded w-full"
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName && (
                                        <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        name="lastName"
                                        placeholder="Last name"
                                        className="px-4 py-2 border rounded w-full"
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && (
                                        <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="Contact number"
                                    className="w-full px-4 py-2 border rounded"
                                    {...formik.getFieldProps('phoneNumber')}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    name="address"
                                    placeholder="Address"
                                    className="w-full px-4 py-2 border rounded"
                                    {...formik.getFieldProps('address')}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <p className="text-red-500 text-sm">{formik.errors.address}</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold mb-4">Payment Options</h2>
                            <div className="border rounded p-4 space-y-2">
                                <label className="text-gray-600">UPI Address</label>
                                <input
                                    name="paymentMethod"
                                    placeholder="e.g. username@upi"
                                    className="w-full px-4 py-2 border rounded"
                                    {...formik.getFieldProps('paymentMethod')}
                                />
                                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                                    <p className="text-red-500 text-sm">{formik.errors.paymentMethod}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow p-6 sticky top-40 space-y-4">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-5">
                                    <span className="font-bold border-2 rounded-full py-1 px-3">{index + 1}</span>
                                    <div>
                                        <h3 className="font-semibold">{item.eventName}</h3>
                                        <p>{formatDate(item.startDate)} - {formatDate(item.endDate)}</p>
                                    </div>
                                    <span className="font-bold">₹{item.price * (item.quantity || 1)}</span>
                                </div>
                            ))}
                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                                <div className="flex justify-between"><span>GST 5%</span><span>₹{gst}</span></div>
                                <div className="flex justify-between font-bold text-xl"><span>Total</span><span>₹{total}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <Link href="/cart" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Return to Cart
                    </Link>
                    <button
                        type="submit"
                        disabled={formik.isSubmitting || cartItems.length === 0}
                        className={`bg-orange-400 text-black px-8 py-3 rounded font-bold hover:bg-orange-600 ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {formik.isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </form>
        </>
    );
}
