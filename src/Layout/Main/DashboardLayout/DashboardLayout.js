import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../../Pages/Shared Components/Footer/Footer';
import Navbar from '../../../Pages/Shared Components/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;