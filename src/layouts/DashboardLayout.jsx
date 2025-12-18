/**
 * Dashboard Layout Component
 * Responsive sidebar navigation with mobile drawer
 */

import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaStar,
  FaGraduationCap,
  FaClipboardList,
  FaPlus,
  FaCog,
  FaUsers,
  FaChartLine,
  FaUser,
  FaHome,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaHeart,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = user?.role || "student";

  const NavLinkItem = ({ to, icon: Icon, children, end = false }) => (
    <NavLink
      to={to}
      end={end}
      onClick={() => setIsSidebarOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`
      }
    >
      <Icon className="text-lg" />
      <span className="font-medium">{children}</span>
    </NavLink>
  );

  const SidebarContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <FaGraduationCap className="text-2xl text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold">ScholarStream</h2>
            <p className="text-xs text-blue-100">Education Portal</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mt-4">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt={user?.displayName || "User"}
              className="w-12 h-12 rounded-full border-2 border-white/50"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-blue-100 capitalize">{role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        <NavLinkItem to="/dashboard" icon={FaTachometerAlt} end>
          Dashboard
        </NavLinkItem>

        {/* Student Links */}
        {role === "student" && (
          <>
            <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">
              Student
            </div>
            <NavLinkItem to="/dashboard/my-applications" icon={FaFileAlt}>
              My Applications
            </NavLinkItem>
            <NavLinkItem to="/dashboard/my-reviews" icon={FaStar}>
              My Reviews
            </NavLinkItem>
            <NavLinkItem to="/dashboard/my-wishlist" icon={FaHeart}>
              My Wishlist
            </NavLinkItem>
            <NavLinkItem to="/scholarships" icon={FaGraduationCap}>
              All Scholarships
            </NavLinkItem>
          </>
        )}

        {/* Moderator Links */}
        {role === "moderator" && (
          <>
            <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">
              Moderator
            </div>
            <NavLinkItem
              to="/dashboard/manage-applications"
              icon={FaClipboardList}
            >
              Manage Applications
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-reviews" icon={FaStar}>
              Manage Reviews
            </NavLinkItem>
          </>
        )}

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <div className="px-2 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">
              Administration
            </div>
            <NavLinkItem to="/dashboard/add-scholarship" icon={FaPlus}>
              Add Scholarship
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-scholarships" icon={FaCog}>
              Manage Scholarships
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-users" icon={FaUsers}>
              Manage Users
            </NavLinkItem>
            <NavLinkItem
              to="/dashboard/manage-applications"
              icon={FaClipboardList}
            >
              Manage Applications
            </NavLinkItem>
            <NavLinkItem to="/dashboard/manage-reviews" icon={FaStar}>
              Manage Reviews
            </NavLinkItem>
            <NavLinkItem to="/dashboard/analytics" icon={FaChartLine}>
              Analytics
            </NavLinkItem>
          </>
        )}

        {/* Common Links */}
        <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
          <NavLinkItem to="/dashboard/profile" icon={FaUser}>
            My Profile
          </NavLinkItem>
          <NavLinkItem to="/" icon={FaHome}>
            Home
          </NavLinkItem>
          <button
            onClick={() => {
              logout();
              setIsSidebarOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 bg-white shadow-xl fixed h-full overflow-y-auto">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
          <SidebarContent />
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <FaBars className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaTachometerAlt className="text-blue-600" />
                  Dashboard
                </h1>
                <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">
                  Welcome back! Here's what's happening.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <FaBell className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 lg:gap-3 pl-2 lg:pl-4 border-l border-gray-200 focus:outline-none">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt={user?.displayName || "User"}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring-2 ring-blue-500 object-cover"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-700">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{role}</p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 border border-gray-100 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate capitalize">
                      {role}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <NavLink
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    My Profile
                  </NavLink>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
