import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  PiEye,
  PiPencilSimple,
  PiTrash,
  PiCreditCard,
  PiStar,
} from "react-icons/pi";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch Applications
  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied-scholarships/${user.email}`);
      return res.data;
    },
  });
console.log(applications);

  // Delete Application
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
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Your application has been deleted.",
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  // Review Handler
  const handleReviewSubmit = (data) => {
    if (!selectedApp) return;

    const reviewData = {
      scholarshipId: selectedApp.scholarshipId,
      universityName: selectedApp.universityName,
      universityId: selectedApp.universityId, // If available, otherwise omit
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: parseInt(data.rating),
      reviewComment: data.comment,
      applicationId: selectedApp._id,
    };

    axiosSecure
      .post("/reviews", reviewData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire("Success", "Review added successfully!", "success");
          document.getElementById("review_modal").close();
          reset();
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Something went wrong.", "error");
      });
  };

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    document.getElementById("details_modal").showModal();
  };

  const openReviewModal = (app) => {
    setSelectedApp(app);
    document.getElementById("review_modal").showModal();
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
          My Applications ({applications.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th>University Name</th>
                <th>Category</th>
                <th>Fees</th>
                <th>Application Status</th>
                <th>Payment Status</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="text-center">
                  <td>
                    <div className="font-bold text-left items-center">{app.universityName}</div>
                    <div className="text-sm opacity-50">
                      {app.universityCountry}
                    </div>
                  </td>
                  <td>{app.scholarshipCategory}</td>
                  <td>${app.applicationFees}</td>
                  <td>
                    <div
                      className={`badge ${
                        app.applicationStatus === "approved" ||
                        app.applicationStatus === "completed"
                          ? "badge-success"
                          : app.applicationStatus === "processing"
                          ? "badge-info"
                          : app.applicationStatus === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      } gap-2 capitalize`}
                    >
                      {app.applicationStatus}
                    </div>
                  </td>
                  <td
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {app.paymentStatus}
                  </td>

                  <td>
                    {app.feedback ? (
                      <span
                        className="text-xs italic text-info"
                        title={app.feedback}
                      >
                        {app.feedback.substring(0, 20)}...
                      </span>
                    ) : (
                      <span className="text-xs opacity-50">N/A</span>
                    )}
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => openDetailsModal(app)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Details"
                    >
                      <PiEye className="text-lg" />
                    </button>

                    {(!app.applicationStatus ||
                      app.applicationStatus === "pending") && (
                      <>
                        <Link
                          to={`/dashboard/edit-application/${app._id}`}
                          className="btn btn-ghost btn-xs tooltip"
                          data-tip="Edit"
                        >
                          <PiPencilSimple className="text-lg text-warning" />
                        </Link>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="btn btn-ghost btn-xs tooltip"
                          data-tip="Delete"
                        >
                          <PiTrash className="text-lg text-error" />
                        </button>
                        {/* Only allow pay if unpaid logic? Assuming applicationFees > 0 implies payment needed usually, but logic says pending + unpaid */}
                        {app.paymentStatus === "unpaid" && (
                          <button
                            className="btn btn-ghost btn-xs tooltip"
                            data-tip="Pay"
                          >
                            <PiCreditCard className="text-lg text-success" />
                          </button>
                        )}
                      </>
                    )}

                    {app.applicationStatus === "completed" && (
                      <button
                        onClick={() => openReviewModal(app)}
                        className="btn btn-ghost btn-xs tooltip"
                        data-tip="Add Review"
                      >
                        <PiStar className="text-lg text-yellow-500" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Application Details</h3>
          {selectedApp && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>University:</strong> {selectedApp.universityName}
                </p>
                <p>
                  <strong>Degree:</strong> {selectedApp.degree}
                </p>
                <p>
                  <strong>Category:</strong> {selectedApp.scholarshipCategory}
                </p>
              </div>
              <div>
                <p>
                  <strong>Applicant Name:</strong> {selectedApp.userName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedApp.userEmail}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {dayjs(selectedApp.applicationDate).format("DD MMMM YYYY")}
                </p>
              </div>
              <div className="col-span-2 mt-4">
                <p>
                  <strong>Application Status:</strong>{" "}
                  <span className="capitalize">
                    {selectedApp.applicationStatus || "pending"}
                  </span>
                </p>
                <p className="mt-2">
                  <strong>Moderator Feedback:</strong>
                </p>
                <div className="bg-base-200 p-3 rounded-md min-h-[60px]">
                  {selectedApp.feedback || "No feedback yet."}
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Rate & Review</h3>
          <form onSubmit={handleSubmit(handleReviewSubmit)}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text">Rating (1-5)</span>
              </label>
              <input
                type="number"
                placeholder="5"
                {...register("rating", { required: true, min: 1, max: 5 })}
                className="input input-bordered w-full"
              />
              {errors.rating && (
                <span className="text-error text-sm">
                  Rating is required (1-5)
                </span>
              )}
            </div>
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                {...register("comment", { required: true })}
                className="textarea textarea-bordered h-24"
                placeholder="Share your experience..."
              ></textarea>
              {errors.comment && (
                <span className="text-error text-sm">Comment is required</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Submit Review
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
