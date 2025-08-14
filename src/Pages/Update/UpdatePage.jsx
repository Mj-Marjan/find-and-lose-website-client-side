import React, { use, useState } from 'react';
import AuthContexts from '../../Contexts/AuthContexts';
import { useLoaderData } from 'react-router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Confetti from 'react-confetti';
import Lottie from 'lottie-react';
import successAnimation from '../../assets/success-animation.json';
import { Helmet } from 'react-helmet';

const UpdatePage = () => {
  const postData = useLoaderData();
  const { user } = use(AuthContexts);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!postData) {
    return <div className="text-center text-lg font-semibold animate-pulse">Loading...</div>;
  }

  const { _id, postType, thumbnail, title, description, date, location, category } = postData;

  const handleItemUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedItem = Object.fromEntries(formData.entries());

    fetch(`https://lost-found-project.vercel.app/items/${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success('🎉 Item updated successfully!');
          form.reset();
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 4000);
        }
      })
      .catch(() => {
        toast.error('❌ Failed to update item.');
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-12 px-4">
      <Helmet>
        <title>Update Item - Find And Lose</title>
      </Helmet>
      {showSuccess && (
        <>
          <Confetti numberOfPieces={250} recycle={false} />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-52 z-50">
            <Lottie animationData={successAnimation} loop={false} />
            <p className="text-center text-green-600 font-bold">Update Successful!</p>
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="w-full max-w-3xl p-8 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 z-10"
      >
        <motion.h2
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-blue-800 mb-8 flex items-center justify-center gap-2"
        >
          <FaCheckCircle className="text-green-500" />
          Update Lost / Found Item
        </motion.h2>

        <form onSubmit={handleItemUpdate} className="space-y-5">
          {/* All form inputs */}
          <div>
            <label className="block font-semibold mb-1">Post Type</label>
            <select name="postType" defaultValue={postType} className="w-full border p-2 rounded">
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Image URL</label>
            <input name="thumbnail" type="text" defaultValue={thumbnail} placeholder="Image URL" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input name="title" type="text" defaultValue={title} placeholder="Item Title" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea name="description" defaultValue={description} rows="3" placeholder="Item Description" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category</label>
            <input name="category" type="text" defaultValue={category} placeholder="e.g. pets, documents" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input name="location" type="text" defaultValue={location} placeholder="Lost/Found location" className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input name="date" type="date" defaultValue={date} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Your Name</label>
            <input name="name" value={user?.displayName || ''} readOnly className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Your Email</label>
            <input name="email" value={user?.email || ''} readOnly className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            ✅ Update Now
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdatePage;
