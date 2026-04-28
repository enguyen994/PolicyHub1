import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="text-center">
                <MdError
                    aria-hidden="true"
                    style={{ fontSize: '5.25rem', color: '#000000ff' }}
                />
                <h1 className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</h1>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="not-found-button"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
