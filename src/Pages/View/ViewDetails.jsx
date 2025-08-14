import React, { use, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import AuthContexts from "../../Contexts/AuthContexts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";


const ViewDetails = () => {
  const item = useLoaderData();
  const { _id, title, description, date, location, thumbnail, postType, status } = item;
  const { user } = use(AuthContexts);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecovered, setIsRecovered] = useState(status === "recovered");
  const [showModal, setShowModal] = useState(false);
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedItem = {
      recoveredLocation,
      recoveredDate: recoveredDate.toISOString(),
      recoveredBy: `${user?.displayName || ""} (${user?.email || ""})`,
      originalPostOwnerEmail: item.email,
    };
    fetch(`https://lost-found-project.vercel.app/recovered-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          fetch(`https://lost-found-project.vercel.app/items/recover/${_id}`, { method: "PATCH" })
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Item successfully recovered! 🎉",
                showConfirmButton: false,
                timer: 2000,
              });
              setIsRecovered(true);
              setIsSubmitting(false);
              setShowModal(false);
              setTimeout(() => navigate("/recovered"), 2000);
            });
        } else {
          Swal.fire("Error", "Failed to submit recovery info.", "error");
          setIsSubmitting(false);
        }
      })
      .catch(() => {
        Swal.fire("Error", "Error submitting recovery info.", "error");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-blue-100 flex items-center justify-center p-6">
      <Helmet>
        <title>{title} - Find And Lose</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-3xl bg-white/50 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl"
      >
        {/* Thumbnail */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={thumbnail}
          alt={title}
          className="w-full h-64 object-cover rounded-xl shadow-xl mb-6"
        />

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2 drop-shadow-md">
          {title}
        </h1>

        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-sm text-blue-500">📍 {location}</p>
        <p className="text-sm text-blue-500">📅 {date}</p>

        {/* Action Buttons */}
        {status === "recovered" ? (
          <p className="mt-6 text-center text-green-600 font-semibold text-lg">✅ Already Recovered</p>
        ) : (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className={`mt-8 w-full px-6 py-3 font-medium rounded-full text-white shadow-xl ${
              postType === "Lost"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {postType === "Lost" ? "Found This!" : "This is Mine!"}
          </motion.button>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white/20 border border-white/20 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md relative shadow-2xl text-white"
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-xl text-white/80 hover:text-red-500"
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-md">Recover Information</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block mb-1 text-white/90">📍 Recovered Location</label>
                    <input
                      type="text"
                      value={recoveredLocation}
                      onChange={(e) => setRecoveredLocation(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                      placeholder="Where was it recovered?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-white/90">📅 Recovered Date</label>
                    <DatePicker
                      selected={recoveredDate}
                      onChange={(date) => setRecoveredDate(date)}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
                      required
                    />
                    <input type="hidden" name="recoveredDate" value={recoveredDate.toISOString()} />
                  </div>

                  <div>
                    <label className="block mb-1 text-white/90">👤 Recovered By</label>
                    <input
                      readOnly
                      value={`${user?.displayName || ""} (${user?.email || ""})`}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 cursor-not-allowed text-white/70"
                    />
                  </div>

                  <button
                    disabled={isSubmitting || isRecovered}
                    className={`w-full mt-6 py-2 rounded-full font-medium text-white shadow-xl ${
                      postType === "Lost" ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {postType === "Lost" ? "Found This!" : "This is Mine!"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ViewDetails;
