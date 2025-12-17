import React from 'react';
import { NavLink } from 'react-router';
import { PiUser, PiFiles, PiStar, PiCheckCircle } from 'react-icons/pi';

const ModeratorDashboard = () => {
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
                <NavLink to="/dashboard/manage-applications">
                    <PiFiles className="w-5 h-5" />
                    Manage Applications
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/all-reviews">
                    <PiStar className="w-5 h-5" />
                    All Reviews
                </NavLink>
            </li>
        </>
    );
};

export default ModeratorDashboard;
