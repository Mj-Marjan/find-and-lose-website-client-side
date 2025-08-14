import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const UiLostFoundItems = ({ item }) => {
  const { _id, postType, thumbnail, title, location, category } = item;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, boxShadow: "0 12px 24px rgba(0,0,0,0.3)" }}
      className="relative rounded-2xl overflow-hidden bg-white shadow-xl group"
    >
      {/* image */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 pointer-events-none"></div>

      {/* badge */}
      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
        postType === "Lost" ? "bg-red-600" : "bg-green-600"
      } text-white`}>
        {postType}
      </span>

      {/* content */}
      <div className="absolute bottom-0 w-full p-4 text-white">
        <h2 className="text-lg font-bold drop-shadow-sm">{title}</h2>
        <p className="text-sm opacity-90">📍 {location}</p>
      </div>

      {/* category label */}
      <span className="absolute bottom-3 right-3 bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
        {category}
      </span>

      {/* view details button */}
      <Link to={`/viewDetails/${_id}`}>
        <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/60 text-white font-bold text-xl transition-opacity">
          🔍 View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default UiLostFoundItems;
