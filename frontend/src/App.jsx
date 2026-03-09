import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import ErrorPage from './components/Error/ErrorPage';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/error" element={<ErrorPage />} />
      {/* Catch-all → error page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
