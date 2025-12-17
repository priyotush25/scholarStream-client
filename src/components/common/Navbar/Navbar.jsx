import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then()
      .catch((err) => {
        console.log(err);
      });
  };
  const links = (
    <>
      <li><NavLink to={'/'} className="hover:text-purple-600 transition-colors">Home</NavLink></li>
      <li><NavLink to={'/all-scholarships'} className="hover:text-purple-600 transition-colors">All Scholarships</NavLink></li>
      <li><NavLink to={'/how-it-works'} className="hover:text-purple-600 transition-colors">How It Works</NavLink></li>
      <li><NavLink to={'/blog'} className="hover:text-purple-600 transition-colors">Blog</NavLink></li>
      <li><NavLink to={'/contact-us'} className="hover:text-purple-600 transition-colors">Contact Us</NavLink></li>
      {user && <li><NavLink to={'/dashboard'} className="hover:text-purple-600 transition-colors">Dashboard</NavLink></li>}
    </>
  );
  return (
    <div className="navbar bg-base-100/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost text-xl font-bold gradient-text"
        >
          ScholarStream
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogOut} className="btn btn-primary">
            Log Out
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
