import React from "react";

const VideoBanner = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/video-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

      {/* Banner Content at Bottom */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center md:justify-end text-center text-white px-4 pb-12">
        <div className="w-full md:w-[900px] mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Your Adventure Begins Where the Road Ends
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Leave behind the routine and walk into a world of thrill and wonder.
            With every step, feel stronger, freer, and more alive.
          </p>
          <button className="bg-transparent text-white px-12 border border-white py-3 rounded-lg text-base hover:bg-orange-900 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBanner;
