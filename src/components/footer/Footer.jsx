import React from 'react';
import { GITHUB, INSTAGRAM, TWITTER, FIgma } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-socials">
        <a href="https://github.com/YourUsername/LSPA" target="_blank" rel="noopener noreferrer" className="social-icon">
          <GITHUB size={24} />
        </a>
        <a href="#" className="social-icon">
          <INSTAGRAM size={24} />
        </a>
        <a href="#" className="social-icon">
          <TWITTER size={24} />
        </a>
      </div>

      <div className="footer-links">
        <a href="/home" className="footer-link">Gallery</a>
        <a href="/analyzer" className="footer-link">Analyzer</a>
        <a href="/contact" className="footer-link">Contact</a>
        <a href="#" className="footer-link">Figma Design</a>
      </div>

      <div className="footer-legal">
        <p>© 2024 LOS SANTOS PERFORMANCE ANALYZER (LSPA). Todos los derechos reservados.</p>
        <p>Política de Privacidad y Cookies | Condiciones de Venta</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.7em' }}>
          Este sitio no está afiliado con Rockstar Games. Creado con fines educativos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
