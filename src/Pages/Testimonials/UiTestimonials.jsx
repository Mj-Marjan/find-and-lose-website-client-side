import React from 'react';
import { motion } from 'framer-motion';

const UiTestimonials = ({ testimonials }) => {
  const { name, img, rating, text } = testimonials;

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:shadow-2xl transition transform hover:scale-105"
      whileHover={{ y: -8 }}
    >
      {/* User image */}
      <img
        src={img}
        alt={name}
        className="w-20 h-20 rounded-full mb-4 border-2 border-blue-200 shadow-md"
      />

      {/* Review text */}
      <p className="italic text-blue-700 mb-4">"{text}"</p>

      {/* Rating */}
      <div className="flex mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>⭐️</span>
        ))}
      </div>

      {/* User name */}
      <h4 className="text-blue-900 font-semibold text-lg">{name}</h4>
    </motion.div>
  );
};

export default UiTestimonials;
