import React from 'react';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <button className="navbar-button">New Chat</button>
            <img src={require('../../assets/company-logo.png')} alt="PolicyHub Logo" style={{ width: '250px', margin: '2rem 0' }} />
            <button className="navbar-button">Logout</button>
        </nav>
    );
};

export default NavBar;