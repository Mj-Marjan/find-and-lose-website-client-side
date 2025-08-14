import React, { use } from 'react';
import AuthContexts from '../Contexts/AuthContexts';
import { Navigate, useLocation } from 'react-router';

const PrivateRouts = ({children}) => {

    const { user, loading } = use(AuthContexts)

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