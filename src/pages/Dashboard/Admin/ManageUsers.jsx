import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PiTrash, PiUserCheck, PiUserGear, PiUserList, PiUserSwitch } from "react-icons/pi";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth()
  const [filterRole, setFilterRole] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const handleRoleChange = (id, newRole) => {
    axiosSecure
      .patch(`/users/${id}/role`, { role: newRole })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", `User role updated to ${newRole}!`, "success");
          refetch();
        }
      })
      .catch(() => Swal.fire("Error", "Failed to update role.", "error"));
  };

  const filteredUsers = filterRole
    ? users.filter((u) => u.role === filterRole)
    : users;

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title text-2xl">
            Manage Users ({filteredUsers.length})
          </h2>
          <select
            className="select select-bordered"
            onChange={(e) => setFilterRole(e.target.value)}
            value={filterRole}
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="overflow-x-auto">
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
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>
                    <div
                      className={`badge ${
                        user.role === "admin" || user.role === "super-admin"
                          ? "badge-primary"
                          : user.role === "moderator"
                          ? "badge-secondary"
                          : "badge-ghost"
                      } capitalize`}
                    >
                      {user.role}
                    </div>
                  </td>
                  <td
                    className={`flex gap-2 items-center flex-wrap ${
                      user.role === "super-admin" && "hidden"
                    }`}
                  >
                    {/* Simplified Actions with Dropdown or Buttons */}
                    {user.email === currentUser.email ? (
                      <button
                        onClick={() =>
                          toast.error(
                            "Cannot change own-self, Please contact admin"
                          )
                        }
                        className="btn btn-ghost btn-xs text-warning"
                      >
                        <PiUserCheck />
                      </button>
                    ) : (
                      <div className="dropdown dropdown-left dropdown-hover ">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-xs"
                        >
                          <PiUserSwitch className="text-lg" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "student")
                              }
                            >
                              Make Student
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "moderator")
                              }
                            >
                              Make Moderator
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, "admin")
                              }
                            >
                              Make Admin
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={() => handleDelete(user._id)}
                      className='btn btn-ghost btn-xs tooltip'
                      data-tip="Delete User"
                    >
                      <PiTrash className="text-lg text-error" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;

