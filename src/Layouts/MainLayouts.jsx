import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { HelmetProvider } from 'react-helmet-async';
const MainLayouts = () => {
    return (
        <HelmetProvider>
            <div className=''>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
        </HelmetProvider>
    );
};

export default MainLayouts;