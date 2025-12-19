"use client";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AnimateEvent({ upcomingEvents }) {
   
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="bg-[#eef3f7] py-5">
      <div className="container mx-auto px-0 md:px-6 py-8 sm:py-0">
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
              Future Fun Starts Here!
            </h3>
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Our Upcoming Events
            </h1>
          </div>
        </div>
        <div className="relative pb-6 w-full mx-auto">
          <div className="relative overflow-hidden">
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: visibleCards }).map((_, i) => {
                const index = (currentIndex + i) % events.length;
                const event = events[index];
                return (
                  <div
                    key={index}
                    className="cursor-pointer relative group overflow-hidden"
                    onClick={() => router.push(`/event/${event.slug}`)}
                  >
                    {/* Image */}
                    <div className="relative w-full h-[300px] sm:h-[450px]">
                      <Image
                        src={event.image}
                        alt={event.title || "Event image"}
                        fill
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      {/* Title */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-in-out text-center">
                        <h3 className="text-white text-base sm:text-lg font-semibold uppercase">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex items-center justify-between px-2 sm:px-0 z-10">
            <button
              onClick={prev}
              className="rounded-full h-10 w-10 text-orange-700 border-2 border-orange-700 sm:h-10 sm:w-10 text-xl sm:text-2xl px-1 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              <Icon
                icon="iconoir:nav-arrow-left"
                width="20"
                height="20"
                className="sm:w-24 sm:h-24"
              />
            </button>
            <button
              onClick={next}
              className="text-orange-700 border-2 border-orange-700 rounded-full h-8 w-8 sm:h-10 sm:w-10 text-xl sm:text-2xl px-1 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              <Icon
                icon="iconoir:nav-arrow-right"
                width="20"
                height="20"
                className="sm:w-24 sm:h-24"
              />
            </button>
          </div>
          <a
            href="#"
            onClick={handleViewAllEvents}
            className="text-white w-[200px] text-center mx-auto mt-4 btn bg-orange-700 px-4 py-3 font-500 flex items-center text-sm sm:text-base"
          >
            View All Events
            <button
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              className="bg-orange-200 text-orange-700 rounded-full h-4 w-4 sm:h-5 sm:w-5 text-4xl sm:text-5xl px-0.5 sm:px-1 border-2 border-orange-700 flex items-center justify-center hover:bg-opacity-75 transition-all m-1 sm:m-2"
            >
              <Icon
                icon="iconoir:nav-arrow-right"
                width="12"
                height="12"
                className="sm:w-16 sm:h-16"
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
