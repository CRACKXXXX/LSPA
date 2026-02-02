import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/lspa-logo.jpg';
import './Header.css';

import { useGarage } from '../../context/GarageContext';

const Header = () => {
  const { garageIds } = useGarage();
  const count = garageIds.length;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logo} alt="LSPA Logo" className="app-logo" />
        <h1>LSPA</h1>
      </div>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <NavLink 
          to="/" 
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Inicio
        </NavLink>
        
        <NavLink to="/garage" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link garage-link active' : 'nav-link garage-link')}>
            <span>Garaje</span>
            {count > 0 && <span className="garage-badge">{count}</span>}
        </NavLink>

        <NavLink 
          to="/location" 
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Ubicación
        </NavLink>
        
        <div className="nav-group">
            <span className="nav-group-label">ZONA JUEGOS:</span>
            <div className="nav-group-links">
                <NavLink to="/versus-mode" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Versus
                </NavLink>
                <NavLink to="/minigames/guess" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Adivina
                </NavLink>
                <NavLink to="/minigames/battle" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    Batalla
                </NavLink>
            </div>
        </div>
      </nav>
      
      {isMenuOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
    </header>
  );
};

Header.propTypes = {};

export default Header;
