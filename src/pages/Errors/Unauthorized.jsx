import React from 'react';
import { Link } from 'react-router';
import { PiLockKey } from 'react-icons/pi';

const Unauthorized = () => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <PiLockKey className="text-9xl text-warning/20" />
                </div>
                <h1 className="text-6xl font-bold text-warning mb-4">401</h1>
                <h2 className="text-3xl font-bold mb-4">Restricted Access</h2>
                <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto">
                    You are unauthorized to access this page. Please go back to continue.
                </p>
                <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;