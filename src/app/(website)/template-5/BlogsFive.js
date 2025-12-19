"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export default function BlogsFive({ blogs }) {
  return (
    <motion.div
      className="relative w-full blog-section max-w-full mx-auto px-4 sm:px-6 py-8 sm:py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          className="relative text-center py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
            <h3 className="text-cyan-500 text-2xl font-semibold mb-4">
              Explore Our Latest Articles
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 font-new">
              Articles & Stories
            </h1>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {blogs?.map((blog, idx) => (
            <motion.div key={idx} className="relative group">
              <Link href={`/blog/${blog.slug}`}>
                <div className="relative grid sm:grid-cols-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-500 h-[300px] sm:h-[240px]">
                  {/* Sparkles on hover */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                    <div className="group-hover:animate-sparkle1 absolute w-2 h-2 bg-yellow-400 rounded-full left-6 top-6" />
                    <div className="group-hover:animate-sparkle2 absolute w-2 h-2 bg-pink-400 rounded-full left-12 top-12" />
                    <div className="group-hover:animate-sparkle3 absolute w-2 h-2 bg-blue-400 rounded-full left-20 top-8" />
                    <div className="group-hover:animate-sparkle4 absolute w-1.5 h-1.5 bg-purple-400 rounded-full left-8 top-16" />
                    <div className="group-hover:animate-sparkle5 absolute w-2 h-2 bg-green-400 rounded-full left-16 top-6" />
                    <div className="group-hover:animate-sparkle6 absolute w-2 h-2 bg-orange-400 rounded-full left-[70%] top-[40%]" />
                  </div>

                  {/* Left Side (Image by default → Text on hover) */}
                  <div className="relative overflow-hidden">
                    {/* Image (shown by default) */}
                    <div className="absolute inset-0 transition-all duration-500 ease-in-out opacity-100 group-hover:opacity-0 translate-x-0 group-hover:-translate-x-6 z-10">
                      <Image
                        src={blog.img}
                        alt={blog.title}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw"
                      />
                    </div>

                    {/* Text (hidden by default → appears on hover) */}
                    <div className="absolute inset-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 translate-x-6 group-hover:translate-x-0 p-4 z-20">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="text-orange-500">
                          Published on: {formatDate(blog.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {blog.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Right Side (Text by default → Image on hover) */}
                  <div className="relative overflow-hidden">
                    {/* Text (shown by default) */}
                    <div className="absolute inset-0 transition-all duration-500 ease-in-out opacity-100 group-hover:opacity-0 translate-x-0 group-hover:translate-x-6 p-4 z-10">
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="text-orange-500">
                          Published on: {formatDate(blog.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {blog.shortDescription}
                      </p>
                    </div>

                    {/* Image (hidden by default) */}
                    <div className="absolute inset-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 z-20">
                      <Image
                        src={blog.img}
                        alt={blog.title}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
