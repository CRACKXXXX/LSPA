import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './VehicleCard.css';
import { useGarage } from '../../context/GarageContext';

const VehicleCard = ({ vehicle, onSelect, isSelected }) => {
  const { name, manufacturer, class: vehicleClass, stats, isWeaponized, hasImaniTech, isHsw, id } = vehicle;
  const { isInGarage, toggleGarage } = useGarage();
  const inGarage = isInGarage(id);
  const [isReaderMode, setIsReaderMode] = useState(false);
  
  // NEW: Tuning Mode State
  const [isTuned, setIsTuned] = useState(false);

  // 1. ENGINE MATHEMATICS
  const calculateScore = (s) => {
      // Base calculation on original 0-10 scale
      const rawScore = (s.speed * 30) + (s.acceleration * 30) + (s.handling * 25) + (s.braking * 15);
      return Math.round(rawScore);
  };

  // 2. TIER LOGIC "LSPA GRANULAR"
  const getTier = (score) => {
      // ELITE RANK
      if (score >= 980) return { label: 'S+', color: '#FFD700', text: '#000', glow: '0 0 15px #FFD700' }; // GOD
      if (score >= 950) return { label: 'S',  color: '#D946EF', text: '#fff', glow: '0 0 10px #D946EF' }; // LEGEND
      if (score >= 900) return { label: 'A+', color: '#00E5FF', text: '#000', glow: '0 0 8px #00E5FF' }; // HYPER
      
      // COMPETITIVE RANK
      if (score >= 850) return { label: 'A',  color: '#00E676', text: '#000', glow: 'none' }; // TOP
      if (score >= 750) return { label: 'B',  color: '#FFC107', text: '#000', glow: 'none' }; // PRO
      
      // MID-LOW RANK
      if (score >= 650) return { label: 'C',  color: '#FF9800', text: '#fff', glow: 'none' }; // AVERAGE
      if (score >= 550) return { label: '-C', color: '#E64A19', text: '#fff', glow: 'none' }; // WEAK
      
      // TRASH RANK
      if (score >= 450) return { label: 'D',  color: '#D32F2F', text: '#fff', glow: 'none' }; // BAD
      return { label: '-D', color: '#455A64', text: '#fff', glow: 'none' }; // TRASH
  };

  // Derive Effective Stats
  const effectiveStats = {
      speed: isTuned ? Math.min(stats.speed * 1.2, 10) : stats.speed,
      acceleration: isTuned ? Math.min(stats.acceleration * 1.2, 10) : stats.acceleration,
      handling: isTuned ? Math.min(stats.handling * 1.2, 10) : stats.handling,
      braking: isTuned ? Math.min(stats.braking * 1.2, 10) : stats.braking
  };

  // Derive Score & Tier
  const currentScore = calculateScore(effectiveStats);
  const tier = getTier(currentScore);

  return (
    <div 
      className={`vehicle-card ${isSelected ? 'selected' : ''} ${isReaderMode ? 'reader-mode' : ''} animate-slide-up`}
      onClick={() => {
          onSelect && onSelect(vehicle);
      }}
      style={{
          borderTop: `3px solid ${tier.color}`,
          boxShadow: isReaderMode ? 'none' : `0 4px 20px -5px ${tier.color}40` // Subtle glow based on tier
      }}
    >
      <div className="card-actions">
        <button 
            className={`action-btn reader-btn ${isReaderMode ? 'active' : ''}`}
            onClick={(e) => {
                e.stopPropagation();
                setIsReaderMode(!isReaderMode);
            }}
            title="Modo Lectura"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        </button>

        <button 
            className={`action-btn fav-btn ${inGarage ? 'active' : ''}`} 
            onClick={(e) => {
                e.stopPropagation();
                toggleGarage(id);
            }}
            title={inGarage ? "Quitar del Garaje" : "Añadir a Mis Deseos"}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={inGarage ? "var(--secondary-color)" : "none"} stroke={inGarage ? "var(--secondary-color)" : "currentColor"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
      </div>

      <div className="card-header">
        <span className="manufacturer" style={{color: 'var(--text-muted)'}}>{manufacturer}</span>
        <h3 style={{
            fontSize: name.length > 15 ? '1.1rem' : '1.3rem', 
            margin: '2px 0 5px',
            textShadow: isTuned ? '0 0 10px #2979FF' : 'none'
        }}>{name}</h3>
        <span className="vehicle-class">{vehicleClass}</span>
      </div>
      
      <div className="card-image-placeholder">
        <img 
            src={vehicle.image} 
            onError={(e) => {
                const target = e.target;
                const currentSrc = target.src;
                const id = vehicle.model;
                // Backup logic
                const backup1 = `https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images/${id}.png`;
                const backup2 = `https://gta-assets.pages.dev/images/vehicles/${id}.png`;
                const placeholder = "https://via.placeholder.com/300x160?text=No+Image";

                if (currentSrc === vehicle.image) {
                     target.src = backup1;
                } else if (currentSrc === backup1) {
                     target.src = backup2;
                } else {
                     target.onerror = null;
                     target.src = placeholder;
                }
            }}
            alt={name} 
        />
        
        {/* NEW: TIER BADGE */}
        <div className="tier-badge" style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: tier.color,
            color: tier.text,
            padding: '4px 8px',
            borderBottomLeftRadius: '8px',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: '1',
            boxShadow: tier.glow,
            zIndex: 10
        }}>
            <span style={{fontSize: '1.2rem'}}>{tier.label}</span>
            <span style={{fontSize: '0.6rem', opacity: 0.8}}>{currentScore}</span>
        </div>
      </div>

      <div className="card-stats">
        
        {/* NEW: TUNING SWITCH */}
        <div className="tuning-control" style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '0.5rem',
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 8px',
            borderRadius: '4px'
        }}>
            <span style={{fontSize: '0.7rem', color: isTuned ? '#2979FF' : '#888', fontWeight: 'bold'}}>
                LS CUSTOMS TUNING
            </span>
            <div 
                className={`tuning-switch ${isTuned ? 'on' : ''}`} 
                onClick={(e) => { e.stopPropagation(); setIsTuned(!isTuned); }}
                style={{
                    width: '30px',
                    height: '16px',
                    background: isTuned ? '#2979FF' : '#444',
                    borderRadius: '10px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: '0.3s'
                }}
            >
                <div style={{
                    width: '12px',
                    height: '12px',
                    background: '#fff',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: isTuned ? '16px' : '2px',
                    transition: '0.3s'
                }}></div>
            </div>
        </div>

        {/* STATS BARS */}
        {Object.entries({
            'Velocidad': effectiveStats.speed,
            'Aceleración': effectiveStats.acceleration,
            'Manejo': effectiveStats.handling,
            'Frenada': effectiveStats.braking
        }).map(([label, val]) => (
            <div className="stat-row" key={label}>
              <span>{label}</span>
              <div className="stat-value-text" style={{color: isTuned ? '#2979FF' : tier.color}}>
                  {Number(val).toFixed(1)}
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ 
                    width: `${Number(val) * 10}%`,
                    background: isTuned ? '#2979FF' : tier.color,
                    boxShadow: isTuned ? `0 0 10px #2979FF` : 'none',
                    transition: 'all 0.5s ease-out'
                }}></div>
              </div>
            </div>
        ))}
      </div>
      
      <div className="extra-info-row" style={{display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--text-muted)', marginTop:'0.5rem', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'0.5rem'}}>
        <span>Asientos: {vehicle.seats}</span>
        <span>{vehicleClass}</span>
      </div>

      <div className="card-tags">
        {isWeaponized && <span className="tag weapon" style={{fontSize:'0.6rem'}}>ARMADO</span>}
        {hasImaniTech && <span className="tag imani" style={{fontSize:'0.6rem'}}>IMANI</span>}
        {isHsw && <span className="tag hsw" style={{fontSize:'0.6rem'}}>HSW</span>}
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default VehicleCard;
