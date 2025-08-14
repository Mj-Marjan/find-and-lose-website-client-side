import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaShieldAlt, FaEyeSlash, FaHandsHelping, FaLock, FaMapMarkerAlt } from "react-icons/fa";

const tipsData = [
  {
    id: 1,
    icon: <FaShieldAlt size={30} className="text-blue-500" />,
    title: "সর্বজনীন স্থানে সতর্ক থাকুন",
    desc: "ভিড় এলাকায় নিজের জিনিসপত্র সবসময় চোখের সামনে রাখুন এবং অচেনা কাউকে দায়িত্ব দেবেন না।",
  },
  {
    id: 2,
    icon: <FaEyeSlash size={30} className="text-orange-500" />,
    title: "ব্যক্তিগত তথ্য গোপন রাখুন",
    desc: "Lost item রিপোর্ট করার সময় ফোন নম্বর, বাসার ঠিকানা বা সংবেদনশীল তথ্য পাবলিকলি দেবেন না।",
  },
  {
    id: 3,
    icon: <FaHandsHelping size={30} className="text-green-500" />,
    title: "Found item নিরাপদে রাখুন",
    desc: "পাওয়া জিনিস নিরাপদে সংরক্ষণ করুন এবং মালিকের প্রমাণ যাচাই ছাড়া কাউকে ফেরত দেবেন না।",
  },
  {
    id: 4,
    icon: <FaLock size={30} className="text-purple-500" />,
    title: "অ্যাকাউন্ট সিকিউর রাখুন",
    desc: "ওয়েবসাইটে লগইন করলে শক্তিশালী পাসওয়ার্ড ব্যবহার করুন এবং নিয়মিত পরিবর্তন করুন।",
  },
  {
    id: 5,
    icon: <FaMapMarkerAlt size={30} className="text-pink-500" />,
    title: "লোকেশন শেয়ার সাবধানে করুন",
    desc: "Lost/Found item এর লোকেশন কেবলমাত্র মালিক বা প্রশাসনের সাথে শেয়ার করুন।",
  },
];

const SafetyTips = () => {
  return (
    <div className="my-16 px-10 max-w-7xl mx-auto">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4">
          🛡️ Safety Tips
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Lost & Found ব্যবহার করার সময় নিরাপত্তা নিশ্চিত করতে এই টিপসগুলো অনুসরণ করুন।
        </p>
      </motion.div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {tipsData.map((tip, index) => (
          <SwiperSlide key={tip.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all h-full flex flex-col justify-between"
            >
              <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                {tip.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h3>
              <p className="text-gray-600 text-sm">{tip.desc}</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SafetyTips;
