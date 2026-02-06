
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/lspa-logo.jpg';
import './Header.css';

import { useGarage } from '../../context/GarageContext';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false); // Dropdown state
    const { garageIds } = useGarage(); 
    const count = garageIds.length;
    const { user, logout, isAdmin } = useAuth(); // Destructure logout and isAdmin
    const { level } = useGamification();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
        setUserMenuOpen(false);
        closeMenu();
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    const handleAuthClick = () => {
        if (user) {
            navigate('/profile');
        } else {
            navigate('/auth');
        }
        closeMenu();
    };

    return (
        <header className="header-container"> {/* Reverted to original class name */}
            <div className="logo-section"> {/* Reverted to original class name */}
                <img src={logo} alt="LSPA Logo" className="app-logo" /> {/* Reverted to original logo */}
                <h1>LSPA</h1> {/* Reverted to original h1 */}
            </div>

            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu"> {/* Reverted to original menu toggle */}
                <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
            </button>

            <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}> {/* Reverted to original class name */}
                <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}> {/* Reverted to original path */}
                    <span>Inicio</span>
                </NavLink>

                <NavLink to="/garage" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link garage-link active' : 'nav-link garage-link')}> {/* Reverted to original class name */}
                    <span>Garaje</span>
                    {count > 0 && <span className="garage-badge">{count}</span>}
                </NavLink>

                <NavLink to="/analytics" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                    <span>Análisis</span>
                </NavLink>
                
                <NavLink 
                    to="/location" 
                    onClick={closeMenu}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                    Ubicación
                </NavLink>

                <div className="nav-group">
                    <span className="nav-group-label">GAMES:</span>
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
                        <NavLink to="/minigames/higher-lower" onClick={closeMenu} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                            Hi-Lo
                        </NavLink>
                    </div>
                </div>

                {/* USER SECTION IN NAV */}
                <div className="auth-nav-item" style={{position: 'relative', marginLeft: '1rem'}}>
                    {user ? (
                        <div 
                            className="user-menu-trigger" 
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}}
                        >
                            <img src={user.avatar} alt="User" style={{width: '32px', height: '32px', borderRadius: '50%', border: '2px solid var(--accent-color)'}} />
                            <span style={{fontWeight: 'bold', color: 'var(--accent-color)'}}>{level}</span>
                            
                            {userMenuOpen && (
                                <div className="user-dropdown-menu" style={{
                                    position: 'absolute',
                                    top: '120%',
                                    right: 0,
                                    background: 'rgba(18, 18, 24, 0.95)',
                                    border: '1px solid var(--text-muted)',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    minWidth: '120px',
                                    zIndex: 1000,
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                                }}>
                                    {/* Admin Link */}
                                    {isAdmin && (
                                        <button onClick={() => navigate('/admin')} style={{background:'none', border:'none', color:'#00F0FF', textAlign:'left', padding:'0.5rem', cursor:'pointer', fontWeight:'bold', borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                                            PANEL ADMIN
                                        </button>
                                    )}

                                    <button onClick={() => navigate('/crews')} style={{background:'none', border:'none', color:'white', textAlign:'left', padding:'0.5rem', cursor:'pointer', fontWeight:'bold'}}>CREWS</button>
                                    <button onClick={() => navigate('/profile')} style={{background:'none', border:'none', color:'white', textAlign:'left', padding:'0.5rem', cursor:'pointer', fontWeight:'bold'}}>PERFIL</button>
                                    <button onClick={handleLogout} style={{background:'none', border:'none', color:'#ff4444', textAlign:'left', padding:'0.5rem', cursor:'pointer', fontWeight:'bold', borderTop:'1px solid rgba(255,255,255,0.1)'}}>LOGOUT</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="nav-link" onClick={() => navigate('/auth')} style={{color: 'var(--accent-color)', cursor: 'pointer'}}>LOGIN</span>
                    )}
                </div>
            </nav>
            
            {menuOpen && <div className="menu-backdrop" onClick={closeMenu}></div>}
        </header>
    );
};

Header.propTypes = {};

export default Header;
