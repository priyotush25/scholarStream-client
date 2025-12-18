import React from "react";

const CardSkeleton = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl border border-gray-100">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200 animate-pulse rounded-t-2xl"></div>

      <div className="card-body space-y-4">
        {/* Title and Badge Skeleton */}
        <div className="flex justify-between items-start">
          <div className="h-6 w-3/5 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-5 w-1/4 bg-gray-200 animate-pulse rounded-full"></div>
        </div>

        {/* Location Skeleton */}
        <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>

        {/* Details Skeleton (Subject, Fees, Date, Rating) */}
        <div className="space-y-2 mt-4">
          <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="card-actions justify-end mt-4">
          <div className="h-8 w-24 bg-blue-200 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
