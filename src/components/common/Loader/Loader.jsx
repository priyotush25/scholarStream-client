import React from 'react';

const Loader = () => {
    return (
      <div className="min-h-screen bg-base-100 py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </div>
      </div>
    );
};

export default Loader;