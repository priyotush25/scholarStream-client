// Loading spinner component
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
