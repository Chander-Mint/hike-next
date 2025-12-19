import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function LatestBlogs({ blogs }) {
  return (
    <div
      className="relative w-full max-w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 bg-gradient-to-b"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/blog-bg.webp')`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-700">LATEST BLOG</h2>
          <a
            href="/blog"
            className="text-orange-700 font-semibold flex items-center hover:underline text-sm sm:text-base"
          >
            View All Posts
            <Icon icon="mdi:chevron-right" className="ml-1 w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {blogs?.slice(0, 3).map((blog, idx) => (
            <Link
              key={idx}
              href={`/blog/${blog.slug}`}
              className="bg-white text-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={blog.img}
                alt={blog.title}
                className="h-[280px] w-full object-cover"
                width={200}
                height={200}
              />
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">{blog.shortDescription}</p>
              </div>
              <div className="flex items-center justify-between text-sm sm:text-base border-t p-3 sm:p-4 text-gray-700">
                <div className="flex items-center space-x-1">
                  <Icon icon="mdi:calendar" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                {/* <div className="flex items-center space-x-1">
                  <Icon icon="mdi:comment" className="w-4 h-4 sm:w-5 sm:h-5 text-orange-700" />
                  <span>{`${blog.commentData.length} comment${blog.commentData.length !== 1 ? 's' : ''}`}</span>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}