import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function NotFound() {
    const [searchParams] = useSearchParams();
    const errorCode = searchParams.get('code') || '500';
    const message = searchParams.get('message') || 'An unexpected error occurred';

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300 mb-4">{errorCode}</h1>
                <p className="text-xl text-gray-600 mb-8">{message}</p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Return to Login
                </Link>
            </div>
        </div>
    );
}
