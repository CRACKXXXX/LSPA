import React from 'react';
import './RssPage.css';

const RssPage = () => {
  return (
    <div className="rss-page-container">
      <div className="rss-header">
        <h1>Novedades RSS 📡</h1>
        <p>Mantente al día con las últimas noticias, actualizaciones de vehículos y parches de LSPA a través de nuestro Feed RSS.</p>
      </div>

      <div className="rss-content glass-panel">
        <div className="rss-info">
          <h2>¿Qué es RSS?</h2>
          <p>RSS (Really Simple Syndication) es un formato que te permite suscribirte a nuestro contenido y recibir las noticias automáticamente en tu lector de Feeds favorito (como Feedly, Inoreader, o extensiones del navegador) sin tener que visitar la página constantemente.</p>
        </div>

        <div className="rss-link-box">
          <h3>Enlace a nuestro XML</h3>
          <p>Copia y pega este enlace en tu lector RSS:</p>
          <div className="rss-url-container">
            <input 
              type="text" 
              readOnly 
              value="https://lspa-joel.web.app/feed.xml" 
              className="rss-url-input"
            />
            <button 
              className="rss-copy-btn"
              onClick={() => {
                navigator.clipboard.writeText('https://lspa-joel.web.app/feed.xml');
                alert('¡Enlace copiado al portapapeles!');
              }}
            >
              Copiar
            </button>
          </div>
          <a href="/feed.xml" target="_blank" rel="noopener noreferrer" className="rss-direct-link">
            Ver archivo RSS (XML) ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default RssPage;
