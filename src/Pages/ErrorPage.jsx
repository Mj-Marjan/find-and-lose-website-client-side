import React, { useEffect, useState } from 'react';
import animationData from '../assets/errorPage.json';
import Lottie from 'lottie-react';
import { useNavigate, Link } from 'react-router';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const ErrorPage = () => {
  const [countdown, setCountdown] = useState(20);
  const navigate = useNavigate();

  // ⏱️ Countdown & Redirect
  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 relative overflow-hidden">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      {/* 🎉 Confetti Effect */}
      <Confetti numberOfPieces={250} recycle={false} />

      {/* 🔢 404 Number */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-8xl font-black text-pink-500 drop-shadow-md"
      >
        404
      </motion.h1>

      {/* 🖼️ Lottie Animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64 h-64 mt-4"
      >
        <Lottie animationData={animationData} loop />
      </motion.div>

      {/* 📝 Message */}
      <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 text-center mt-4 drop-shadow-sm">
        😵 Oops! Page Not Found
      </h2>

      <p className="text-gray-600 text-center mt-2 mb-4">
        Redirecting to Home in <span className="font-bold text-red-500">{countdown}</span> seconds...
      </p>

      {/* 🔙 Go Home Button (if they want to click manually) */}
      <Link to="/">
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition duration-300">
          🔙 Go to Home Now
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
