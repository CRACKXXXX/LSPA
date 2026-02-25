import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RssPage.css';

const RssPage = () => {
    const navigate = useNavigate();

    return (
        <div className="rss-container fade-in-content">
            <div className="rss-header">
                <h1 className="neon-text">📡 RSS FEED CENTRAL</h1>
                <p className="rss-subtitle">MANTENTE CONECTADO A LA RED DE LOS SANTOS</p>
            </div>

            <div className="rss-content glass-panel">
                <div className="rss-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="rss-icon pulse-animation">
                        <path d="M4 11a9 9 0 019 9h-2a7 7 0 00-7-7v-2zm0-4a13 13 0 0113 13h-2a11 11 0 00-11-11V7zm2.5 10.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                </div>

                <div className="rss-info">
                    <h2>SUSCRÍBETE A NUESTRAS NOTICIAS</h2>
                    <p>Obtén las últimas novedades sobre actualizaciones de vehículos, parches del sistema de Crews y análisis de rendimiento directamente en tu lector RSS favorito.</p>
                    
                    <div className="rss-benefits">
                        <div className="benefit-item">
                            <span className="benefit-icon">🏎️</span>
                            <span>Análisis Semanales de Vehículos</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">⚙️</span>
                            <span>Notas de Parche del Servidor LSPA</span>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">🏆</span>
                            <span>Novedades del Leaderboard</span>
                        </div>
                    </div>

                    <div className="rss-action-area">
                        <a 
                            href="/feed.xml" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="rss-btn primary-rss-btn"
                        >
                            ACCEDER AL FEED XML
                        </a>
                        <button 
                            className="rss-btn secondary-rss-btn"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.origin + '/feed.xml');
                                // Optional: You could show a quick toast here if you wanted to import ToastContext
                            }}
                        >
                            📋 COPIAR URL DEL FEED
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="rss-back">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← VOLVER A LA CENTRAL
                </button>
            </div>
        </div>
    );
};

export default RssPage;
