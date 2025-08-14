import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaBoxOpen, FaCheckCircle, FaUsers, FaMapMarkerAlt } from "react-icons/fa";

const statsData = [
  {
    id: 1,
    icon: <FaBoxOpen size={40} className="text-blue-50" />,
    label: "Total Items Reported",
    value: 245,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: <FaCheckCircle size={40} className="text-green-50" />,
    label: "Items Returned",
    value: 150,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 3,
    icon: <FaUsers size={40} className="text-purple-50" />,
    label: "Active Users",
    value: 500,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    icon: <FaMapMarkerAlt size={40} className="text-orange-50" />,
    label: "Locations Covered",
    value: 30,
    color: "from-orange-500 to-yellow-500",
  },
];

const StatsSection = () => {
  return (
    <div className=" pb-30 px-6 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold">
          📊 Our Lost & Found Impact
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Every day, we help people reconnect with their belongings and make the world a bit more honest.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all"
          >
            <div
              className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${stat.color} text-white shadow-md mb-4`}
            >
              {stat.icon}
            </div>
            <div className="text-5xl font-extrabold text-gray-800">
              <CountUp
                end={stat.value}
                duration={1.5}
                suffix="+"
                enableScrollSpy
              />
            </div>
            <p className="text-lg text-gray-500 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
