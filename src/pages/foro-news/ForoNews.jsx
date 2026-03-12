import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNoticias } from '../../context/NoticiasContext';
import { useAuth } from '../../context/AuthContext';
import CustomDropdown from '../../components/custom-dropdown/CustomDropdown';
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
  const { noticias, loading } = useNoticias();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isAdminOrOwner = isAdmin;

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('date_desc');

  // Interactive state
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [likedNews, setLikedNews] = useState(new Set());
  const [bookmarkedNews, setBookmarkedNews] = useState(new Set());
  const [activeTagFilter, setActiveTagFilter] = useState(null);
  const [featuredId, setFeaturedId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set featured on load
  useEffect(() => {
    if (noticias.length > 0) {
      const mostLiked = noticias.reduce((max, n) => (n.likes || 0) > (max.likes || 0) ? n : max);
      setFeaturedId(mostLiked.id);
    }
  }, [noticias]);

  // Available categories
  const categories = ['Todas', 'GTA Online', 'Coches Reales', 'Tuning', 'Carreras', 'Novedades'];

  // Filter and sort news
  const filteredNews = useMemo(() => {
    return noticias
      .filter(noticia => {
        // Category filter
        if (selectedCategory !== 'Todas' && noticia.categoria !== selectedCategory) return false;

        // Tag filter (when clicking a tag)
        if (activeTagFilter && !noticia.tags?.includes(activeTagFilter)) return false;

        // Search filter (title + description + tags)
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchTitle = noticia.titulo?.toLowerCase().includes(term);
          const matchDesc = noticia.descripcion?.toLowerCase().includes(term);
          const matchTags = noticia.tags?.some(tag => tag.toLowerCase().includes(term));
          const matchAuthor = noticia.autor?.toLowerCase().includes(term);
          if (!matchTitle && !matchDesc && !matchTags && !matchAuthor) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') return new Date(b.fecha) - new Date(a.fecha);
        if (sortBy === 'date_asc') return new Date(a.fecha) - new Date(b.fecha);
        if (sortBy === 'likes_desc') return (b.likes || 0) - (a.likes || 0);
        if (sortBy === 'likes_asc') return (a.likes || 0) - (b.likes || 0);
        if (sortBy === 'title_asc') return a.titulo.localeCompare(b.titulo);
        return 0;
      });
  }, [noticias, selectedCategory, searchTerm, sortBy, activeTagFilter]);

  // Category count helper
  const getCategoryCount = useCallback((cat) => {
    if (cat === 'Todas') return noticias.length;
    return noticias.filter(n => n.categoria === cat).length;
  }, [noticias]);

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Relative time helper
  const getRelativeTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };

  // Get category style
  const getCategoryStyle = (category) => {
    return CATEGORY_COLORS[category] || { bg: 'rgba(255,255,255,0.1)', border: '#888', text: '#888' };
  };

  // Toggle card expansion
  const toggleExpand = (id) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle like with animation
  const toggleLike = (id) => {
    setLikedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarkedNews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle tag click to filter
  const handleTagClick = (tag) => {
    if (activeTagFilter === tag) {
      setActiveTagFilter(null);
    } else {
      setActiveTagFilter(tag);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSortBy('date_desc');
    setActiveTagFilter(null);
  };

  // Check if any filter is active
  const hasActiveFilters = searchTerm || selectedCategory !== 'Todas' || activeTagFilter || sortBy !== 'date_desc';

  // Loading skeleton
  if (loading) {
    return (
      <div className="foro-container">
        <aside className="foro-sidebar glass-panel">
          <div className="sidebar-header">
            <h2>📰 Foro Noticias</h2>
          </div>
          <div className="skeleton-filters">
            {[1, 2, 3, 4, 5, 6].map(i => (
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


  if (noticias.length === 0 && !searchTerm && selectedCategory === 'Todas') {
    return (
      <div className="foro-container">
        <div className="foro-error">
          <span className="error-icon">📭</span>
          <h3>No hay noticias todavía.</h3>
          {isAdminOrOwner && (
            <button className="retry-btn" onClick={() => navigate('/admin#noticias')}>Crear la primera desde el Admin</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="foro-container">
      {/* Botón de acceso rápido al admin (solo para admin/owner) */}
      {isAdminOrOwner && (
        <button
          className="foro-admin-shortcut"
          onClick={() => { navigate('/admin'); setTimeout(() => { window.location.hash = 'noticias'; document.getElementById('tab-noticias')?.click(); }, 100); }}
          title="Gestionar noticias en el Panel Admin"
        >
          🛡️ Gestionar Noticias
        </button>
      )}

      {/* Mobile sidebar toggle */}
      <button
        className={`sidebar-toggle-btn ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle filters"
      >
        <span>☰</span> Filtros
      </button>

      {/* Sidebar with category filters */}
      <aside className={`foro-sidebar glass-panel ${isSidebarOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h2>📰 Foro Noticias</h2>
          <span className="news-count">{filteredNews.length} noticias</span>
        </div>

        {/* Active tag filter badge */}
        {activeTagFilter && (
          <div className="active-tag-badge">
            <span>Filtrando por: <strong>#{activeTagFilter}</strong></span>
            <button onClick={() => setActiveTagFilter(null)}>✕</button>
          </div>
        )}

        {/* Category chips */}
        <div className="filter-section">
          <label className="filter-label">Categorías</label>
          <div className="category-chips">
            {categories.map(cat => {
              const style = cat === 'Todas'
                ? { bg: 'rgba(255,255,255,0.1)', border: '#fff', text: '#fff' }
                : getCategoryStyle(cat);
              const isActive = selectedCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  className={`category-chip ${isActive ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(cat); setIsSidebarOpen(false); }}
                  style={{
                    '--chip-bg': style.bg,
                    '--chip-border': style.border,
                    '--chip-text': style.text,
                  }}
                >
                  <span className="chip-icon">{CATEGORY_ICONS[cat] || '🌐'}</span>
                  <span className="chip-label">{cat}</span>
                  <span className="chip-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort selector */}
        <div className="filter-section">
          <label className="filter-label">Ordenar por</label>
          <CustomDropdown
            options={[
              { value: 'date_desc', label: '🕝 Más recientes', color: 'var(--secondary-color)' },
              { value: 'date_asc', label: '📅 Más antiguas', color: 'var(--text-muted)' },
              { value: 'likes_desc', label: '❤️ Más populares', color: '#ff4444' },
              { value: 'likes_asc', label: '💔 Menos populares', color: 'var(--text-muted)' },
              { value: 'title_asc', label: '🔤 Título (A-Z)', color: '#fff' },
            ]}
            value={sortBy}
            onChange={setSortBy}
            accentColor="var(--secondary-color)"
            fullWidth
          />
        </div>

        {/* Reset filters button */}
        {hasActiveFilters && (
          <button className="reset-filters-btn" onClick={resetFilters}>
            🔄 Limpiar filtros
          </button>
        )}

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
            <span className="stat-value">{noticias.reduce((sum, n) => sum + (n.likes || 0), 0).toLocaleString()}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>

        {/* Bookmarked count */}
        {bookmarkedNews.size > 0 && (
          <div className="bookmarks-indicator">
            🔖 {bookmarkedNews.size} guardadas
          </div>
        )}
      </aside>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Main content area */}
      <main className="foro-main">
        {/* Search + view toggle bar */}
        <div className="foro-header-actions">
          <div className="foro-search-bar">
            <i className="search-icon">🔍</i>
            <input
              type="text"
              placeholder="Buscar noticias, tags, autores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>✕</button>
            )}
          </div>

          {/* View mode toggle */}
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Vista cuadrícula"
            >
              ▦
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Vista lista"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Results info bar */}
        <div className="results-bar">
          <span className="results-count">
            {filteredNews.length} {filteredNews.length === 1 ? 'noticia' : 'noticias'}
            {searchTerm && <>&nbsp;para &ldquo;<strong>{searchTerm}</strong>&rdquo;</>}
          </span>
          {activeTagFilter && (
            <span className="active-filter-pill" onClick={() => setActiveTagFilter(null)}>
              #{activeTagFilter} ✕
            </span>
          )}
        </div>

        {/* News grid / list */}
        <div className={`foro-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {filteredNews.length > 0 ? (
            filteredNews.map((noticia, index) => {
              const catStyle = getCategoryStyle(noticia.categoria);
              const isExpanded = expandedCards.has(noticia.id);
              const isLiked = likedNews.has(noticia.id);
              const isBookmarked = bookmarkedNews.has(noticia.id);
              const isFeatured = noticia.id === featuredId && selectedCategory === 'Todas' && !searchTerm && !activeTagFilter;

              return (
                <article
                  key={noticia.id}
                  className={`news-card ${isExpanded ? 'expanded' : ''} ${isFeatured ? 'featured' : ''}`}
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  {/* Featured badge */}
                  {isFeatured && <div className="featured-badge">⭐ Destacada</div>}

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

                    {/* Bookmark button on image */}
                    <button
                      className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(noticia.id); }}
                      title={isBookmarked ? 'Quitar de guardados' : 'Guardar noticia'}
                    >
                      {isBookmarked ? '🔖' : '📑'}
                    </button>

                    {/* Relative time badge */}
                    <span className="time-badge">{getRelativeTime(noticia.fecha)}</span>
                  </div>

                  {/* Card body */}
                  <div className="news-card-body">
                    <h3 className="news-title">{noticia.titulo}</h3>
                    <p className={`news-description ${isExpanded ? 'expanded' : ''}`}>
                      {noticia.descripcion}
                    </p>

                    {/* Expand / collapse toggle */}
                    <button
                      className="expand-toggle"
                      onClick={() => toggleExpand(noticia.id)}
                    >
                      {isExpanded ? '▲ Ver menos' : '▼ Leer más'}
                    </button>

                    {/* Tags — clickable */}
                    <div className="news-tags">
                      {noticia.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className={`news-tag ${activeTagFilter === tag ? 'active-tag' : ''}`}
                          onClick={() => handleTagClick(tag)}
                          title={`Filtrar por #${tag}`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer meta */}
                    <div className="news-card-footer">
                      <div className="news-meta">
                        <span className="news-author">✍️ {noticia.autor}</span>
                        <span className="news-date">📅 {formatDate(noticia.fecha)}</span>
                      </div>

                      {/* Interactive like button */}
                      <button
                        className={`like-btn ${isLiked ? 'liked' : ''}`}
                        onClick={() => toggleLike(noticia.id)}
                      >
                        <span className={`like-icon ${isLiked ? 'pulse' : ''}`}>
                          {isLiked ? '❤️' : '🤍'}
                        </span>
                        <span className="likes-count">
                          {(noticia.likes || 0) + (isLiked ? 1 : 0)}
                        </span>
                      </button>
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
              {hasActiveFilters && (
                <button className="reset-filters-btn" onClick={resetFilters}>
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForoNews;
