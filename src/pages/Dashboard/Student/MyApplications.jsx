import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import TableSkeleton from "../../../components/common/TableSkeleton";
import {
  FaFileAlt,
  FaSearch,
  FaInfoCircle,
  FaEdit,
  FaCreditCard,
  FaTrash,
  FaStar,
} from "react-icons/fa";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppForReview, setSelectedAppForReview] = useState(null);
  const [selectedAppForDetails, setSelectedAppForDetails] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const fetchMyApplications = () => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`/applications/user/${user.email}`)
        .then((res) => {
          setApplications(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, [user]);

  const handleAddReview = (e) => {
    e.preventDefault();
    const review = {
      ratingPoint: reviewRating,
      reviewComment: reviewComment,
      reviewDate: new Date(),
      scholarshipId: selectedAppForReview.scholarshipId,
      scholarshipName: selectedAppForReview.scholarshipName,
      universityName: selectedAppForReview.universityName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
    };

    axios
      .post("/reviews", review)
      .then((res) => {
        if (res.data._id) {
          alert("Review added successfully");
          document.getElementById("review_modal").close();
          setReviewRating(5);
          setReviewComment("");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      axios
        .delete(`/applications/${id}`)
        .then((res) => {
          if (res.data) {
            alert("Application deleted successfully");
            fetchMyApplications();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          My Applications
        </h2>
        <p className="text-gray-600">
          Track and manage all your scholarship applications
        </p>
      </div>

      {loading ? (
        <TableSkeleton rows={6} cols={7} />
      ) : applications.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md p-16 text-center">
          <div className="text-7xl mb-6 text-blue-500">
            <FaFileAlt className="mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Applications Yet
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Start your scholarship journey by browsing available opportunities
          </p>
          <Link to="/scholarships" className="btn btn-primary btn-lg px-8">
            <FaSearch className="mr-2" />
            Browse Scholarships
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  University
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Location
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Subject
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Fees
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Status
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
                  className={`border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="py-5 px-6">
                    <div className="font-semibold text-gray-800 text-base">
                      {app.universityName}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {app.scholarshipName}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="text-sm text-gray-700">
                      {app.universityCity || "N/A"}
                      {app.universityCity && app.universityCountry && ", "}
                      {app.universityCountry || ""}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-gray-700">
                      {app.subjectCategory || app.degree}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="font-semibold text-gray-800">
                      ${app.applicationFees || 0}
                    </span>
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
                          No feedback yet
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-wrap gap-2">
                      {/* Details button - always visible */}
                      <button
                        onClick={() => {
                          setSelectedAppForDetails(app);
                          document.getElementById("details_modal").showModal();
                        }}
                        className="btn btn-sm btn-info text-white"
                      >
                        <FaInfoCircle className="mr-1" />
                        Details
                      </button>

                      {/* Edit button - only for pending */}
                      {app.applicationStatus === "pending" && (
                        <Link
                          to={`/dashboard/edit-application/${app._id}`}
                          className="btn btn-sm btn-warning text-white"
                        >
                          <FaEdit className="mr-1" />
                          Edit
                        </Link>
                      )}

                      {/* Pay button - only for pending + unpaid */}
                      {app.applicationStatus === "pending" &&
                        app.paymentStatus === "unpaid" && (
                          <Link
                            to={`/checkout/${app.scholarshipId}`}
                            className="btn btn-sm btn-success text-white"
                          >
                            <FaCreditCard className="mr-1" />
                            Pay Now
                          </Link>
                        )}

                      {/* Delete button - only for pending */}
                      {app.applicationStatus === "pending" && (
                        <button
                          onClick={() => handleDeleteApplication(app._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      )}

                      {/* Add Review button - only for completed */}
                      {app.applicationStatus === "completed" && (
                        <button
                          className="btn btn-sm btn-secondary text-white"
                          onClick={() => {
                            setSelectedAppForReview(app);
                            setReviewRating(5);
                            setReviewComment("");
                            document.getElementById("review_modal").showModal();
                          }}
                        >
                          <FaStar className="mr-1" />
                          Add Review
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Application Details</h3>
          {selectedAppForDetails && (
            <div className="space-y-6">
              {/* University & Scholarship Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">University</p>
                    <p className="font-bold text-lg text-gray-800">
                      {selectedAppForDetails.universityName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location</p>
                    <p className="font-semibold text-gray-700">
                      {selectedAppForDetails.universityCity || "N/A"}
                      {selectedAppForDetails.universityCity &&
                        selectedAppForDetails.universityCountry &&
                        ", "}
                      {selectedAppForDetails.universityCountry || ""}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">
                    Scholarship Program
                  </p>
                  <p className="font-semibold text-gray-800">
                    {selectedAppForDetails.scholarshipName}
                  </p>
                </div>
              </div>

              {/* Academic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Subject Category</p>
                  <p className="font-semibold text-gray-800">
                    {selectedAppForDetails.subjectCategory}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Degree Level</p>
                  <p className="font-semibold text-gray-800">
                    {selectedAppForDetails.degree}
                  </p>
                </div>
              </div>

              {/* Financial Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <p className="text-sm text-green-700 font-semibold mb-2">
                  💰 Financial Details
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Application Fees</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ${selectedAppForDetails.applicationFees}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Charge</p>
                    <p className="text-xl font-semibold text-gray-700">
                      ${selectedAppForDetails.serviceCharge || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Application Status
                  </p>
                  <span
                    className={`badge badge-lg font-medium ${
                      selectedAppForDetails.applicationStatus === "completed"
                        ? "badge-success"
                        : selectedAppForDetails.applicationStatus === "rejected"
                        ? "badge-error"
                        : selectedAppForDetails.applicationStatus ===
                          "processing"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {selectedAppForDetails.applicationStatus}
                  </span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                  <span
                    className={`badge badge-lg font-medium ${
                      selectedAppForDetails.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {selectedAppForDetails.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Feedback Section */}
              {selectedAppForDetails.feedback && (
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
                  <p className="text-sm font-semibold text-blue-700 mb-2">
                    💬 Moderator Feedback
                  </p>
                  <p className="text-gray-700">
                    {selectedAppForDetails.feedback}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="modal-action mt-6 pt-4 border-t">
            <button
              className="btn btn-primary px-8"
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

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box max-w-2xl">
          {/* Modal Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-bold text-2xl text-gray-800">
                Write a Review
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Share your experience with{" "}
                {selectedAppForReview?.scholarshipName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                document.getElementById("review_modal").close();
                setReviewRating(5);
                setReviewComment("");
              }}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          {/* Scholarship Info Card */}
          <div className="bg-base-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {selectedAppForReview?.universityName}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedAppForReview?.scholarshipName}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddReview} className="space-y-6">
            {/* Rating Section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Your Rating
                </span>
              </label>

              {/* Visual Star Rating Display */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-3xl ${
                        star <= reviewRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {reviewRating === 1 && "Poor"}
                  {reviewRating === 2 && "Fair"}
                  {reviewRating === 3 && "Good"}
                  {reviewRating === 4 && "Very Good"}
                  {reviewRating === 5 && "Excellent"}
                </span>
              </div>

              {/* Rating Dropdown */}
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
                className="select select-bordered w-full"
                required
              >
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>

            {/* Comment Section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Your Review
                </span>
                <span className="label-text-alt text-gray-500">
                  {reviewComment.length}/500
                </span>
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setReviewComment(e.target.value);
                  }
                }}
                className="textarea textarea-bordered h-32 text-base"
                placeholder="Share your detailed experience with this scholarship program. What did you like? What could be improved?"
                required
                minLength="10"
              ></textarea>
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Minimum 10 characters
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  document.getElementById("review_modal").close();
                  setReviewRating(5);
                  setReviewComment("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-8"
                disabled={reviewComment.length < 10}
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyApplications;
