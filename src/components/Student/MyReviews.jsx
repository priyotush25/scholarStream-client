import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { PiPencilSimple, PiTrash, PiStarFill } from 'react-icons/pi';
import { useForm } from 'react-hook-form';

const MyReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedReview, setSelectedReview] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { data: reviews = [], refetch, isLoading } = useQuery({
        queryKey: ['my-reviews', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user.email}`);
            return res.data;
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your review has been deleted.", "success");
                            refetch();
                        }
                    });
            }
        });
    };

    const handleEditClick = (review) => {
        setSelectedReview(review);
        setValue("ratingPoint", review.ratingPoint);
        setValue("reviewComment", review.reviewComment);
        document.getElementById('edit_review_modal').showModal();
    };

    const handleUpdateReview = (data) => {
        if (!selectedReview) return;

        axiosSecure.patch(`/reviews/${selectedReview._id}`, data)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Success", "Review updated successfully!", "success");
                    document.getElementById('edit_review_modal').close();
                    refetch();
                } else {
                    Swal.fire("Info", "No changes made.", "info");
                    document.getElementById('edit_review_modal').close();
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire("Error", "Failed to update review.", "error");
            });
    };

    if (isLoading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-2xl mb-6">My Reviews ({reviews.length})</h2>
                {reviews.length === 0 ? (
                    <div className="text-center py-10 opacity-60">
                        <p>You haven't written any reviews yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>University</th>
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
                                            <div className="text-xs opacity-50">{review.scholarshipName}</div>
                                        </td>
                                        <td>
                                            <div className="max-w-xs truncate" title={review.reviewComment}>
                                                {review.reviewComment}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <PiStarFill className="text-yellow-500" />
                                                <span>{review.ratingPoint}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="flex gap-2">
                                            <button
                                                onClick={() => handleEditClick(review)}
                                                className="btn btn-ghost btn-xs tooltip"
                                                data-tip="Edit">
                                                <PiPencilSimple className="text-lg text-warning" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="btn btn-ghost btn-xs tooltip"
                                                data-tip="Delete">
                                                <PiTrash className="text-lg text-error" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Review Modal */}
            <dialog id="edit_review_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-4">Edit Review</h3>
                    <form onSubmit={handleSubmit(handleUpdateReview)}>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Rating (1-5)</span>
                            </label>
                            <input
                                type="number"
                                {...register("ratingPoint", { required: true, min: 1, max: 5 })}
                                className="input input-bordered w-full"
                            />
                            {errors.ratingPoint && <span className="text-error text-sm">Rating is required (1-5)</span>}
                        </div>
                        <div className="form-control w-full mb-6">
                            <label className="label">
                                <span className="label-text">Comment</span>
                            </label>
                            <textarea
                                {...register("reviewComment", { required: true })}
                                className="textarea textarea-bordered h-24"
                            ></textarea>
                            {errors.reviewComment && <span className="text-error text-sm">Comment is required</span>}
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Update Review</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;