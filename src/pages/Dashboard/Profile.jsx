import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "badge-error";
      case "moderator":
        return "badge-warning";
      case "student":
        return "badge-info";
      default:
        return "badge-ghost";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold mb-6">My Profile</h2>

      <div className="bg-base-200 rounded-xl shadow-lg p-8 max-w-2xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          {/* Profile Picture */}
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  user?.photo ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(
                      user?.displayName || user?.name || "User"
                    ) +
                    "&size=128&background=random"
                }
                alt={user?.displayName || user?.name}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">
              {user?.displayName || user?.name || "User"}
            </h3>
            <p className="text-gray-600 mb-3">{user?.email}</p>
            <span
              className={`badge ${getRoleBadgeColor(
                user?.role
              )} badge-lg capitalize`}
            >
              {user?.role || "Student"}
            </span>
          </div>
        </div>

        <div className="divider"></div>

        {/* Detailed Information */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold mb-4">Account Information</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="input input-bordered flex items-center">
                {user?.displayName || user?.name || "N/A"}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="input input-bordered flex items-center">
                {user?.email || "N/A"}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">User Role</span>
              </label>
              <div className="input input-bordered flex items-center capitalize">
                {user?.role || "Student"}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Account Created
                </span>
              </label>
              <div className="input input-bordered flex items-center">
                {formatDate(user?.createdAt || user?.metadata?.creationTime)}
              </div>
            </div>
          </div>

          {/* Firebase UID (for debugging) */}
          {user?.uid && (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">User ID</span>
              </label>
              <div className="input input-bordered flex items-center text-xs text-gray-500">
                {user.uid}
              </div>
            </div>
          )}
        </div>

        <div className="divider"></div>

        {/* Role-specific information */}
        <div className="bg-base-100 rounded-lg p-4">
          <h5 className="font-semibold mb-2">Role Permissions</h5>
          {user?.role?.toLowerCase() === "admin" && (
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Manage all users and roles</li>
              <li>Add, edit, and delete scholarships</li>
              <li>View analytics and platform statistics</li>
              <li>Full access to all features</li>
            </ul>
          )}
          {user?.role?.toLowerCase() === "moderator" && (
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Manage student applications</li>
              <li>Provide feedback on applications</li>
              <li>Manage and moderate reviews</li>
              <li>Update application statuses</li>
            </ul>
          )}
          {(user?.role?.toLowerCase() === "student" || !user?.role) && (
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Browse and search scholarships</li>
              <li>Apply for scholarships</li>
              <li>Track application status</li>
              <li>Leave reviews for scholarships</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
