import React from 'react';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <button className="navbar-button" type="button">New Chat</button>
      <h2 className="navbar-title">PolicyHub</h2>
      <button className="navbar-button" type="button">Logout</button>
    </nav>
  );
}
