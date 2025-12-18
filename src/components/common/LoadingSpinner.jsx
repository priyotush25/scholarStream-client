
import React from "react";

const UniqueLoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="relative flex justify-center items-center">
        {/* Dual-ring spinner */}
        <div className="w-16 h-16 border-4 border-dashed border-blue-400 rounded-full animate-spin"></div>

        {/* Pulsing dots */}
        <div className="absolute flex space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping animation-delay-200"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-ping animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default UniqueLoadingSpinner;
