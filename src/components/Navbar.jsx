import { Link, NavLink, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  // current path
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
              <NavLink to="/" className="hover:text-blue-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/scholarships" className="hover:text-blue-600">
                All Scholarships
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="navbar-end gap-2">

          {/* Show Login only if not in Login page */}
          {pathname !== "/login" && (
            <Link to="/login" className="btn btn-outline btn-primary btn-sm">
              Login
            </Link>
          )}

          {/* Show Register only if not in Register page */}
          {pathname !== "/register" && (
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          )}

        </div>

        {/* Mobile */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">☰</label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scholarships">All Scholarships</Link></li>

            {pathname !== "/login" && <li><Link to="/login">Login</Link></li>}
            {pathname !== "/register" && <li><Link to="/register">Register</Link></li>}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
