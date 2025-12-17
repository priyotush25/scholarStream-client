import React from 'react';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
          <div className='min-h-screen flex flex-col'>
            <Navbar/>
            <main className='flex-1 w-full max-w-7xl mx-auto px-4 py-5'>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default DashboardLayout;