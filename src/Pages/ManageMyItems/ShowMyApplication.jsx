import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const ShowMyApplication = ({ myItemPromise }) => {
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    myItemPromise.then((data) => setMyItems(data));
  }, [myItemPromise]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://lost-found-project.vercel.app/items/${_id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              setMyItems(prevItems => prevItems.filter(item => item._id !== _id));
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
            }
          });
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="w-full max-w-7xl mx-auto px-4"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow">
        My Added Items ({myItems.length})
      </h1>

      {myItems.length === 0 ? (
        <motion.div
          className="text-center py-10 text-xl font-medium text-gray-500"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          You haven't added any items yet.
        </motion.div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl bg-base-100">
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead className="text-white bg-gradient-to-r from-indigo-600 to-purple-600">
              <tr>
                <th>#</th>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Category</th>
                <th>Post Type</th>
                <th>Location</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <AnimatePresence>
                {myItems.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    variants={rowVariants}
                    layout
                    exit="exit"
                    className="hover:bg-base-200 transition-all"
                  >
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">
                      {item.thumbnail?.includes("http") ? (
                        <img
                          src={item.thumbnail}
                          alt="thumb"
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {item.thumbnail?.slice(0, 2).toUpperCase() || "NA"}
                        </div>
                      )}
                    </td>
                    <td className="font-semibold">{item.title}</td>
                    <td>
                      <span className="badge badge-info">{item.category}</span>
                    </td>
                    <td>
                      <span className={`badge ${item.postType === 'Found' ? 'badge-success' : 'badge-warning'}`}>
                        {item.postType}
                      </span>
                    </td>
                    <td className="whitespace-nowrap">{item.location}</td>
                    <td className="whitespace-nowrap">{item.date}</td>
                    <td className="flex flex-col md:flex-row gap-2 justify-center items-center whitespace-nowrap">
                      <Link to={`/update/${item._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                        >
                          Update
                        </motion.button>
                      </Link>
                      <motion.button
                        onClick={() => handleDelete(item._id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md"
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ShowMyApplication;
