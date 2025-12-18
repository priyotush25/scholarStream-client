import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ScholarshipCard = ({ scholarship, hasApplied = false, reviews = [] }) => {
  const {
    _id,
    universityName,
    universityImage,
    scholarshipCategory,
    universityCountry,
    universityCity,
    applicationFees,
    subjectCategory,
    applicationDeadline,
  } = scholarship;

  // Calculate average rating from reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.ratingPoint, 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  const reviewCount = reviews.length;

  return (
    <div
      className={`card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ${
        hasApplied ? "border-2 border-success" : ""
      }`}
    >
      <figure className="relative">
        <img
          src={universityImage}
          alt={universityName}
          className="h-48 w-full object-cover"
        />
        {hasApplied && (
          <div className="absolute top-2 right-2 badge badge-success badge-lg gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Already Applied
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {universityName}
          <div className="badge badge-secondary">{scholarshipCategory}</div>
        </h2>
        <p className="text-sm text-gray-500">
          {universityCity}, {universityCountry}
        </p>
        <div className="flex flex-col gap-1 my-2">
          <p>
            <strong>Subject:</strong> {subjectCategory}
          </p>
          <p>
            <strong>App Fees:</strong> ${applicationFees}
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            {new Date(applicationDeadline).toLocaleDateString()}
          </p>

          {/* Student Reviews and Rating */}
          <div className="flex items-center gap-2 mt-2">
            {reviewCount > 0 ? (
              <>
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-lg" />
                  <span className="font-bold text-gray-800">
                    {averageRating}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-500 italic">
                No reviews yet
              </span>
            )}
          </div>
        </div>
        <div className="card-actions justify-end">
          <Link
            to={`/scholarship/${_id}`}
            className={`btn btn-sm ${
              hasApplied ? "btn-outline btn-success" : "btn-primary"
            }`}
          >
            {hasApplied ? "View Status" : "Details"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
