import React, { useState } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import recoveredAnimation from "../../assets/recovered.json";

const UiRecoverItems = ({ item }) => {
  const { recoveredLocation, recoveredDate, recoveredBy } = item;

  const [expanded, setExpanded] = useState(false); // see more/less state

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl"
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-white opacity-10 rounded-2xl pointer-events-none"></div>

      {/* Lottie */}
      <div className="absolute bottom-2 right-2 w-46 h-26 opacity-70 z-0 pointer-events-none">
        <Player autoplay loop src={recoveredAnimation} />
      </div>

      {/* Title with conditional truncation */}
      <h1
        className={`text-xl font-bold drop-shadow mb-2 relative z-10 ${
          expanded ? "" : "line-clamp-1"
        }`}
      >
        📍 {recoveredLocation}
      </h1>

      {/* See more / See less button */}
      {recoveredLocation.length > 50 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs underline text-blue-200 relative z-10 mb-2"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}

      {/* Other Info */}
      <p className="text-sm drop-shadow relative z-10">
        📅 {new Date(recoveredDate).toLocaleDateString()}
      </p>

      <p className="mt-2 text-sm drop-shadow relative z-10 font-medium">
        🙍 Recovered By: {recoveredBy}
      </p>

      <div className="absolute inset-0 rounded-2xl border border-white opacity-20 pointer-events-none"></div>
    </motion.div>
  );
};

export default UiRecoverItems;
