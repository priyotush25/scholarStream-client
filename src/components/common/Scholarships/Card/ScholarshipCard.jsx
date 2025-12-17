import React from "react";
import { Link } from "react-router";

// Card component keys based on your JSON data
const ScholarshipCard = ({ scholarship }) => {
  // Destructuring relevant fields from the scholarship object
  const {
    scholarshipName,
    universityName,
    universityImage,
    scholarshipCategory,
    applicationFees,
    _id: id
  } = scholarship;

  // Function to format the fee display
  const formatFees = (fee) => {
    return fee === 0
      ? "$0 Application Fee"
      : `$${fee.toFixed(2)} Application Fee`;
  };

  return (
    // DaisyUI 'card' component with dark background and hover effect
    // bg-base-200 provides the dark card background seen in your screenshot
    <div className="card bg-base-200 shadow-xl border border-gray-700 hover:shadow-2xl hover:border-primary transition-all duration-300">
      <div className="card-body p-5">
        {/* University Header (Image and Name) */}
        <div className="flex items-center space-x-3 mb-2">
          {/* University Image - Using a placeholder until actual images are linked */}
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  universityImage ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={`${universityName} logo`}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-base-content">
              {universityName}
            </h2>
          </div>
        </div>

        {/* Scholarship Name */}
        <p className="text-lg font-semibold text-gray-300 line-clamp-2 min-h-14">
          {scholarshipName}
        </p>

        {/* Details Section */}
        <div className="mt-2 text-sm text-gray-400 space-y-1">
          <p className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            {scholarshipCategory}
          </p>
          <p className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM12 21c4.418 0 8-3.582 8-8 0-4.418-3.582-8-8-8S4 8.582 4 13c0 4.418 3.582 8 8 8z"
              />
            </svg>
            {formatFees(applicationFees)}
          </p>
        </div>

        {/* Action Button (View Details) */}
        <div className="card-actions justify-start mt-4">
          <Link
            to={`/scholarship-details/${id}`}
            className="btn btn-primary btn-sm normal-case"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
