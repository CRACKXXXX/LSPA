import React from 'react';
import { NavLink } from 'react-router-dom';
import { ACTIVITY } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-section">
        {/* Simple Logo using Lucide Icon and Text */}
        <ACTIVITY size={32} color="var(--primary-neon)" />
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
