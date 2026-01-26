import React from 'react';
import { useNavigate } from 'react-router-dom';
import FleetGallery from '../../components/fleet-gallery/FleetGallery';
import carsData from '../../data/cars.json';
import { useGarage } from '../../context/GarageContext';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { garage, getGarageValue } = useGarage();

  const handleRandomCar = () => {
    const randomIndex = Math.floor(Math.random() * carsData.length);
    const randomCar = carsData[randomIndex];
    navigate(`/analyzer?car=${randomCar.id}`);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Los Santos <span className="highlight">Performance</span> Analyzer</h1>
          <p>The definitive digital catalogue for FiveM vehicle telemetry.</p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-label">Database</span>
              <span className="stat-value">{carsData.length} Vehicles</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Garage Value</span>
              <span className="stat-value">${getGarageValue().toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Fleet Count</span>
              <span className="stat-value">{garage.length} Saved</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2 className="section-title">Fleet Directory</h2>
        <FleetGallery cars={carsData} onRandom={handleRandomCar} />
      </section>
    </div>
  );
};

export default HomePage;
