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

  // Average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.ratingPoint, 0) / reviews.length
        ).toFixed(1)
      : 0;
  const reviewCount = reviews.length;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 overflow-hidden border border-gray-200">
      <div className="relative">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-52 object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

        {hasApplied && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Applied
          </span>
        )}

        <span className="absolute bottom-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {scholarshipCategory}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-gray-800">{universityName}</h3>
        <p className="text-sm text-gray-500">
          {universityCity}, {universityCountry}
        </p>

        <div className="flex flex-col gap-1 text-sm text-gray-700">
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
        </div>

        {/* Reviews */}
        <div className="flex items-center justify-between mt-2">
          {reviewCount > 0 ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold text-gray-800">{avgRating}</span>
              </div>
              <span className="text-xs text-gray-500">
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 italic">No reviews yet</span>
          )}
          <Link
            to={`/scholarship/${_id}`}
            className={`px-3 py-1 rounded-lg text-sm font-medium shadow-md transition hover:shadow-lg ${
              hasApplied
                ? "border border-green-600 text-green-600 hover:bg-green-50"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
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
