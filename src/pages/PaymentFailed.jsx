import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTimesCircle,
  FaGraduationCap,
  FaExclamationTriangle,
} from "react-icons/fa";

const PaymentFailed = () => {
  const location = useLocation();
  const { scholarshipName, universityName, amount, errorMessage } =
    location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaTimesCircle className="w-16 h-16 text-white" />
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8 text-center text-lg">
          We couldn't process your payment. Don't worry, your application has
          been saved and you can retry payment anytime.
        </p>

        {/* Scholarship Details (if available) */}
        {(scholarshipName || universityName) && (
          <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-6 mb-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
              <FaGraduationCap className="text-orange-600" />
              Scholarship Details
            </h3>
            <div className="space-y-3">
              {scholarshipName && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Scholarship</p>
                    <p className="font-semibold text-gray-800 text-lg">
                      {scholarshipName}
                    </p>
                  </div>
                </div>
              )}
              {universityName && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">University</p>
                    <p className="font-semibold text-gray-800 text-lg">
                      {universityName}
                    </p>
                  </div>
                </div>
              )}
              {amount && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Application Fees (Unpaid)
                    </p>
                    <p className="font-semibold text-gray-800 text-xl">
                      ${amount}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error Details */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-red-800 mb-3 text-lg flex items-center gap-2">
            <FaExclamationTriangle className="text-red-600" />
            Error Details
          </h3>
          <p className="text-sm text-red-700">
            <strong>Error:</strong>{" "}
            {errorMessage ||
              "Payment could not be completed. Please check your card details and try again."}
          </p>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-yellow-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            Application Status
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Application Status</p>
              <span className="badge badge-warning badge-lg">
                Saved (Pending Payment)
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Status</p>
              <span className="badge badge-error badge-lg">Unpaid</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Link
            to="/dashboard/my-applications"
            className="btn btn-primary w-full btn-lg"
          >
            Return to Dashboard (Retry Payment)
          </Link>
          <Link to="/scholarships" className="btn btn-outline w-full">
            Browse More Scholarships
          </Link>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>✓ Your application has been saved</strong>
            <br />
            Go to "My Applications" and click "Pay Now" to retry payment
            anytime.
            <br />
            <strong>Need Help?</strong> Contact support if you continue to
            experience issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
