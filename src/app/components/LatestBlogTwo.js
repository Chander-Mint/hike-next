import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function LatestBlogTwo({ blogs }) {

  return (
    <div
      className="relative w-full max-w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-b"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/blog-bg.webp')`,
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white text-center">
            Our Blogs
          </h2>{" "}
          <a
            href="/blog"
            className="text-white flex items-center hover:underline text-md sm:text-base"
          >
            View All Posts
            <Icon
              icon="mdi:chevron-right"
              className="ml-1 w-5 h-5 sm:w-6 sm:h-6"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-12">
          {blogs?.slice(0, 3).map((blog, idx) => (
            <Link
              key={idx}
              href={`/blog/${blog.slug}`}
              className="group bg-white text-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={blog.img}
                alt={blog.title}
                className="h-[240px] w-full object-cover"
                width={200}
                height={200}
              />
              <div className="p-3 sm:p-4 bg-white">
                <div className="flex items-center justify-between text-sm sm:text-base pb-2 pt-1 border-b text-gray-700">
                  <div className="flex items-center space-x-1">
                    <span className="mr-2 text-orange-700">Published on:</span>
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 pt-3 text-gray-800 transition-colors duration-300 group-hover:text-orange-700">
                  {blog.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">
                  {blog.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}