import React from 'react';
import { useLocation } from 'react-router-dom';
import './Login.css';
import { getApiBaseUrl } from '../../api/config';
const Login = () => {
  const location = useLocation();
  const messages = location.state?.messages || [];

  return (
    <div>
      <div className="login-container">
        {/* Header / branding stays exactly in your JS design */}
        <img
          src={require('../../assets/company-logo.png')}
          alt="Company Logo"
          className="company-logo"
        />
        <h1 className="login-heading">Welcome to PolicyHub!👋</h1>
        <p className="login-subheading">An internal search engine for Lewer!</p>

        {/* Flash messages logic replicated from .jsx */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.category === 'error'
                ? 'mb-4 p-4 rounded-lg bg-red-100 text-red-700 border border-red-300'
                : 'mb-4 p-4 rounded-lg bg-green-100 text-green-700 border border-green-300'
            }
          >
            {msg.message}
          </div>
        ))}

        {/* Existing button aesthetics preserved */}
        <button
          className="ms-button"
          type="button"
          onClick={() => { window.location.href = `${getApiBaseUrl()}/auth/microsoft`; }}
        >
          <span>Sign in with Microsoft</span>
          <span className="ms-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#F25022" d="M1 1h10v10H1z" />
              <path fill="#7FBA00" d="M13 1h10v10H13z" />
              <path fill="#00A4EF" d="M1 13h10v10H1z" />
              <path fill="#FFB900" d="M13 13h10v10H13z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;