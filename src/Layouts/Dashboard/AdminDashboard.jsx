import React from "react";
import { NavLink } from "react-router";
import {
  PiUser,
  PiPlusCircle,
  PiFiles,
  PiUsersThree,
  PiChartBar,
} from "react-icons/pi";
import useRole from "../../hooks/useRole";

const AdminDashboard = () => {
  const {role} = useRole()
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
        <NavLink to="/dashboard/add-scholarship">
          <PiPlusCircle className="w-5 h-5" />
          Add Scholarship
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-scholarships">
          <PiFiles className="w-5 h-5" />
          Manage Scholarships
        </NavLink>
      </li>
      {role === "super-admin" && (
        <li>
          <NavLink to="/dashboard/manage-applications">
            <PiFiles className="w-5 h-5" />
            Manage Applications
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/dashboard/manage-users">
          <PiUsersThree className="w-5 h-5" />
          Manage Users
        </NavLink>
      </li>
    </>
  );
};

export default AdminDashboard;
