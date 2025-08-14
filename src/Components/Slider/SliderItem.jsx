import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

const SliderItem = ({ banner }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
      {/* Loading Spinner */}
      {!imgLoaded && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      )}

      {/* Background Image */}
      <img
        src={banner.image}
        alt={banner.title}
        className="w-full h-full object-cover"
        onLoad={() => setImgLoaded(true)}
        style={{ display: imgLoaded ? "block" : "none" }}
      />

      {/* Gradient Overlay */}
      {imgLoaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      )}

      {/* Text Content Centered */}
      {imgLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600
            bg-clip-text text-transparent drop-shadow-lg"
          >
            {banner.title}
          </motion.h2>

          <p className="text-sm md:text-lg max-w-md drop-shadow-md my-4">
            {banner.description}
          </p>

          <Link
            to={banner.link}
            className="bg-white text-black font-semibold px-5 py-2 rounded-full hover:bg-primary hover:text-white transition"
          >
            {banner.buttonText}
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default SliderItem;
