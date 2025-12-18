import React from "react";

const UniqueLoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="relative flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    </div>
  );
};

export default UniqueLoadingSpinner;
