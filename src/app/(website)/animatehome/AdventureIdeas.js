'use client';
import React from 'react';
import { motion } from 'framer-motion';

const features = [
  "Creative and Custom Designs",
  "Responsive and User-Friendly Interfaces",
  "High-Performance Development Practices",
];

const AdventureIdeas = () => {
  return (
    <div className="bg-white py-20 px-4 text-center">
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-cyan-600 font-bold text-lg"
      >
        Take yourself
      </motion.h3>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.9 }}
        className="text-4xl font-bold text-gray-900 mt-2"
      >
        Adventure Ideas
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="mt-6 text-gray-600 max-w-2xl mx-auto"
      >
        We are committed to delivering excellence in every project we handle. Our dedicated team works passionately to bring innovative and user-centric solutions tailored to your needs.
      </motion.p>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.5 } },
        }}
        className="mt-8 space-y-4 text-center max-w-xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            className="flex items-start justify-center text-gray-800"
          >
            <span className="text-orange-600 mr-2 text-xl">✓</span>
            <span>{feature}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default AdventureIdeas;
