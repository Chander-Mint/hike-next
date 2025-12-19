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

export default function BlogsFour({ blogs }) {

  return (
    <div className="relative w-full max-w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="container mx-auto px-6 max-w-7xl mx-auto">
        <div className="relative text-center py-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-full h-24 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              ></path>
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-cyan-500 text-2xl font-semibold mb-4 font-new">
               Read Our Latest Blogs
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Our Blogs
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {blogs?.map((blog, idx) => (
            <Link
              key={idx}
              href={`/blog/${blog.slug}`}
              className="group text-gray-800 transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="relative w-full h-64">
                  <Image
                    src={blog.img}
                    alt={blog.title}
                    className="object-cover w-[200px]"
                    fill
                   
                    sizes="(max-width: 768px) 100vw,"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
                    {blog.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="text-orange-500" >Published on: {formatDate(blog.createdAt)}</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {blog.shortDescription}
                  </p>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
