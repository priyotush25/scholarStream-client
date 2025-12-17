import React from 'react';
import { Link } from 'react-router';
import { PiShieldWarning } from 'react-icons/pi';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <PiShieldWarning className="text-9xl text-error/20" />
                </div>
                <h1 className="text-6xl font-bold text-error mb-4">403</h1>
                <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
                <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto">
                    You don't have permission to access this page. If you believe this is an error, please contact support.
                </p>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;