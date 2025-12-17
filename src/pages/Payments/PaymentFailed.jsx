import React from 'react';
import { Link } from 'react-router';
import { PiWarningCircleFill } from 'react-icons/pi';

const PaymentFailed = () => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-200 shadow-xl border border-error/20">
                <div className="card-body text-center">
                    <div className="flex justify-center mb-4">
                        <PiWarningCircleFill className="text-6xl text-error" />
                    </div>

                    <h2 className="text-3xl font-bold text-error mb-2">Payment Failed</h2>
                    <p className="text-base-content/70 mb-8">
                        We were unable to process your payment. The transaction was cancelled or declined.
                    </p>

                    <div className="bg-error/10 rounded-lg p-4 mb-8">
                        <p className="text-sm text-error font-medium">
                            No charges have been made to your account.
                        </p>
                    </div>

                    <div className="card-actions justify-center space-y-3">
                        <Link to="/dashboard" className="btn btn-primary btn-wide">
                            Return to Dashboard
                        </Link>
                        <Link to="/all-scholarships" className="btn btn-ghost btn-sm">
                            Browse Scholarships
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;
