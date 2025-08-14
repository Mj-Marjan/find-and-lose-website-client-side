import React, {  useContext, useEffect, useState } from "react";
import UiRecoverItems from "./UiRecoverItems";
import AuthContexts from "../../Contexts/AuthContexts";
import { FaTh, FaList } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AllRecoverdItems = () => {
  const { user } = useContext(AuthContexts);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [layout, setLayout] = useState("card"); // default layout

  useEffect(() => {
    if (user?.email) {
      fetch(`https://lost-found-project.vercel.app/recovered-items?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setRecoveredItems(data));
    }
  }, [user]);

  return (
    <div className="mx-auto my-10 px-6 max-w-7xl">
      <Helmet>
        <title>All Recovered Items - Find And Lose</title>
      </Helmet>
      {/* Title and Layout Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-blue-500 drop-shadow-lg">
          ✨ All Recovered Items ✨
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLayout("card")}
            className={`p-2 rounded-full hover:bg-blue-100 transition ${
              layout === "card" ? "bg-blue-200 text-blue-600" : "text-gray-400"
            }`}
            title="Card Layout"
          >
            <FaTh size={20} />
          </button>
          <button
            onClick={() => setLayout("table")}
            className={`p-2 rounded-full hover:bg-blue-100 transition ${
              layout === "table" ? "bg-blue-200 text-blue-600" : "text-gray-400"
            }`}
            title="Table Layout"
          >
            <FaList size={20} />
          </button>
        </div>
      </div>

      {/* Layout Switch */}
      {recoveredItems.length === 0 ? (
        <p className="text-center text-2xl font-bold col-span-3 text-lg text-gray-500 italic">
          No recovered items yet.
        </p>
      ) : layout === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-stretch">
          {recoveredItems.map((item) => (
            <UiRecoverItems key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100 mt-6">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-base">
              <tr>
                <th>#</th>
                <th>Location</th>
                <th>Recovered Date</th>
                <th>Recovered By</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item, index) => (
                <tr key={item._id} className="hover:bg-base-200 transition-all">
                  <td>{index + 1}</td>
                  <td>{item.recoveredLocation}</td>
                  <td>{new Date(item.recoveredDate).toLocaleDateString()}</td>
                  <td>{item.recoveredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllRecoverdItems;
