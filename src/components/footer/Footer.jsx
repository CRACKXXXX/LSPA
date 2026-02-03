import React from 'react';
import logo from '../../assets/lspa-logo.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem'}}>
                <img src={logo} alt="LSPA" style={{height:'60px', borderRadius:'50%', border:'2px solid var(--primary-color)'}} />
                <span className="footer-logo" style={{margin:0}}>LSPA</span>
            </div>
            <p>&copy; 2026 Los Santos Performance Analyzer.</p>
            <div className="legal-text" style={{display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'center'}}>
                <a href="/privacy-policy">Política de Privacidad</a>
                <span>|</span>
                <a href="/cookies-policy">Cookies</a>
                <span>|</span>
                <a href="/terms-of-sale">Condiciones de Venta</a>
                <span>|</span>
                <a href="/guide-faq">Guía / FAQ</a>
            </div>
        </div>
        
        <div className="footer-links-section">
            <div className="footer-column">
                <h4>Navegación</h4>
                <a href="/">Inicio</a>
                <a href="/garage">Mi Garaje</a>
                <a href="/analytics">Análisis</a>
                <a href="/location">Ubicación</a>
            </div>
            <div className="footer-column">
                <h4>Zona Gaming</h4>
                <a href="/versus-mode">Versus Mode</a>
                <a href="/minigames/guess">Adivina el Coche</a>
                <a href="/minigames/battle">Batalla de Cartas</a>
                <a href="/minigames/higher-lower">Hi-Lo</a>
            </div>
            <div className="footer-column">
                <h4>Proyecto</h4>
                <a href="https://github.com/CRACKXXXX/LSPA" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
            </div>
            <div className="footer-column social-icons">
                <h4>Síguenos</h4>
                <div className="social-links-text">
                    <a href="https://twitter.com/RockstarGames" target="_blank" rel="noopener noreferrer" className="social-text twitter">TWITTER</a>
                    <a href="https://www.instagram.com/rockstargames" target="_blank" rel="noopener noreferrer" className="social-text instagram">INSTAGRAM</a>
                    <a href="https://www.youtube.com/rockstargames" target="_blank" rel="noopener noreferrer" className="social-text youtube">YOUTUBE</a>
                    <a href="https://discord.gg/rockstargames" target="_blank" rel="noopener noreferrer" className="social-text discord">DISCORD</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
