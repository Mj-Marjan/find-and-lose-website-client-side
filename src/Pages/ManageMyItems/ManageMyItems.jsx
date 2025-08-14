import React, { Suspense, use } from 'react';
import ShowMyApplication from './ShowMyApplication';
import AuthContexts from '../../Contexts/AuthContexts';
import { myItemPromise } from '../../API/ApplicationsAPI';
import { Helmet } from 'react-helmet';

const ManageMyItems = () => {
  const { user } = use(AuthContexts);
  
    

  console.log('token in the context', user.accessToken);
  return (
    <div className="min-h-[70vh] flex justify-center items-start py-10 bg-base-200">
      <Helmet>
        <title>Manage My Items - Find And Lose</title>
      </Helmet>
      <Suspense fallback={<div className="text-center text-lg font-semibold animate-pulse">Loading your items...</div>}>
        <ShowMyApplication myItemPromise={myItemPromise(user.email, user.accessToken)} />
      </Suspense>
    </div>
  );
};

export default ManageMyItems;
