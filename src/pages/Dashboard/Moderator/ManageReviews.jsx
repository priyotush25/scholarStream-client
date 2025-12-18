import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import TableSkeleton from "../../../components/common/TableSkeleton";
import { FaStar, FaTrash } from "react-icons/fa";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);
    axios
      .get("/reviews/all")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      axios
        .delete(`/reviews/${id}`)
        .then((res) => {
          if (res.data) {
            // Immediately remove from UI without reload
            setReviews(reviews.filter((review) => review._id !== id));
            alert("Review deleted successfully");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete review");
        });
    }
  };

  // if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Reviews
        </h2>
        <p className="text-gray-600">Moderate and manage all student reviews</p>
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
            No student reviews have been posted yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-100">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Student
                </th>
                <th className="py-4 px-6 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">
                  Scholarship
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
                    <div className="font-semibold text-gray-800">
                      {review.userName}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {review.userEmail}
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="font-semibold text-gray-800">
                      {review.scholarshipName || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {review.universityName}
                    </div>
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
                        <p className="text-sm text-gray-700 line-clamp-2 italic">
                          "{review.reviewComment}"
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
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash className="mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
