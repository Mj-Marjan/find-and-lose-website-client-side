import React, { use, useState } from "react";
import { toast } from "react-toastify";
import AuthContexts from "../../Contexts/AuthContexts";
import { motion } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";
import Confetti from "react-confetti";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success-animation.json";
import { Helmet } from "react-helmet";

const AddLostFoundItem = () => {
  const { user } = use(AuthContexts);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleItemSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const itemData = Object.fromEntries(formData.entries());
    itemData.userEmail = user?.email || "";

    setLoading(true);
    fetch("https://lost-found-project.vercel.app/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("🎉 Item added successfully!");
          form.reset();
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 4000);
        }
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        toast.error("❌ Failed to add item. Try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-12 px-4">
      <Helmet>
        <title>Add Lost/Found Item - Find And Lose</title>
      </Helmet>
      {showSuccess && (
        <>
          <Confetti numberOfPieces={300} recycle={false} />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-52 z-50">
            <Lottie animationData={successAnimation} loop={false} />
            <p className="text-center text-green-600 font-bold">Post Added!</p>
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl w-full p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200"
      >
        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-8 text-center text-blue-800 flex items-center justify-center gap-2"
        >
          <FaPlusCircle className="text-green-500" /> Add Lost / Found Item
        </motion.h2>

        <form onSubmit={handleItemSubmit} className="space-y-5">
          {/* Post Type */}
          <div>
            <label className="block font-medium mb-1">Post Type</label>
            <select name="postType" className="w-full border p-2 rounded-xl">
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input name="thumbnail" type="text" placeholder="Image URL" className="w-full border p-2 rounded-xl" />
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input name="title" type="text" placeholder="Item Title" className="w-full border p-2 rounded-xl" />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea name="description" rows="4" placeholder="Item Description" className="w-full border p-2 rounded-xl"></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input name="category" type="text" placeholder="e.g. pets, documents" className="w-full border p-2 rounded-xl" />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input name="location" type="text" placeholder="Lost or Found location" className="w-full border p-2 rounded-xl" />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium mb-1">Date</label>
            <input name="date" type="date" className="w-full border p-2 rounded-xl" />
          </div>

          {/* User Name */}
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input name="name" value={user?.displayName || ""} readOnly className="w-full border p-2 rounded-xl bg-gray-100 cursor-not-allowed" />
          </div>

          {/* User Email */}
          <div>
            <label className="block font-medium mb-1">Your Email</label>
            <input name="email" value={user?.email || ""} readOnly className="w-full border p-2 rounded-xl bg-gray-100 cursor-not-allowed" />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 rounded-xl font-semibold transition`}
          >
            {loading ? "Posting..." : "➕ Add Post"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddLostFoundItem;
