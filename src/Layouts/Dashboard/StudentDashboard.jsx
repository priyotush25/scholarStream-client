import React from 'react';
import { NavLink } from 'react-router';
import { PiUser, PiFiles, PiStar } from 'react-icons/pi';

const StudentDashboard = () => {
    return (
        <>
            <li>
                <NavLink to="/dashboard/my-profile">
                    <PiUser className="w-5 h-5" />
                    My Profile
                </NavLink>
            </li>
            <div className="divider my-2"></div>
            <li>
                <NavLink to="/dashboard/my-applications">
                    <PiFiles className="w-5 h-5" />
                    My Applications
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/my-reviews">
                    <PiStar className="w-5 h-5" />
                    My Reviews
                </NavLink>
            </li>
        </>
    );
};

export default StudentDashboard;
