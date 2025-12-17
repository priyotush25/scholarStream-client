import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PiTrash, PiStarFill } from "react-icons/pi";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-reviews");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Review has been removed.", "success");
            refetch();
          }
        });
      }
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
          All Reviews ({reviews.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>University</th>
                <th>Reviewer</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    <div className="font-bold">{review.universityName}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-8 h-8">
                          <img src={review.userImage} alt={review.userName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{review.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="max-w-xs truncate"
                      title={review.reviewComment}
                    >
                      {review.reviewComment}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <PiStarFill className="text-yellow-500" />
                      <span>{review.ratingPoint}</span>
                    </div>
                  </td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Delete Review"
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

export default AllReviews;
