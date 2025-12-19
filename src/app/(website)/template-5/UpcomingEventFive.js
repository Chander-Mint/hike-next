"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function UpcomingEventFive({ upcomingEvents }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else if (width < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + visibleCards) % events.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [visibleCards, upcomingEvents]);

  const events = Array.isArray(upcomingEvents)
    ? upcomingEvents.map((event) => ({
        title: event?.title,
        image: event?.img,
        slug: event?.slug,
      }))
    : [];

  const next = () => {
    setCurrentIndex((prev) => (prev + visibleCards) % events.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - visibleCards + events.length) % events.length
    );
  };

  const handleViewAllEvents = (e) => {
    e.preventDefault();
    router.push("/event");
  };

  if (events.length === 0) {
    return <div className="relative w-full max-w-6xl mx-auto"></div>;
  }

  return (
    <motion.div
      className="relative py-5 bg-[#eef3f7]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
     
      <div className="" />

      <div className="relative z-10 container mx-auto px-0 md:px-6 py-8 sm:py-0">
        {/* Section Heading */}
        <motion.div
          className="relative text-center py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              className="w-full h-24 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              ></path>
            </motion.svg>
          </div>
          <div className="relative z-10">
            <motion.h3
              className="text-cyan-500 text-2xl font-semibold mb-4 "
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your Fun Journey Starts Now
            </motion.h3>
            <motion.h1
              className="text-4xl md:text-5xl font-semibold text-gray-900 font-new"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Upcoming Adventures
            </motion.h1>
          </div>
        </motion.div>

        <div className="relative pb-6 w-full mx-auto">
          <div className="relative overflow-hidden">
            <motion.div
              className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
              {Array.from({ length: visibleCards }).map((_, i) => {
                const index = (currentIndex + i) % events.length;
                const event = events[index];

                return (
                  <motion.div
                    key={index}
                    className="cursor-pointer relative group overflow-hidden rounded-lg shadow-md"
                    onClick={() => router.push(`/event/${event.slug}`)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full h-[300px] sm:h-[450px] overflow-hidden rounded-lg">
                      <div className="w-full h-full transition-transform duration-500 transform group-hover:scale-110">
                        <Image
                          src={event.image}
                          alt={event.title || "Event image"}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 py-3 px-4 transition duration-300 group-hover:bg-orange-600">
                        <h3 className="text-white text-sm sm:text-base font-semibold uppercase text-center">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-2 sm:px-0 z-10">
            <motion.button
              onClick={prev}
              whileTap={{ scale: 0.9 }}
              className="rounded-full h-10 w-10 text-orange-700 border-2 border-orange-700 text-xl flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              <Icon icon="iconoir:nav-arrow-left" width="20" height="20" />
            </motion.button>

            <motion.button
              onClick={next}
              whileTap={{ scale: 0.9 }}
              className="text-orange-700 border-2 border-orange-700 rounded-full h-8 w-8 sm:h-10 sm:w-10 text-xl flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              <Icon icon="iconoir:nav-arrow-right" width="20" height="20" />
            </motion.button>
          </div>

          {/* View All Events Button */}
          <motion.a
            href="#"
            onClick={handleViewAllEvents}
            className="text-white w-[200px] text-center mx-auto mt-4 btn bg-orange-700 px-4 py-3 font-500 flex items-center justify-center text-sm sm:text-base rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Events
            <button
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              className="bg-orange-100 text-orange-700 rounded-full h-4 w-4 sm:h-5 sm:w-5 text-4xl px-0.5 sm:px-1 border-2 border-orange-700 flex items-center justify-center hover:bg-opacity-75 transition-all ml-1 sm:ml-2 sm:my-1 mr-0"
            >
              <Icon icon="iconoir:nav-arrow-right" width="14" height="14" />
            </button>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
