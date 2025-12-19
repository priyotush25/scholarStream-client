import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-50 to-yellow-50 px-4">
      <div className="text-center max-w-lg">
        
        {/* Custom Illustration */}
        <div className="mb-10">
          <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">
            404
          </div>
          <div className="text-5xl mb-4">📚</div>
        </div>

        {/* Custom Error Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Oops! Page Missing
        </h2>
        <p className="text-gray-700 mb-8">
          The scholarship or page you are looking for seems to have vanished.
          No worries, we’ll help you get back on track to your next opportunity.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white rounded-lg font-semibold shadow-md hover:scale-105 transition-transform"
          >
            Back to Home
          </Link>
          <Link
            to="/scholarships"
            className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors"
          >
            Explore Scholarships
          </Link>
        </div>

        {/* Extra Help */}
        <div className="mt-10 text-sm text-gray-500">
          <p>
            Still need help?{" "}
            <Link to="/contact" className="text-red-500 hover:underline">
              Reach Support
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
