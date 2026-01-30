import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
            <span className="footer-logo">LSPA</span>
            <p>&copy; 2026 Los Santos Performance Analyzer.</p>
            <p className="legal-text">Todos los derechos reservados | Política de Privacidad | Cookies | Condiciones de Venta</p>
        </div>
        
        <div className="footer-links-section">
            <div className="footer-column">
                <h4>Navegación</h4>
                <a href="/home">Inicio</a>
                <a href="/versus-mode">Versus</a>
                <a href="/location">Ubicación</a>
            </div>
            <div className="footer-column">
                <h4>Proyecto</h4>
                <a href="https://github.com/Crackorb" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
                <a href="https://figma.com" target="_blank" rel="noopener noreferrer">Diseño Figma</a>
                <a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet Maps</a>
            </div>
            <div className="footer-column social-icons">
                <h4>Síguenos</h4>
                <div className="icons-row">
                    <a href="#" className="social-icon" title="Twitter">🐦</a>
                    <a href="#" className="social-icon" title="Instagram">📸</a>
                    <a href="#" className="social-icon" title="Discord">💬</a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
