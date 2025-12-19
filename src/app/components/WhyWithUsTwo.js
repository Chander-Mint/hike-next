import { Icon } from "@iconify/react";

const features = [
  {
    icon: "mdi:account-star",
    title: "Expert Guides",
    description:
      "Highly experienced and certified trekking guides with in-depth knowledge of trails, local culture, and safety protocols.",
  },
  {
    icon: "mdi:shield-check",
    title: "Safety First",
    description:
      "Robust safety measures, including first aid-trained staff, emergency evacuation plans, and top-notch trekking gear.",
  },
  {
    icon: "mdi:compass",
    title: "Tailored Experiences",
    description:
      "Personalized trekking itineraries crafted to match different skill levels, fitness capabilities, and individual preferences.",
  },
  {
    icon: "mdi:map-marker-radius",
    title: "Local Expertise",
    description:
      "Strong connections with local communities, offering authentic cultural experiences and eco-friendly practices.",
  },
  {
    icon: "mdi:bag-suitcase",
    title: "Premium Equipment",
    description:
      "High-quality trekking equipment provided, ensuring comfort and safety during the journey.",
  },
  {
    icon: "mdi:leaf",
    title: "Sustainable Tourism",
    description:
      "Committed to responsible trekking, supporting local economies, and minimizing environmental impact.",
  },
];

export default function WhyWithUsTwo() {
  return (
    <section className="container mx-auto bg-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-black text-center">
          Why choose us?
        </h2>
        <p className="text-gray-600 text-lg mt-2 text-center">
          We combine expertise, passion, and dedication to deliver results that
          matter.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {features.map((item, index) => (
          <div
            key={index}
            className="group flex items-start bg-gray-100 p-6 sm:p-6 rounded-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
          >
            <span className="text-orange-700 bg-orange-100 mr-4 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-orange-700 group-hover:text-white">
              <Icon
                icon={item.icon}
                width="28"
                height="28"
                className="transition-all duration-300"
              />
            </span>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold mb-2 text-black">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
