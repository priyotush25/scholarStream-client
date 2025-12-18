import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import TableSkeleton from "../../../components/common/TableSkeleton";
import {
  FaInfoCircle,
  FaComments,
  FaBolt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [detailsApp, setDetailsApp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchApplications = () => {
    setLoading(true);
    axios
      .get("/applications/all")
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = (id, status) => {
    axios
      .patch(`/applications/feedback/${id}`, { status })
      .then((res) => {
        if (res.data) {
          alert("Status updated successfully");
          fetchApplications();
        }
      })
      .catch((err) => {
        console.error("Status update failed:", err);
        alert("Failed to update status");
      });
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this application?")) {
      handleStatusUpdate(id, "rejected");
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/applications/feedback/${selectedApp._id}`, { feedback })
      .then((res) => {
        if (res.data) {
          alert("Feedback added successfully");
          setFeedback("");
          setSelectedApp(null);
          fetchApplications();
          document.getElementById("feedback_modal").close();
        }
      })
      .catch((err) => {
        console.error("Feedback submit failed:", err);
        alert("Failed to add feedback");
      });
  };

  // if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Applications
        </h2>
        <p className="text-gray-600">
          Review and process scholarship applications
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
        {loading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : (
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Applicant
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Scholarship
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Payment
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Feedback
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app._id}
                  className={`border-b border-gray-100 hover:bg-indigo-50 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="py-5 px-6">
                    <div className="font-semibold text-gray-800">
                      {app.userName}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {app.userEmail}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="font-semibold text-gray-800">
                      {app.universityName}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {app.scholarshipName}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`badge badge-lg font-medium ${
                        app.applicationStatus === "completed"
                          ? "badge-success"
                          : app.applicationStatus === "rejected"
                          ? "badge-error"
                          : app.applicationStatus === "processing"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {app.applicationStatus}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`badge badge-lg font-medium ${
                        app.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="max-w-xs">
                      {app.feedback ? (
                        <div
                          className="tooltip tooltip-left"
                          data-tip={app.feedback}
                        >
                          <span className="text-sm text-gray-700 line-clamp-2">
                            {app.feedback}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic">
                          No feedback
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap gap-2">
                      {/* Details Button */}
                      <button
                        onClick={() => {
                          setDetailsApp(app);
                          document.getElementById("details_modal").showModal();
                        }}
                        className="btn btn-sm btn-info text-white"
                      >
                        <FaInfoCircle className="mr-1" />
                        Details
                      </button>

                      {/* Feedback Button */}
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setFeedback(app.feedback || "");
                          document.getElementById("feedback_modal").showModal();
                        }}
                        className="btn btn-sm btn-secondary text-white"
                      >
                        <FaComments className="mr-1" />
                        Feedback
                      </button>

                      {/* Status Update Buttons */}
                      {app.applicationStatus === "pending" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "processing")
                          }
                          className="btn btn-sm btn-primary text-white"
                        >
                          <FaBolt className="mr-1" />
                          Process
                        </button>
                      )}
                      {app.applicationStatus === "processing" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(app._id, "completed")
                          }
                          className="btn btn-sm btn-success text-white"
                        >
                          <FaCheckCircle className="mr-1" />
                          Complete
                        </button>
                      )}

                      {/* Reject Button */}
                      {app.applicationStatus !== "rejected" &&
                        app.applicationStatus !== "completed" && (
                          <button
                            onClick={() => handleReject(app._id)}
                            className="btn btn-sm btn-error text-white"
                          >
                            <FaTimesCircle className="mr-1" />
                            Reject
                          </button>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Feedback for {selectedApp?.userName}
                </span>
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="textarea textarea-bordered h-24"
                placeholder="Enter your feedback..."
                required
              ></textarea>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("feedback_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Application Details</h3>
          {detailsApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Applicant Name</p>
                  <p className="font-semibold">{detailsApp.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">{detailsApp.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">University</p>
                  <p className="font-semibold">{detailsApp.universityName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Scholarship</p>
                  <p className="font-semibold">{detailsApp.scholarshipName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Degree</p>
                  <p className="font-semibold">{detailsApp.degree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject Category</p>
                  <p className="font-semibold">
                    {detailsApp.subjectCategory || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Fees</p>
                  <p className="font-semibold">
                    ${detailsApp.applicationFees || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Charge</p>
                  <p className="font-semibold">
                    ${detailsApp.serviceCharge || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Status</p>
                  <span
                    className={`badge ${
                      detailsApp.status === "completed"
                        ? "badge-success"
                        : detailsApp.status === "rejected"
                        ? "badge-error"
                        : detailsApp.status === "processing"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {detailsApp.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <span
                    className={`badge ${
                      detailsApp.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {detailsApp.paymentStatus}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Application Date</p>
                  <p className="font-semibold">
                    {new Date(detailsApp.applicationDate).toLocaleDateString()}
                  </p>
                </div>
                {detailsApp.feedback && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Feedback</p>
                    <p className="font-semibold">{detailsApp.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("details_modal").close()}
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageApplications;
