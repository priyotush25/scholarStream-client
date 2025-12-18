import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (roleFilter === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === roleFilter));
    }
  }, [roleFilter, users]);

  const handleMakeAdmin = (user) => {
    axios
      .patch(`/users/role/${user._id}`, { role: "admin" })
      .then((res) => {
        if (res.data) {
          alert(`${user.name} is an Admin now`);
          fetchUsers();
        }
      })
      .catch((err) => {
        console.error("Make admin failed:", err);
        alert("Failed to make user admin");
      });
  };

  const handleMakeModerator = (user) => {
    axios
      .patch(`/users/role/${user._id}`, { role: "moderator" })
      .then((res) => {
        if (res.data) {
          alert(`${user.name} is a Moderator now`);
          fetchUsers();
        }
      })
      .catch((err) => {
        console.error("Make moderator failed:", err);
        alert("Failed to make user moderator");
      });
  };

  const handleMakeStudent = (user) => {
    axios
      .patch(`/users/role/${user._id}`, { role: "student" })
      .then((res) => {
        if (res.data) {
          alert(`${user.name} is a Student now`);
          fetchUsers();
        }
      })
      .catch((err) => {
        console.error("Make student failed:", err);
        alert("Failed to make user student");
      });
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Delete ${user.name}?`)) {
      axios
        .delete(`/users/${user._id}`)
        .then((res) => {
          if (res.data) {
            alert("User deleted");
            fetchUsers();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Users</h2>

        {/* Role Filter */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Filter by Role:</span>
          </label>
          <select
            className="select select-bordered"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="moderator">Moderators</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={
                            user.photoURL || "https://via.placeholder.com/40"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-error"
                        : user.role === "moderator"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-xs btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== "moderator" && (
                      <button
                        onClick={() => handleMakeModerator(user)}
                        className="btn btn-xs btn-secondary"
                      >
                        Make Moderator
                      </button>
                    )}
                    {user.role !== "student" && (
                      <button
                        onClick={() => handleMakeStudent(user)}
                        className="btn btn-xs btn-accent"
                      >
                        Make Student
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found with role: {roleFilter}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
