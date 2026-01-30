import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/lspa-logo.jpg';
import './header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logo} alt="LSPA Logo" className="app-logo" />
        <h1>LSPA</h1>
      </div>
      <nav className="nav-menu">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Inicio
        </NavLink>
        <NavLink 
          to="/versus-mode" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Versus
        </NavLink>
        <NavLink 
          to="/location" 
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Ubicación
        </NavLink>
      </nav>
    </header>
  );
};

Header.propTypes = {};

export default Header;
