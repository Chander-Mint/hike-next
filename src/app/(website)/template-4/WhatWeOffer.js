import React from "react";

const WhatWeOffer = () => {
  return (
    <div className="relative w-full border-t border-gray-200">
      {/* Full-Width Banner */}
      <div
        className="relative w-full h-100 bg-cover bg-bottom background-center pb-64"
        style={{ backgroundImage: "url('/middlebanner.jpg')" }}
      >
        <div className="container mx-auto flex items-center justify-end text-center">
          <section className="w-2/3 py-12 mx-8">
            <h3 className="text-cyan-500 px-4 text-left text-xl md:text-2xl font-new mb-2">
              Value Before Business
            </h3>
            <h1 className="text-4xl px-4 text-left mb-10 md:text-4xl font-semibold text-black">
              We Offer The Best
            </h1>
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Various Adventures */}
                <div className="flex items-center text-left px-4 py-2 border-b border-gray-200 group">
                  <img
                    src="/1.png"
                    alt="Various Adventures"
                    className="w-12 h-12 object-contain"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      Various Adventures
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Pack your bags and bring your dreams — the world is your
                      playground.
                    </p>
                  </div>
                </div>

                {/* Adventurous Trails */}
                <div className="flex items-center text-left px-4 py-2 border-b border-gray-200 group">
                  <img
                    src="/2.png"
                    alt="Adventurous Trails"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      Adventurous Trails
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Every trail leads to a new thrill and a breathtaking view.
                    </p>
                  </div>
                </div>

                {/* Trained Guides */}
                <div className="flex items-center text-left px-4 py-2 border-b border-gray-200 group">
                  <img
                    src="/3.png"
                    alt="Trained Guides"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      Trained Guides
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Our trained guides ensure your journey is safe and
                      unforgettable.
                    </p>
                  </div>
                </div>

                {/* Family Trips */}
                <div className="flex items-center text-left px-4 py-2 border-b border-gray-200 group">
                  <img
                    src="/4.png"
                    alt="Family Trips"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      Family Trips
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Create unforgettable memories with our family-friendly
                      adventures.
                    </p>
                  </div>
                </div>

                {/* Custom Packages */}
                <div className="flex items-center text-left px-4 py-2 border-b border-gray-200 group">
                  <img
                    src="/5.png"
                    alt="Custom Packages"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      Custom Packages
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Design your perfect getaway with handpicked options.
                    </p>
                  </div>
                </div>

                {/* Complete Guide */}
                <div className="flex items-center text-left px-4 py-2 border-b border-gray-200 group">
                  <img
                    src="/6.png"
                    alt="Complete Guide"
                    className="w-12 h-12 mb-4"
                  />
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                      Complete Guide
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Your all-in-one travel companion for a smooth journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
