import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LatestUiData = ({ item }) => {
  const { _id, title, thumbnail, category, date, location, postType } = item;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white overflow-hidden rounded-lg shadow-xl hover:shadow-2xl cursor-pointer group"
    >
      {/* image */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-100"></div>

      {/* post type badge */}
      <span
        className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
          postType === "Lost" ? "bg-red-600 text-white" : "bg-green-600 text-white"
        } shadow-md z-10`}
      >
        {postType}
      </span>

      {/* content */}
      <div className="absolute bottom-0 p-5 w-full text-white space-y-1">
        {/* <h2 className="text-xl font-bold drop-shadow">{title}</h2> */}
        <p className="text-sm opacity-90">📍 {location}</p>
        <p className="text-xs opacity-80">🕒 {new Date(date).toLocaleDateString()}</p>
        <p className="text-xs opacity-80">Category: {category}</p>
      </div>

      {/* hover view details */}
      <Link
        to={`/viewDetails/${_id}`}
        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <button className="bg-white text-black font-medium px-5 py-2 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition">
          🔍 View Details
        </button>
      </Link>
    </motion.div>
  );
};

export default LatestUiData;
