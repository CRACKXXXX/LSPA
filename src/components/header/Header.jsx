import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logo} alt="LSPA Logo" className="header-logo" />
        <span>LSPA <span style={{ color: 'var(--text-main)', fontSize: '0.8em' }}>Telemetría</span></span>
      </div>

      <nav className="nav-menu">
        <NavLink 
          to="/home" 
          className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
        >
          Gallery
        </NavLink>
        <NavLink 
          to="/analyzer" 
          className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
        >
          Analyzer
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
