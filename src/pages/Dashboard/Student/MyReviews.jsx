import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editReview, setEditReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  const fetchMyReviews = () => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`/reviews/user/${user.email}`)
        .then((res) => {
          setReviews(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, [user]);

  const handleEdit = (review) => {
    setEditReview(review);
    setEditRating(review.ratingPoint);
    setEditComment(review.reviewComment);
    document.getElementById("edit_modal").showModal();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/reviews/${editReview._id}`, {
        ratingPoint: editRating,
        reviewComment: editComment,
      })
      .then((res) => {
        if (res.data) {
          alert("Review updated successfully");
          fetchMyReviews();
          document.getElementById("edit_modal").close();
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      axios
        .delete(`/reviews/${id}`)
        .then((res) => {
          if (res.data) {
            alert("Review deleted successfully");
            fetchMyReviews();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  // if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Reviews</h2>
        <p className="text-gray-600">
          View and manage all your scholarship reviews
        </p>
      </div>

      {loading ? (
        <TableSkeleton rows={6} cols={6} />
      ) : reviews.length === 0 ? (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-md p-16 text-center">
          <div className="text-7xl mb-6 text-yellow-500">
            <FaStar className="mx-auto" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 text-lg">
            Complete your scholarship applications to share your experiences
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Scholarship
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  University
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Rating
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Review
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={review._id}
                  className={`border-b border-gray-100 hover:bg-yellow-50 transition-colors duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  }`}
                >
                  <td className="py-5 px-6">
                    <span className="font-semibold text-gray-800 text-base">
                      {review.scholarshipName || "N/A"}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-gray-700">
                      {review.universityName}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xl ${
                              i < review.ratingPoint
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="font-bold text-gray-700">
                        {review.ratingPoint}/5
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="max-w-md">
                      <div
                        className="tooltip tooltip-left"
                        data-tip={review.reviewComment}
                      >
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {review.reviewComment}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-sm text-gray-600">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="btn btn-sm btn-primary text-white"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Review Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-2xl text-gray-800">
                ✏️ Edit Your Review
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Update your rating and feedback
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById("edit_modal").close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="space-y-6">
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
                        star <= editRating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {editRating === 1 && "Poor"}
                  {editRating === 2 && "Fair"}
                  {editRating === 3 && "Good"}
                  {editRating === 4 && "Very Good"}
                  {editRating === 5 && "Excellent"}
                </span>
              </div>

              {/* Rating Dropdown */}
              <select
                value={editRating}
                onChange={(e) => setEditRating(parseInt(e.target.value))}
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
                  {editComment.length}/500
                </span>
              </label>
              <textarea
                value={editComment}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setEditComment(e.target.value);
                  }
                }}
                className="textarea textarea-bordered h-32 text-base"
                placeholder="Share your updated thoughts about this scholarship..."
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
                onClick={() => document.getElementById("edit_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-8"
                disabled={editComment.length < 10}
              >
                Update Review
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

export default MyReviews;
