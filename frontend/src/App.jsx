import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import Dashboard from './components/Dashboard';

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
