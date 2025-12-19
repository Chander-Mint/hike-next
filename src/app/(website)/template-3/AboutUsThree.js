import React from "react";

const AboutUsThree = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="w-full">
          <img
            src="/aboutus.webp"
            alt="About Us"
            className=" w-full h-[550px] object-cover"
          
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="md:text-3xl font-semibold text-gray-800 mb-4">
            The best journeys in life are those that answer questions you never thought to ask
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            We are committed to delivering excellence in every project we handle. Our dedicated team works passionately to bring innovative and user-centric solutions tailored to your needs.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-orange-700 text-xl mr-3">✓</span>
              <span className="text-gray-800 text-base">
                Creative and Custom Designs
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-700 text-xl mr-3">✓</span>
              <span className="text-gray-800 text-base">
                Responsive and User-Friendly Interfaces
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-700 text-xl mr-3">✓</span>
              <span className="text-gray-800 text-base">
                High-Performance Development Practices
              </span>
            </li>
          </ul>
           <p className="text-gray-600 text-lg leading-relaxed mb-6 mt-6">
            We are committed to delivering excellence in every project we handle. Our dedicated team works passionately to bring innovative and user-centric solutions tailored to your needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsThree;
