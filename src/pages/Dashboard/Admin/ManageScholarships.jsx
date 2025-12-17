import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PiPencilSimple, PiTrash } from "react-icons/pi";
import { useForm } from "react-hook-form";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships?limit=100"); // Fetch mostly all for management
      return res.data.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const handleEditClick = (scholarship) => {
    setSelectedScholarship(scholarship);
    setValue("scholarshipName", scholarship.scholarshipName);
    setValue("universityName", scholarship.universityName);
    setValue("universityCountry", scholarship.universityCountry);
    setValue("universityCity", scholarship.universityCity);
    setValue("worldRank", scholarship.worldRank);
    setValue("subjectCategory", scholarship.subjectCategory);
    setValue("scholarshipCategory", scholarship.scholarshipCategory);
    setValue("degree", scholarship.degree);
    setValue("tuitionFees", scholarship.tuitionFees);
    setValue("applicationFees", scholarship.applicationFees);
    setValue("serviceCharge", scholarship.serviceCharge);
    setValue("applicationDeadline", scholarship.applicationDeadline);
    document.getElementById("edit_scholarship_modal").showModal();
  };

  const handleUpdate = (data) => {
    if (!selectedScholarship) return;

    const updatedData = {
      ...data,
      applicationFees: parseFloat(data.applicationFees),
      serviceCharge: parseFloat(data.serviceCharge),
      tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : 0,
      worldRank: parseInt(data.worldRank),
    };

    axiosSecure
      .patch(`/scholarships/${selectedScholarship._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Scholarship updated successfully!", "success");
          document.getElementById("edit_scholarship_modal").close();
          refetch();
        } else {
          Swal.fire("Info", "No changes made.", "info");
          document.getElementById("edit_scholarship_modal").close();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to update.", "error");
      });
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-6">
          Manage Scholarships ({scholarships.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Scholarship Name</th>
                <th>University</th>
                <th>Category</th>
                <th>Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="font-bold">{item.scholarshipName}</div>
                  </td>
                  <td>
                    <div>{item.universityName}</div>
                    <div className="text-xs opacity-50">
                      {item.universityCountry}
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-ghost badge-sm">
                      {item.scholarshipCategory}
                    </div>
                    <div className="text-xs mt-1">{item.subjectCategory}</div>
                  </td>
                  <td>${item.applicationFees}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Update"
                    >
                      <PiPencilSimple className="text-lg text-warning" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Delete"
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

      {/* Edit Modal */}
      <dialog id="edit_scholarship_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Update Scholarship</h3>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("scholarshipName", { required: true })}
                className="input input-bordered"
              />
            </div>
            {/* University */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">University</span>
              </label>
              <input
                type="text"
                {...register("universityName", { required: true })}
                className="input input-bordered"
              />
            </div>
            {/* Country */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                type="text"
                {...register("universityCountry", { required: true })}
                className="input input-bordered"
              />
            </div>
            {/* City */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                {...register("universityCity", { required: true })}
                className="input input-bordered"
              />
            </div>
            {/* Rank */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rank</span>
              </label>
              <input
                type="number"
                {...register("worldRank", { required: true })}
                className="input input-bordered"
              />
            </div>
            {/* Subject */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <select
                {...register("subjectCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
                <option value="Arts">Arts</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
              </select>
            </div>
            {/* Scholarship Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                {...register("scholarshipCategory", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="Full Fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self Fund">Self Fund</option>
              </select>
            </div>
            {/* Degree */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Degree</span>
              </label>
              <select
                {...register("degree", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>
            {/* Fees */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">App Fees</span>
              </label>
              <input
                type="number"
                {...register("applicationFees", { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Charge</span>
              </label>
              <input
                type="number"
                {...register("serviceCharge", { required: true })}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tuition</span>
              </label>
              <input
                type="number"
                {...register("tuitionFees")}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <input
                type="date"
                {...register("applicationDeadline", { required: true })}
                className="input input-bordered"
              />
            </div>

            <div className="form-control mt-6 col-span-1 md:col-span-2">
              <button type="submit" className="btn btn-primary">
                Update Details
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;
