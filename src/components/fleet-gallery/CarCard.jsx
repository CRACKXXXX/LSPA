import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge, Zap, Wind } from 'lucide-react';
import './CarCard.css';

const CarCard = ({ car, viewMode }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/analyzer?car=${car.id}`);
  };

  const formatPrice = (price) => {
    return price === 0 ? "FREE" : `$${price.toLocaleString()}`;
  };

  /**
   * Helper to determine color based on stat value (0-100)
   */
  const getStatColor = (val) => {
    if (val > 85) return 'var(--primary-neon)';
    if (val > 60) return 'var(--accent-warning)';
    return 'var(--text-muted)';
  };

  if (viewMode === 'list') {
    return (
      <div className="car-card-list" onClick={handleCardClick}>
        <div className="car-card-list-img-container">
          <img src={car.image} alt={car.name} className="car-image-list" />
        </div>
        <div className="car-info-list">
          <h3>{car.manufacturer} {car.name}</h3>
          <span className="car-class-badge">{car.class}</span>
        </div>
        <div className="car-stats-mini">
          <div className="stat-mini">
            <Wind size={16} /> <span>{car.stats.speed}</span>
          </div>
          <div className="stat-mini">
            <Zap size={16} /> <span>{car.stats.acceleration}</span>
          </div>
          <div className="stat-mini">
            <Gauge size={16} /> <span>{car.stats.braking}</span>
          </div>
        </div>
        <div className="car-price-tag">
          {formatPrice(car.price)}
        </div>
      </div>
    );
  }

  // GRID VIEW
  return (
    <div className="car-card-grid" onClick={handleCardClick}>
      <div className="car-image-container">
        <img src={car.image} alt={car.name} className="car-image" />
        <div className="car-overlay">
          <button className="analyze-btn">ANALYZE</button>
        </div>
      </div>
      <div className="car-details">
        <div className="car-header">
          <span className="car-manufacturer">{car.manufacturer}</span>
          <h3 className="car-name">{car.name}</h3>
        </div>
        <div className="car-meta">
          <span className="car-class">{car.class}</span>
          <span className="car-price">{formatPrice(car.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
