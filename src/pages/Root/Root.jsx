import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className='px-5 md:px-15'>
            <Navbar/>
            <Outlet />
            <Footer />
            <ToastContainer/>
        </div>
    );
};

export default Root;