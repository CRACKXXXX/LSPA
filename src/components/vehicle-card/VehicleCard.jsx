import React from 'react';
import PropTypes from 'prop-types';
import './VehicleCard.css';
import { useGarage } from '../../context/GarageContext';

const VehicleCard = ({ vehicle, onSelect, isSelected }) => {
  const { name, manufacturer, class: vehicleClass, stats, isWeaponized, hasImaniTech, isHsw, id } = vehicle;
  const { isInGarage, toggleGarage } = useGarage();
  const inGarage = isInGarage(id);

  return (
    <div 
      className={`vehicle-card ${isSelected ? 'selected' : ''} animate-slide-up`}
      onClick={() => onSelect && onSelect(vehicle)}
    >
      <button 
        className={`fav-btn ${inGarage ? 'active' : ''}`} 
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

      <div className="card-header">
        <span className="manufacturer">{manufacturer}</span>
        <h3>{name}</h3>
        <span className="vehicle-class">{vehicleClass}</span>
      </div>
      
      <div className="card-image-placeholder">
        <img 
            src={vehicle.image} 
            onError={(e) => {
                const target = e.target;
                const currentSrc = target.src;
                const id = vehicle.model;
                
                // Backup 1: MericcaN41
                const backup1 = `https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images/${id}.png`;
                // Backup 2: GTA Assets
                const backup2 = `https://gta-assets.pages.dev/images/vehicles/${id}.png`;
                // Backup 3: Placeholder
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
      </div>

      <div className="card-stats">
        <div className="stat-row">
          <span>Velocidad</span>
          <div className="stat-value-text">{stats.realKMH || stats.realMPH * 1.6} KM/H</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.speed * 10}%` }}></div>
          </div>
        </div>
        <div className="stat-row">
          <span>Aceleración</span>
          <div className="stat-value-text">{stats.acceleration}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.acceleration * 10}%`, background: 'var(--accent-color)', boxShadow: '0 0 8px var(--accent-color)' }}></div>
          </div>
        </div>
        <div className="stat-row">
          <span>Manejo</span>
           <div className="stat-value-text">{stats.handling}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.handling * 10}%` }}></div>
          </div>
        </div>
        <div className="stat-row">
          <span>Frenada</span>
           <div className="stat-value-text">{stats.braking}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${stats.braking * 10}%`, background: 'var(--danger)', boxShadow: '0 0 5px var(--danger)' }}></div>
          </div>
        </div>
      </div>
      
      <div className="extra-info-row" style={{display:'flex', justifyContent:'space-between', fontSize:'0.75rem', color:'var(--text-muted)', marginTop:'0.5rem', borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:'0.5rem'}}>
        <span>Asientos: {vehicle.seats}</span>
        <span>Clase: {vehicleClass}</span>
      </div>

      <div className="card-tags">
        {isWeaponized && <span className="tag weapon">ARMADO</span>}
        {hasImaniTech && <span className="tag imani">IMANI</span>}
        {isHsw && <span className="tag hsw">HSW</span>}
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
