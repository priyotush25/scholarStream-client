import React from 'react';
import { Link } from 'react-router';
import { PiSmileySad } from 'react-icons/pi';

const Error = () => {
    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <PiSmileySad className="text-9xl text-base-content/20" />
                </div>
                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-4">Oops! Page not found</h2>
                <p className="text-lg text-base-content/70 mb-8 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="btn btn-primary btn-lg">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default Error;