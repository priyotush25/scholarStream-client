import React from "react";
import { Outlet, Link, NavLink } from "react-router";
import { PiHouse, PiSignOut } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard";
import StudentDashboard from "./StudentDashboard";
import Loader from "../../components/common/Loader/Loader";
import { ToastContainer } from "react-toastify";

const MainDashboard = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };

  if (roleLoading) {
    return <Loader />;
  }

  const renderSidebarLinks = () => {
    switch (role) {
      case "admin":
      case "super-admin":
        return <AdminDashboard />;
      case "moderator":
        return <ModeratorDashboard />;
      case "student":
      default: // Default to student if role is unclear but logged in
        return <StudentDashboard />;
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center bg-base-100">
        {/* Page content here */}
        <div className="w-full navbar bg-base-100 lg:hidden shadow-sm">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl gradient-text">
            ScholarStream
          </div>
        </div>

        <div className="w-full flex-1 p-4 md:p-8 overflow-y-auto bg-base-200/50">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content border-r border-base-200">
          {/* Sidebar content here */}
          <div className="mb-8 px-4">
            <Link to="/" className="text-2xl font-bold gradient-text">
              ScholarStream
            </Link>
            <p className="text-xs text-base-content/50 mt-1">Dashboard Panel</p>
          </div>

          <div className="flex items-center gap-3 px-4 mb-6">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} />
                ) : (
                  <span className="text-xl">
                    {user?.displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>
            <div className="overflow-hidden">
              <h3 className="font-bold truncate">{user?.displayName}</h3>
              <p className="text-xs capitalize text-base-content/60">{role}</p>
            </div>
          </div>

          {renderSidebarLinks()}

          <div className="divider my-4"></div>

          <li>
            <NavLink to="/dashboard">
              <PiHouse className="w-5 h-5" />
              Home
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogOut}>
              <PiSignOut className="w-5 h-5" />
              Logout
            </button>
          </li>
        </ul>
          </div>
          <ToastContainer/>
    </div>
  );
};

export default MainDashboard;
