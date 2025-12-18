import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaUniversity,
  FaGraduationCap,
  FaDollarSign,
  FaCalendar,
} from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const { transactionId, amount, scholarshipName, universityName } =
    location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <FaCheckCircle className="w-16 h-16 text-white" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3 text-center">
          Payment Successful! 🎉
        </h1>
        <p className="text-gray-600 mb-8 text-center text-lg">
          Your scholarship application has been submitted successfully.
        </p>

        {/* Transaction Details */}
        {transactionId && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
            <p className="font-mono text-sm font-semibold text-blue-600 break-all">
              {transactionId}
            </p>
          </div>
        )}

        {/* Scholarship Details Card */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-6 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4 text-xl flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" />
            Scholarship Details
          </h3>
          <div className="space-y-3">
            {scholarshipName && (
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
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
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
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
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Application Fees Paid</p>
                  <p className="font-semibold text-green-600 text-xl">
                    ${amount}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-green-200">
          <h3 className="font-semibold text-gray-800 mb-4 text-lg">
            Application Status
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Application Status</p>
              <span className="badge badge-warning badge-lg">
                Pending Review
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Status</p>
              <span className="badge badge-success badge-lg">Paid</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Link
            to="/dashboard/my-applications"
            className="btn btn-primary w-full btn-lg"
          >
            View My Applications
          </Link>
          <Link to="/scholarships" className="btn btn-outline w-full">
            Browse More Scholarships
          </Link>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-800 text-center">
            📧 You will receive updates about your application via email.
            <br />
            Check your dashboard regularly for application status updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
