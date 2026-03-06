import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function LoginPage() {
  const location = useLocation();
  const messages = location.state?.messages || []; // [{category, message}]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">PolicyHub</h1>
          </div>
          <p className="text-gray-600">Sign in to access company policies</p>
        </div>

        {/* Flash Messages */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-4 p-4 rounded-lg ${
              msg.category === 'error'
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}
          >
            {msg.message}
          </div>
        ))}

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <a
            href="/auth/microsoft"
            className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 21 21">
              <rect x="1" y="1" width="9" height="9" fill="#f25022" />
              <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
              <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
              <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
            </svg>
            Sign in with Microsoft
          </a>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; 2024 PolicyHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
