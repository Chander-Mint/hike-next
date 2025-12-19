'use client';
import { useState } from 'react';
import { useCart } from '@/src/app/(website)/context/CartContext';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Cart() {
    const router = useRouter();
    const [coupon, setCoupon] = useState('');
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const [showCouponInput, setShowCouponInput] = useState(false);
    const subtotal = cartItems.reduce((total, item) => total + (item?.price * (item?.quantity || 1)), 0);
    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    const handleCheckout = () => {
        if (cartItems.length === 0) return;
        const session = Math.random().toString(36).slice(2);
        const now = Date.now();
        const expiresAt = now + 10 * 60 * 1000;
        const sessionData = {
            session,
            expiresAt
        };
        localStorage.setItem('checkoutSession', JSON.stringify(sessionData));
        router.push(`/checkout?session=${session}`);
    };


    function formatDate(dateString) {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        return formatter.format(date);
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
                    CART
                </h1>
            </div>
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">

                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {cartItems?.length > 0 ? (
                                <>
                                    <h2 className="text-xl font-bold mb-6">Details</h2>
                                    {cartItems?.map((item) => (
                                        <div key={`${item?.ticketId}-${item?.startDate}`} className="flex justify-between items-center py-2 border-b">
                                            <div>
                                                <h3 className="text-lg font-semibold">{item?.eventName}</h3>
                                                <p className='text-gray-600 '>{formatDate(item?.startDate)} - {formatDate(item?.endDate)}</p>
                                                <p className="text-gray-600">₹{item?.price?.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-[120px] flex items-center justify-between border rounded overflow-hidden">
                                                    <button
                                                        className="w-8 h-8 text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                                                        onClick={() =>
                                                            updateQuantity(item?.id, Math.max((item?.quantity || 1) - 1, 1), item.startDate)
                                                        }
                                                    >
                                                        –
                                                    </button>
                                                    <span className="text-center w-10">{item?.quantity || 1}</span>
                                                    <button
                                                        className="w-8 h-8 text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                                                        onClick={() =>
                                                            updateQuantity(item?.id, (item?.quantity || 1) + 1, item?.startDate)
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => removeFromCart(item?.id, item?.startDate)}
                                                >
                                                    <Icon icon="mdi:delete" fontSize={20} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p className='text-gray-600'> Your cart is Empty </p>
                            )}

                            {cartItems.length !== 0 && (
                                <div className="flex justify-between items-center pt-4">
                                    <span className="font-bold">TOTAL</span>
                                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-bold mb-6">Cart Total</h2>
                            <div className="space-y-4">
                                <button
                                    onClick={() => setShowCouponInput(!showCouponInput)}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {showCouponInput ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        )}
                                    </svg>
                                    Add a coupon
                                </button>

                                {showCouponInput && (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={coupon}
                                            onChange={(e) => setCoupon(e.target.value)}
                                            placeholder="Enter coupon code"
                                            className="flex-1 px-4 py-2 border rounded"
                                        />
                                        <button className="bg-orange-400 text-black px-4 py-2 rounded">
                                            Apply
                                        </button>
                                    </div>
                                )}

                                <div className="flex justify-between py-2 border-b">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span>GST 5%</span>
                                    <span>₹{gst.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 font-bold">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>

                                <button className="w-full bg-orange-400 text-black py-3 rounded font-bold hover:bg-orange-600 transition-colors" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}