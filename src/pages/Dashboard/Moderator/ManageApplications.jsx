import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PiEye, PiChatText, PiXCircle, PiCheckCircle } from "react-icons/pi";
import { useForm } from "react-hook-form";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const handleStatusUpdate = (id, status) => {
    axiosSecure
      .patch(`/applications/${id}`, { applicationStatus: status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", `Status updated to ${status}!`, "success");
          refetch();
        }
      });
  };

  const handleFeedbackSubmit = (data) => {
    if (!selectedApp) return;

    axiosSecure
      .patch(`/applications/${selectedApp._id}`, { feedback: data.feedback })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Feedback submitted!", "success");
          document.getElementById("feedback_modal").close();
          reset();
          refetch();
        }
      });
  };

  const openDetails = (app) => {
    setSelectedApp(app);
    document.getElementById("app_details_modal").showModal();
  };

  const openFeedback = (app) => {
    setSelectedApp(app);
    document.getElementById("feedback_modal").showModal();
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
          Manage Applications ({applications.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>University</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <div className="font-bold">{app.userName}</div>
                    <div className="text-xs opacity-50">{app.userEmail}</div>
                  </td>
                  <td>{app.universityName}</td>
                  <td>
                    <select
                      className="select select-bordered select-xs"
                      value={app.applicationStatus || "pending"}
                      onChange={(e) =>
                        handleStatusUpdate(app._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    {app.feedback ? (
                      <span className="tooltip" data-tip={app.feedback}>
                        <PiChatText className="text-xl text-info" />
                      </span>
                    ) : (
                      <span className="text-xs opacity-50">None</span>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => openDetails(app)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Details"
                    >
                      <PiEye className="text-lg" />
                    </button>
                    <button
                      onClick={() => openFeedback(app)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Give Feedback"
                    >
                      <PiChatText className="text-lg text-secondary" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, "rejected")}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Reject/Cancel"
                    >
                      <PiXCircle className="text-lg text-error" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <dialog id="app_details_modal" className="modal">
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
                  <strong>Applicant:</strong> {selectedApp.userName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedApp.userEmail}
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
                  <strong>University:</strong> {selectedApp.universityName}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedApp.subjectCategory}
                </p>
                <p>
                  <strong>App Fees:</strong> ${selectedApp.applicationFees}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedApp.applicationDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </dialog>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Give Feedback</h3>
          <form onSubmit={handleSubmit(handleFeedbackSubmit)}>
            <textarea
              {...register("feedback", { required: true })}
              className="textarea textarea-bordered w-full h-32"
              placeholder="Reason for rejection or feedback..."
            ></textarea>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Submit Feedback
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplications;
