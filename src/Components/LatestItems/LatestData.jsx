import React from 'react';
import { Link, useLoaderData } from 'react-router'; 
import LatestUiData from './LatestUiData';


const LatestData = () => {
  const itemsData = useLoaderData();

  const latestPosts = itemsData
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by latest date
    .slice(0, 8); // show only 6

  return (
    <div className="w-11/12 mx-auto my-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-blue-700 drop-shadow-lg mb-10">
        Latest Lost & Found Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          latestPosts.map(item => (
            <LatestUiData key={item._id} item={item}></LatestUiData>
          ))
        }
      </div>

      <div className="text-center mt-8">
        <Link to={'/lost-found-items'}>
        <button className="btn btn-primary px-6 py-2 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestData;
