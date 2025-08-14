import React, {  useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import AuthContexts from "../Contexts/AuthContexts";
import registerAnimation from "../assets/login-animation.json";
import { updateProfile } from "firebase/auth";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser } = useContext(AuthContexts);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!name || !photo || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 1 uppercase, 1 lowercase letter, and be at least 6 characters"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        result.user
          updateProfile(result.user, {
            displayName: name,
            photoURL: photo,
          })
          .then(() => {
            toast.success("Registration successful!");
            navigate(location?.state || "/");
            form.reset();
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            toast.error("Profile update failed");
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        toast.error("Registration failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-200 px-4 py-10">
      <Helmet>
        <title>Register - Find And Lose</title>
      </Helmet>
      {/* Lottie Animation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 max-w-lg"
      >
        <Lottie animationData={registerAnimation} loop={true} />
      </motion.div>

      {/* Registration Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 max-w-md p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
      >
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Register now!
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-blue-800">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-white via-gray-100 to-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-blue-800">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-white via-gray-100 to-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-blue-800">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-white via-gray-100 to-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-blue-800">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-white via-gray-100 to-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2 mt-4 shadow-lg transition">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-blue-800 font-semibold text-lg">
          Already have an account?{" "}
          <Link
            to="/login"
            className="underline hover:text-blue-900 transition"
          >
            Please Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
