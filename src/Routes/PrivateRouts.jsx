// import React, { use } from 'react';
import {  useContext } from 'react';
// import AuthContexts from '../Contexts/AuthContexts';
import { Navigate, useLocation } from 'react-router';
import AuthContexts from '../Contexts/AuthContexts';

const PrivateRouts = ({children}) => {

    const { user, loading } = useContext(AuthContexts)

    const location = useLocation();


    if (loading) {
        return <div className='flex justify-center items-center h-screen'>
            <button className="btn loading">loading</button>
        </div>
    }

    if (!user) {
        return <Navigate state={location?.pathname} to={"/login"}></Navigate>
    }
    return children;
};

export default PrivateRouts;