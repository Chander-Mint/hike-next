// src/components/TrekkingCards.jsx
import React from 'react';
import { FiMapPin, FiShield, FiUsers } from 'react-icons/fi';

const data = [
  {
    icon: <FiMapPin className="text-orange-600 text-4xl mb-4" />,
    title: 'Secret Locations',
    description:
      'Uncover nature’s best-kept secrets. From mysterious forests to secluded waterfalls — adventure awaits off the map.',
  },
  {
    icon: <FiShield className="text-orange-600 text-4xl mb-4" />,
    title: 'Safe Adventure',
    description:
      'Your safety is our priority. We ensure all our treks are led by experienced guides and equipped with the necessary safety gear.',
  },
  {
    icon: <FiUsers className="text-orange-600 text-4xl mb-4" />,
    title: 'Professional Hikers',
    description:
      'Join a community of passionate hikers. Our group treks are a great way to meet like-minded adventurers.',
  },
];

const TrekkingCards = () => {
  return (
    <section className="bg-[#f2f2f2] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative top-[-100px] z-10">
          {data.map((item, index) => (
            <div key={index} className="bg-white p-10">
              <div className='mb-4'>{item.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a
                href="#"
                className="text-orange-600 font-semibold inline-flex gap-1 hover:underline"
              >
                READ MORE <span className="text-lg">→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-700">
          Don’t hesitate to contact us to get more information.{' '}
          <a href="#" className="text-orange-600 font-semibold hover:underline">
            EXPLORE ALL TREKKING →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrekkingCards;
