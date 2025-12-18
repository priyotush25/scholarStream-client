/**
 * Dashboard Home Page
 * Overview with stats, charts, and recent activities
 */

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBolt,
  FaFileAlt,
  FaSearch,
  FaUser,
  FaPlus,
  FaUsers,
  FaChartLine,
  FaDollarSign,
} from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const role = user?.role || "student";

  useEffect(() => {
    // Fetch dashboard stats for admin
    if (role === "admin") {
      axios
        .get("/analytics/stats")
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));
    }

    // Fetch recent applications for students
    if (role === "student" && user?.email) {
      axios
        .get(`/applications/user/${user.email}`)
        .then((res) => setApplications(res.data.slice(0, 5))) // Show 5 most recent
        .catch((err) => console.error(err));
    }
  }, [role, user]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {role === "admin" && stats ? (
          <>
            <StatCard
              title="Total Scholarships"
              value={stats.totals.scholarships}
              icon="🎓"
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              title="Active Applications"
              value={stats.totals.applications}
              icon="📄"
              color="bg-green-50 text-green-600"
            />
            <StatCard
              title="Approved Applications"
              value={
                stats.applicationsByStatus.find((s) => s.name === "completed")
                  ?.value || 0
              }
              icon="✅"
              color="bg-purple-50 text-purple-600"
            />
            <StatCard
              title="Total Funding"
              value="$2.4M"
              icon="💰"
              color="bg-orange-50 text-orange-600"
            />
          </>
        ) : (
          <>
            <StatCard
              title="My Applications"
              value={applications.length}
              icon="📄"
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              title="Pending"
              value={
                applications.filter((a) => a.applicationStatus === "pending")
                  .length
              }
              icon="⏳"
              color="bg-yellow-50 text-yellow-600"
            />
            <StatCard
              title="Approved"
              value={
                applications.filter((a) => a.applicationStatus === "completed")
                  .length
              }
              icon="✅"
              color="bg-green-50 text-green-600"
            />
            <StatCard
              title="Available Scholarships"
              value="1,247"
              icon="🎓"
              color="bg-purple-50 text-purple-600"
            />
          </>
        )}
      </div>

      {/* Recent Applications */}
      {role === "student" && (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaFileAlt className="text-blue-600" />
              Recent Applications
            </h2>
            <Link
              to="/dashboard/my-applications"
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1"
            >
              View All →
            </Link>
          </div>

          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-left font-bold text-gray-700 text-xs uppercase">
                      Scholarship
                    </th>
                    <th className="py-3 px-4 text-left font-bold text-gray-700 text-xs uppercase">
                      University
                    </th>
                    <th className="py-3 px-4 text-left font-bold text-gray-700 text-xs uppercase">
                      Date
                    </th>
                    <th className="py-3 px-4 text-left font-bold text-gray-700 text-xs uppercase">
                      Payment
                    </th>
                    <th className="py-3 px-4 text-left font-bold text-gray-700 text-xs uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr
                      key={app._id}
                      className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <FaGraduationCap className="text-blue-600" />
                          <span className="font-semibold text-gray-800">
                            {app.scholarshipName}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">
                          {app.universityName}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaClock className="text-gray-400" />
                          {new Date(app.applicationDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`badge badge-sm ${
                            app.paymentStatus === "paid"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`badge ${
                            app.applicationStatus === "completed"
                              ? "badge-success"
                              : app.applicationStatus === "processing"
                              ? "badge-info"
                              : app.applicationStatus === "rejected"
                              ? "badge-error"
                              : "badge-warning"
                          }`}
                        >
                          {app.applicationStatus === "completed" && (
                            <FaCheckCircle className="mr-1" />
                          )}
                          {app.applicationStatus === "processing" && (
                            <FaBolt className="mr-1" />
                          )}
                          {app.applicationStatus === "rejected" && (
                            <FaTimesCircle className="mr-1" />
                          )}
                          {app.applicationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <FaFileAlt className="text-6xl text-blue-300 mx-auto mb-4" />
              <p className="text-gray-600 font-medium mb-2">
                No applications yet
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Start applying to scholarships!
              </p>
              <Link to="/scholarships" className="btn btn-primary btn-sm">
                <FaSearch className="mr-2" />
                Browse Scholarships
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {role === "student" && (
            <>
              <Link
                to="/scholarships"
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">🔍</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Browse Scholarships
                </h3>
                <p className="text-sm text-gray-600">Find your perfect match</p>
              </Link>
              <Link
                to="/dashboard/my-applications"
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">📄</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  My Applications
                </h3>
                <p className="text-sm text-gray-600">Track your progress</p>
              </Link>
              <Link
                to="/dashboard/profile"
                className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">👤</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Update Profile
                </h3>
                <p className="text-sm text-gray-600">Keep info current</p>
              </Link>
            </>
          )}
          {role === "admin" && (
            <>
              <Link
                to="/dashboard/add-scholarship"
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">➕</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Add Scholarship
                </h3>
                <p className="text-sm text-gray-600">Create new opportunity</p>
              </Link>
              <Link
                to="/dashboard/manage-users"
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Manage Users
                </h3>
                <p className="text-sm text-gray-600">User administration</p>
              </Link>
              <Link
                to="/dashboard/analytics"
                className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-md transition"
              >
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  View Analytics
                </h3>
                <p className="text-sm text-gray-600">Insights & reports</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-2xl`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default DashboardHome;
