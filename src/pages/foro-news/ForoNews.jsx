import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import './ForoNews.css';

// Category color mapping for visual distinction
const CATEGORY_COLORS = {
  'GTA Online': { bg: 'rgba(0, 240, 255, 0.15)', border: '#00F0FF', text: '#00F0FF' },
  'Coches Reales': { bg: 'rgba(255, 215, 0, 0.15)', border: '#FFD700', text: '#FFD700' },
  'Tuning': { bg: 'rgba(255, 69, 0, 0.15)', border: '#FF4500', text: '#FF4500' },
  'Carreras': { bg: 'rgba(0, 255, 100, 0.15)', border: '#00FF64', text: '#00FF64' },
  'Novedades': { bg: 'rgba(190, 0, 255, 0.15)', border: '#BE00FF', text: '#BE00FF' },
};

// Category icons
const CATEGORY_ICONS = {
  'GTA Online': '🎮',
  'Coches Reales': '🏎️',
  'Tuning': '🔧',
  'Carreras': '🏁',
  'Novedades': '📰',
};

const ForoNews = () => {
  // State management
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('date_desc');

  // Available categories derived from data
  const categories = ['Todas', 'GTA Online', 'Coches Reales', 'Tuning', 'Carreras', 'Novedades'];

  // Fetch news from Firestore on mount
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const newsCollection = collection(db, 'noticias');
        const snapshot = await getDocs(newsCollection);
        const newsArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNoticias(newsArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching news from Firestore:', err);
        setError('Error al cargar las noticias. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter and sort news
  const filteredNews = useMemo(() => {
    return noticias
      .filter(noticia => {
        // Category filter
        if (selectedCategory !== 'Todas' && noticia.categoria !== selectedCategory) return false;
        // Search filter (title + description)
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchTitle = noticia.titulo?.toLowerCase().includes(term);
          const matchDesc = noticia.descripcion?.toLowerCase().includes(term);
          const matchTags = noticia.tags?.some(tag => tag.toLowerCase().includes(term));
          if (!matchTitle && !matchDesc && !matchTags) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortBy === 'date_desc') return new Date(b.fecha) - new Date(a.fecha);
        if (sortBy === 'date_asc') return new Date(a.fecha) - new Date(b.fecha);
        if (sortBy === 'likes_desc') return (b.likes || 0) - (a.likes || 0);
        if (sortBy === 'likes_asc') return (a.likes || 0) - (b.likes || 0);
        if (sortBy === 'title_asc') return a.titulo.localeCompare(b.titulo);
        return 0;
      });
  }, [noticias, selectedCategory, searchTerm, sortBy]);

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get category style
  const getCategoryStyle = (category) => {
    return CATEGORY_COLORS[category] || { bg: 'rgba(255,255,255,0.1)', border: '#888', text: '#888' };
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="foro-container">
        <aside className="foro-sidebar glass-panel">
          <div className="sidebar-header">
            <h2>Foro Noticias</h2>
          </div>
          <div className="skeleton-filters">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skeleton-chip"></div>
            ))}
          </div>
        </aside>
        <main className="foro-main">
          <div className="foro-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="news-card-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line long"></div>
                  <div className="skeleton-line medium"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="foro-container">
        <div className="foro-error">
          <span className="error-icon">⚠️</span>
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="foro-container">
      {/* Sidebar with category filters */}
      <aside className="foro-sidebar glass-panel">
        <div className="sidebar-header">
          <h2>📰 Foro Noticias</h2>
          <span className="news-count">{filteredNews.length} noticias</span>
        </div>

        {/* Category chips */}
        <div className="filter-section">
          <label className="filter-label">Categorías</label>
          <div className="category-chips">
            {categories.map(cat => {
              const style = cat === 'Todas'
                ? { bg: 'rgba(255,255,255,0.1)', border: '#fff', text: '#fff' }
                : getCategoryStyle(cat);
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  className={`category-chip ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    '--chip-bg': style.bg,
                    '--chip-border': style.border,
                    '--chip-text': style.text,
                  }}
                >
                  <span className="chip-icon">{CATEGORY_ICONS[cat] || '🌐'}</span>
                  <span className="chip-label">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort selector */}
        <div className="filter-section">
          <label className="filter-label">Ordenar por</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="foro-select"
          >
            <option value="date_desc">Más recientes</option>
            <option value="date_asc">Más antiguas</option>
            <option value="likes_desc">Más populares</option>
            <option value="likes_asc">Menos populares</option>
            <option value="title_asc">Título (A-Z)</option>
          </select>
        </div>

        {/* Stats summary */}
        <div className="sidebar-stats">
          <div className="stat-item">
            <span className="stat-value">{noticias.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{new Set(noticias.map(n => n.categoria)).size}</span>
            <span className="stat-label">Categorías</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{noticias.reduce((sum, n) => sum + (n.likes || 0), 0)}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="foro-main">
        {/* Search bar */}
        <div className="foro-header-actions">
          <div className="foro-search-bar">
            <i className="search-icon">🔍</i>
            <input
              type="text"
              placeholder="Buscar noticias, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>
          <div className="results-info">
            {searchTerm && <span>Resultados para "<strong>{searchTerm}</strong>"</span>}
          </div>
        </div>

        {/* News grid */}
        <div className="foro-grid">
          {filteredNews.length > 0 ? (
            filteredNews.map((noticia, index) => {
              const catStyle = getCategoryStyle(noticia.categoria);
              return (
                <article
                  key={noticia.id}
                  className="news-card"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Card image */}
                  <div className="news-card-image">
                    <img
                      src={noticia.imagen}
                      alt={noticia.titulo}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop';
                      }}
                    />
                    <span
                      className="news-category-badge"
                      style={{
                        backgroundColor: catStyle.bg,
                        borderColor: catStyle.border,
                        color: catStyle.text,
                      }}
                    >
                      {CATEGORY_ICONS[noticia.categoria]} {noticia.categoria}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="news-card-body">
                    <h3 className="news-title">{noticia.titulo}</h3>
                    <p className="news-description">{noticia.descripcion}</p>

                    {/* Tags */}
                    <div className="news-tags">
                      {noticia.tags?.map((tag, i) => (
                        <span key={i} className="news-tag">#{tag}</span>
                      ))}
                    </div>

                    {/* Footer meta */}
                    <div className="news-card-footer">
                      <div className="news-meta">
                        <span className="news-author">✍️ {noticia.autor}</span>
                        <span className="news-date">📅 {formatDate(noticia.fecha)}</span>
                      </div>
                      <div className="news-likes">
                        <span className="likes-icon">🔥</span>
                        <span className="likes-count">{noticia.likes}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="no-results">
              <span className="no-results-icon">🔎</span>
              <h3>No se encontraron noticias</h3>
              <p>Prueba con otros filtros o términos de búsqueda.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForoNews;
