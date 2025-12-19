'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import AboutUs2 from '../../components/AboutUs2';

export default function AboutUs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        if (isModalOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isModalOpen]);

    return (
        <div className="relative">
            <div className="relative h-[calc(100vw*1/3)] w-full">
                <div className="absolute inset-0 z-10 bg-black/40"
                >
                    <div className="h-full flex items-end justify-center pb-8">
                        <h1 className="text-white text-6xl font-bold capitalize">About Us</h1>
                    </div>
                </div>
                <Image
                    src="/images/about-banner.webp"
                    alt="Prayer flags in mountains"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fill
                    sizes="100vw"
                    quality={80}
                />
            </div>
            

            <div className="container mx-auto px-4 py-16">
                <p className="text-center text-lg mb-16">
                    At Hike, we are not just a team—we are a family that uplifts, supports, and inspires one another. Whether you are a climber, an explorer, or someone passionate about nature and adventure, we welcome you to join us in redefining the future of mountaineering.
                </p>
<AboutUs2 />
                {/* <div className="grid md:grid-cols-2 gap-4 mb-16">
                    <div>
                        <Image
                            src="/images/about-founder.webp"
                            alt="Founder"
                            className="object-cover "
                            loading="lazy"
                            width={500}
                            height={380}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />

                    </div>
                    <div>
                        <div className="space-y-3">
                            <p className="text-gray-900 text-lg">
                                A remarkable mountaineer from Solan, Himachal Pradesh, has etched her name in history with extraordinary feats in high-altitude climbing. She is the first and only Indian to summit five 8,000-meter peaks in just 30 days in 2022, summit Mount Annapurna I, Mount Kanchenjunga, Mount Everest, Mount Lhotse, and Mount Makalu—a testament to her endurance, skill, and determination.
                            </p>
                            <p className="text-gray-900 text-lg">
                                In addition to these achievements, she has also summited Mount Manaslu without supplemental oxygen and Mount Dhaulagiri, further showcasing her strength and resilience.
                            </p>
                            <p className="text-gray-900 text-lg">
                                One of the most defining moments of her journey came on Mount Annapurna, where she survived against all odds in the death zone after getting lost without oxygen. Her incredible willpower and survival instincts helped her endure extreme conditions, solidifying her reputation as one of India's toughest and most inspiring mountaineers.
                            </p>
                            <p className="text-gray-900 text-lg">
                                She continues to push boundaries, inspiring a new generation of climbers with her fearless spirit and unwavering determination.
                            </p>
                            <h3 className="text-xl font-bold text-orange-700"></h3>
                            <p className='text-lg'>Founder & Director</p>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-orange-700 mb-8">FOUNDER'S MESSAGE:</h2>
                    <div className="space-y-4">
                        <p className="text-gray-800">
                            The moment you choose to chase your dreams & challenges will inevitably arise—there's no escaping them. But these very obstacles are what test your courage, resilience, and determination. True greatness is not achieved by avoiding difficulties but by embracing them with unwavering zeal and an unshakable spirit. If you face every hardship with fearless resolve and an indomitable will, nothing in this world can hold you back.
                        </p>
                        <p className="text-gray-800">
                            However, success is never a solo journey. Behind every great athlete stands a mentor, a guide, and a team that nurtures potential and turns it into excellence. I firmly believe that when aspiring athletes receive the right guidance, coaching, and support, their capabilities multiply, and they achieve results beyond imagination.
                        </p>
                        <p className="text-gray-800">
                            At Hike, we are not just about reaching summits—we are about building a community that uplifts, inspires, and empowers. Whether in the mountains or in life, the journey to the top is always easier when we support each other. Let's create an ecosystem where dreams are not just encouraged but actively nurtured.
                        </p>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-orange-700 mb-8">TEAM Hike</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex gap-8 max-w-full">
                            <Image
                                src="/images/about-team1.webp"
                                alt="Team1"
                                className="rounded-lg object-cover w-full h-auto"
                                width={700}
                                height={560}
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 700px"
                            />
                            <div>
                                <p className="text-gray-800 mb-2 mt-2">
                                    Team member is the driving force behind Hike's management, taking a hands-on approach to ensure each adventure is seamless and smooth. She oversees every detail with precision and care. Priyanka fosters a culture of collaboration and open communication, keeping the entire team aligned with Hike's events to provide unforgettable, sustainable adventures.
                                </p>
                                <h3 className="text-xl font-bold text-orange-700">Miss. Priyanka Berman</h3>
                                <p className="font-semibold">Management</p>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 mt-2 inline-block"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-8 max-w-full">
                            <Image
                                src="/images/about-team2.webp"
                                alt="Team2"
                                className="rounded-lg object-cover w-full h-auto"
                                width={700}
                                height={560}
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 700px"
                            />
                            <div>
                                <p className="text-gray-800 mb-2 mt-2">
                                    Team member epitomises resilience, leadership, and innovation. A master of technical logistics and crisis management, he bridges mountaineering excellence with environmental guardianship. A pioneer and catalyst, he fuels sustainable exploration. For Abhishek, every climb is a pledge to protect Earth's majesty while empowering others to rise.
                                </p>
                                <h3 className="text-xl font-bold text-orange-700">Mr. Abhishek Sachan</h3>
                                <p className="font-semibold">Operation</p>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 mt-2 inline-block"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="mb-16 border-t border-gray-200 pt-8">
                    <h2 className="text-3xl font-bold text-orange-700 mb-8">Our Backbone:</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">1. Technical Guides & High-Altitude Experts</h3>
                            <p className="text-gray-800">
                                Our team includes some of the best high-altitude guides and technical climbers who have successfully led expeditions across the Himalayas and beyond. They are trained in mountain rescue, navigation, and survival skills, ensuring that every climber receives world-class guidance.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">2. Environmental & Sustainability Experts</h3>
                            <p className="text-gray-800">
                                We are committed to climbing responsibly and protecting the mountains we love. Our sustainability team focuses on:
                            </p>
                            <ul className="list-disc ml-6 mt-2 text-gray-800">
                                <li>Implementing eco-friendly climbing practices</li>
                                <li>Conducting clean-up drives on major peaks</li>
                                <li>Educating climbers on preserving fragile mountain ecosystems</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">3. Adventure Trainers & Coaches</h3>
                            <p className="text-gray-800">
                                We believe that the right training leads to greater success. Our experienced coaches design specialised programs for:
                            </p>
                            <ul className="list-disc ml-6 mt-2 text-gray-800">
                                <li>Beginner to advanced mountaineers</li>
                                <li>Athletes preparing for extreme sports challenges</li>
                                <li>Corporate teams seeking leadership training in extreme conditions</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">4. Logistics & Support Team</h3>
                            <p className="text-gray-800">
                                Behind every successful expedition is a strong team managing logistics, permits, and safety measures. Our dedicated staff ensures smooth operations so climbers can focus on their journey to the summit.
                            </p>
                        </div>
                    </div>
                </div>

                {/*  <div className="mt-16">
                    <h2 className="text-3xl font-bold text-orange-700 mb-8">COMPANY'S DOCS</h2>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="border-2 border-orange-400 rounded-lg p-4">
                            <Image
                                src="/images/about-doc1.webp"
                                alt="Company Document 1"
                                width={250}
                                height={400}
                                className="rounded-lg object-cover cursor-pointer"
                                onClick={() => openModal('/images/about-doc1.webp')}
                                loading="lazy"
                            />
                        </div>
                        <div className="border-2 border-orange-400 rounded-lg p-4">
                            <Image
                                src="/images/about-doc2.webp"
                                alt="Company Document 2"
                                width={250}
                                height={400}
                                className="rounded-lg object-cover cursor-pointer"
                                onClick={() => openModal('/images/about-doc2.webp')}
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={closeModal}
                    >
                        <div className="relative max-w-4xl w-full p-4">
                            <button
                                className="absolute top-2 right-2 text-white text-2xl font-bold"
                                onClick={closeModal}
                            >
                                <Icon icon="stash:times-circle" width="24" height="24" />
                            </button>
                            <Image
                                src={selectedImage}
                                alt="Zoomed Document"
                                width={400}
                                height={380}
                                className="rounded-lg"
                                loading="lazy"
                            />
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}