import { FaFeatherAlt, FaPaperPlane } from "react-icons/fa";

const AboutUs2 = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="">
          <img
            src="/aboutus.png"
            alt="Hiking"
            className="rounded-2xl object-cover w-full h-full max-w-md"
            objectFit="cover"
            loading="lazy"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <p className="text-md text-gray-600 mb-2">About Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight lg:leading-loose">
            Inspiring Artists through <br />
            Stroke of the Brush
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl">
            Beyond the aesthetic appeal, hiking provides a profound sense of
            ment and emotional rejuvenation. The rhythmic movement and immersive
            surroundings offer a therapeutic escape.
          </p>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-200 text-orange-700 p-6 rounded-md">
                <FaFeatherAlt />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-xl">Our Vision</h4>
                <p className="text-md text-gray-600">
                  Regular hiking has been linked to a lower risk of heart disease
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 mb-4">
              <div className="bg-orange-200 text-orange-700 p-6 rounded-md">
                <FaPaperPlane />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-xl">Our Mission</h4>
                <p className="text-md text-gray-600">
                  Regular hiking has been linked to a lower risk of heart disease
                </p>
              </div>
            </div>
          </div>

          {/* Book Now Button */}
          <button className="flex items-center bg-orange-700 text-white px-8 py-3 rounded-lg text-md hover:bg-orange-600 transition">
            Book Now <span className="ml-2 text-lg">+</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs2;
