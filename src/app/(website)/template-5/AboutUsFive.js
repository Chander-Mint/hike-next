"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutUsFive = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
      
        {/* Left Image */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/tent.jpg"
            alt="About Us"
            className="w-full h-[450px] object-cover"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="md:text-3xl font-semibold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            The best journeys in life are those that answer questions you never thought to ask
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We are committed to delivering excellence in every project we handle. Our dedicated team works passionately to bring innovative and user-centric solutions tailored to your needs.
          </motion.p>

          <motion.ul
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[
              "Creative and Custom Designs",
              "Responsive and User-Friendly Interfaces",
              "High-Performance Development Practices",
            ].map((text, idx) => (
              <motion.li
                key={idx}
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="text-orange-700 text-xl mr-3">✓</span>
                <span className="text-gray-800 text-base">{text}</span>
              </motion.li>
            ))}
          </motion.ul>

       
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsFive;
