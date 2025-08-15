import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import UiLostFoundItems from './UiLostFoundItems';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import bgAnimation from '../../assets/bgAnimation.json';
import noResultsAnimation from '../../assets/require.json';
import { FaSearch } from "react-icons/fa";
import { Helmet } from 'react-helmet';

const LostFoundItemsPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const lostFoundItems = useLoaderData();

  useEffect(() => {
    if (lostFoundItems && Array.isArray(lostFoundItems)) {
      setItems(lostFoundItems);
    }
  }, [lostFoundItems]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item => {
    const lower = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(lower) ||
      item.location.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="relative min-h-screen py-20 px-4 md:px-10 overflow-hidden">
      <Helmet>
        <title>Lost & Found Items - Find And Lose</title>
      </Helmet>
      {/* 🌀 Background Gradient + Animation Layer */}
      <div className="absolute inset-0 -z-20  bg-gradient-to-t from-blue-100 via-white to-blue-50" />
      
      {/* ✅ Main Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* 🧠 Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center my-10 drop-shadow-md"
        >
          🔍 Explore Lost & Found Items
        </motion.h1>

        {/* 🔎 Search Box */}
        <div className="max-w-md mx-auto mb-10 relative">
          <input
            type="text"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search by title or location..."
            className="input input-bordered w-full pl-12 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <FaSearch className="absolute top-3 left-4 text-gray-500" />
        </div>

        {/* 🎯 Filtered Items */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <UiLostFoundItems key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20">
            <Lottie animationData={noResultsAnimation} loop className="w-64 h-64" />
            <p className="text-xl text-pink-300 mt-4 font-semibold">
              😕 No matching items found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostFoundItemsPage;
