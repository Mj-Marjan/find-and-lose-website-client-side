import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import AuthContexts from "../Contexts/AuthContexts";
import loginAnimation from "../assets/login-animation.json";
import { Helmet } from "react-helmet";

const Login = () => {
  const { signInUser, signInWithGoogle } = React.useContext(AuthContexts);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        form.reset();
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Invalid email or password.");
      });
  };

  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Google login successful!");
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Google login failed.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-200 px-4 py-10">
      <Helmet>
        <title>Login - Find And Lose</title>
      </Helmet>
      {/* 🎞️ Lottie Animation */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 max-w-md"
      >
        <Lottie animationData={loginAnimation} loop={true} />
      </motion.div>

      {/* 🔐 Login Form */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 max-w-md p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* 📧 Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 via-white to-indigo-100 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
            />
          </div>

          {/* 🔒 Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-100 via-white to-purple-100 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* 🔗 Forgot Password */}
          <div className="text-right">
            <a className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</a>
          </div>

          {/* 🚀 Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-4">OR</div>

        {/* 🟢 Google Login */}
        <motion.button
          onClick={handleGoogleLogIn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn w-full bg-white text-gray-800 border border-gray-300 shadow hover:shadow-lg"
        >
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  
          Continue with Google
        </motion.button>

        {/* 🔗 Register */}
        <p className="text-center text-sm text-gray-600 mt-5">
          New to Find And Lose?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
