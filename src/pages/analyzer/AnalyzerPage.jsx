import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Palette, Share2, Plus, ArrowRightLeft, CarFront } from 'lucide-react';
import carsData from '../../data/cars.json';
import RadarChart from '../../components/analyzer/RadarChart';
import { useGarage } from '../../context/GarageContext';
import './AnalyzerPage.css';

const AnalyzerPage = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get('car');
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [comparisonCar, setComparisonCar] = useState(null);
  const [paintColor, setPaintColor] = useState('#ffffff');
  
  const { addToGarage, isInGarage } = useGarage();

  useEffect(() => {
    if (carId) {
      const found = carsData.find(c => c.id === carId);
      if (found) setSelectedCar(found);
    } else if (carsData.length > 0) {
      setSelectedCar(carsData[0]); // Default
    }
  }, [carId]);

  const handleCompareChange = (e) => {
    const found = carsData.find(c => c.id === e.target.value);
    setComparisonCar(found || null);
  };

  const getVerdict = (c1, c2) => {
    if (!c2) return '';
    let diffs = [];
    if (c1.stats.speed > c2.stats.speed) diffs.push("higher top speed");
    if (c1.stats.acceleration > c2.stats.acceleration) diffs.push("quicker acceleration");
    if (c1.stats.handling > c2.stats.handling) diffs.push("better cornerting");
    
    if (diffs.length > 0) {
      return `${c1.name} dominates with ${diffs.join(' and ')}.`;
    }
    return `${c2.name} seems to have the edge in overall performance.`;
  };

  if (!selectedCar) return <div>Loading...</div>;

  return (
    <div className="analyzer-page">
      <div className="analyzer-header">
        <h1>Telemetry <span className="highlight">Analysis</span></h1>
        <p> detailed performance breakdown for {selectedCar.name}</p>
      </div>

      <div className="main-stage">
        <div className="car-visualizer">
          <div 
            className="car-hero-image-container"
            style={{ 
              '--paint-filter': paintColor !== '#ffffff' ? `drop-shadow(0 0 10px ${paintColor})` : 'none' 
              // Note: hue-rotate is tricky with complex images, simulated here with glow
            }}
          >
           <img 
             src={selectedCar.image} 
             alt={selectedCar.name} 
             className="car-hero-image"
             style={{ borderColor: paintColor }}
           />
          </div>
          
          <div className="visualizer-controls">
            <div className="control-group">
               <Palette size={20} />
               <input 
                 type="color" 
                 value={paintColor} 
                 onChange={(e) => setPaintColor(e.target.value)} 
               />
               <span>Paint Shop</span>
            </div>
            
            <button 
              className="add-garage-btn" 
              onClick={() => addToGarage(selectedCar)}
              disabled={isInGarage(selectedCar.id)}
            >
              {isInGarage(selectedCar.id) ? "In Garage" : "Add to Garage"} <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="data-panel">
          <div className="cost-info">
            <h2>{selectedCar.name}</h2>
            <span className="manufacturer">{selectedCar.manufacturer}</span>
            <div className="drivetrain-badge">{selectedCar.drivetrain}</div>
            <div className="price-big">${selectedCar.price.toLocaleString()}</div>
          </div>

          <div className="tech-sheet">
            <h3>Performance Metrics</h3>
            {['speed', 'acceleration', 'braking', 'handling'].map(stat => (
              <div key={stat} className="stat-row">
                <span className="stat-name">{stat}</span>
                <div className="progress-bg">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${selectedCar.stats[stat]}%`,
                      backgroundColor: selectedCar.stats[stat] > 80 ? 'var(--primary-neon)' : 'var(--secondary-neon)'
                    }}
                  ></div>
                </div>
                <span className="stat-val">{selectedCar.stats[stat]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="radar-section">
        <h3>Radar Telemetry</h3>
        <div className="radar-container">
          <RadarChart car1={selectedCar} car2={comparisonCar} />
        </div>
      </div>

      <div className="versus-section">
        <div className="versus-header">
          <ArrowRightLeft size={24} />
          <h3>Versus Pro System</h3>
        </div>
        
        <div className="versus-controls">
          <select onChange={handleCompareChange} value={comparisonCar ? comparisonCar.id : ''}>
            <option value="">Select Opponent...</option>
            {carsData.filter(c => c.id !== selectedCar.id).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {comparisonCar && (
          <div className="verdict-box">
            <h4>Analyzer Verdict</h4>
            <p>{getVerdict(selectedCar, comparisonCar)}</p>
            <div className="drivetrain-compare">
               <span>{selectedCar.name}: <span className="highlight">{selectedCar.drivetrain}</span></span>
               <span>vs</span>
               <span>{comparisonCar.name}: <span className="highlight">{comparisonCar.drivetrain}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzerPage;
