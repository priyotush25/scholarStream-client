import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, logoutHandle } = useAuth(); // Auth context থেকে ইউজার এবং logout

  console.log(user);

  const pathname = location.pathname;

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Scholar<span className="text-blue-800">Stream</span>
          </Link>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-700 font-medium">
            <li>
              <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
            </li>
            <li>
              <NavLink to="/scholarships" className="hover:text-blue-600">All Scholarships</NavLink>
            </li>
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="navbar-end gap-2">

          {user ? (
            // যদি ইউজার থাকে
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border">
                  <img src={user.photoURL || "/default-user.png"} alt="User" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-white rounded-box w-52"
              >
                <li>
                  <span className="font-medium">Hello, {user.displayName || user.email}</span>
                </li>
                <li>
                  <button
                    className="text-red-500"
                    onClick={logoutHandle}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // যদি ইউজার না থাকে
            <>
              {pathname !== "/login" && (
                <Link to="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
              )}
              {pathname !== "/register" && (
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
              )}
            </>
          )}

        </div>

        {/* Mobile Menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">☰</label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scholarships">All Scholarships</Link></li>

            {user ? (
              <>
                <li><span>Hello, {user.displayName || user.email}</span></li>
                <li>
                  <button onClick={logoutHandle} className="text-red-500">Logout</button>
                </li>
              </>
            ) : (
              <>
                {pathname !== "/login" && <li><Link to="/login">Login</Link></li>}
                {pathname !== "/register" && <li><Link to="/register">Register</Link></li>}
              </>
            )}

          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
