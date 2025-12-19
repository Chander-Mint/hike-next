import Image from 'next/image';
import { Icon } from '@iconify/react';
import parse from 'html-react-parser';

const formatDate = (dateString) => {
    const date = new Date(dateString || new Date());
    return date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function BlogDetails({ bannerImage = '/fallback-banner.jpg', heading = 'Blog Post', blog = {} }) {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div
                className="relative w-full h-[40vh] sm:h-[50vh] md:h-[63vh] bg-cover bg-center flex items-end justify-center pb-4 sm:pb-6 md:pb-8"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bannerImage}')`,
                }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[69px] font-bold text-orange-700 uppercase tracking-wider text-center px-2 sm:px-4">
                    {heading}
                </h1>
            </div>

            <div className="w-full py-6 sm:py-8 md:py-10 flex flex-col items-center px-4">
                <Image
                    src={blog?.img || 'default.jpg'}
                    alt={blog?.title || 'Blog Image'}
                    height={150}
                    width={1400}
                    className="object-cover"
                />
                <div className="mt-4 flex items-center text-gray-700">
                    <Icon icon="mdi:calendar" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700 me-2" />
                    <span className="text-sm sm:text-base">{formatDate(blog?.createdAt)}</span>
                    <Icon icon="mdi:comment" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700 ms-5 me-2" />
                    <span className="text-sm sm:text-base">0 comments</span>
                </div>

                <div className="w-full sm:w-[90%] md:w-[85%] mt-6 sm:mt-8">
                    <div className="text-base sm:text-lg md:text-lg">
                        {parse(blog?.content || '')}
                    </div>
                </div>
            </div>
        </div>
    );
}