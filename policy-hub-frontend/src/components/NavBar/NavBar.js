import React from 'react';
import './NavBar.css';
import { logout } from '../../api/logout';
import { FaSignOutAlt } from 'react-icons/fa';

const NavBar = () => {
    return (
        <nav className="navbar">
            <img src={require('../../assets/company-logo.png')} alt="PolicyHub Logo" style={{ width: '180px', margin: '2rem 0', cursor: 'pointer' }} onClick={() => { window.location.href = '/dashboard'; }} />
            <button className="navbar-button" onClick={logout}>
                <span>Sign Out</span>
                <FaSignOutAlt aria-hidden="true" />
            </button>
        </nav>
    );
};

export default NavBar;