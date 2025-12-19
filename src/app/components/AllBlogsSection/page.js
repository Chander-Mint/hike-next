import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function AllBlogsSection({ blogs, bannerImage, heading }) {
    return (
        <div className="min-h-screen">
            <div
                className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cover bg-center flex items-end justify-center pb-4 sm:pb-6 md:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`,
                }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white capitalize tracking-wider text-center px-2 sm:px-4">
                    {heading}
                </h1>
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {blogs?.map((blog, idx) => (
                        <Link
                            key={idx}
                            href={`/blog/${blog?.slug}`}
                            className="bg-white text-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                        >
                            <Image
                                src={blog.img}
                                alt={blog?.title}
                                className="h-[200px] sm:h-[240px] md:h-[280px] w-full object-cover"
                                width={200}
                                height={200}
                            />
                            <div className="p-2 sm:p-3 md:p-4">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2">{blog?.title}</h3>
                                <p className="text-gray-600 line-clamp-3 text-xs sm:text-sm md:text-base">{blog?.shortDescription}</p>
                            </div>
                            <div className="flex items-center justify-between text-xs sm:text-sm md:text-base border-t p-2 sm:p-3 md:p-4 text-gray-700">
                                <div className="flex items-center space-x-1">
                                    <Icon icon="mdi:calendar" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-700" />
                                    <span>{formatDate(blog?.createdAt)}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Icon icon="mdi:comment" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-700" />
                                    <span>0 comments</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}