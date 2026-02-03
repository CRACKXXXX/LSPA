
import React, { useState } from 'react';
import VehicleCard from '../../components/vehicle-card/VehicleCard';
import vehicleData from '../../data/vehicles.json';
import StatRadar from '../../components/charts/StatRadar';
import './VersusMode.css';
import { useGamification } from '../../context/GamificationContext';

const VersusMode = () => {
  const { addXp } = useGamification();
  const [leftVehicle, setLeftVehicle] = useState(null);
  const [rightVehicle, setRightVehicle] = useState(null);
  const [isSelectingFor, setIsSelectingFor] = useState(null); // 'left' or 'right'
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectClick = (side) => {
    setIsSelectingFor(side);
    setSearchTerm('');
  };

  const handleVehicleSelect = (vehicle) => {
    if (isSelectingFor === 'left') setLeftVehicle(vehicle);
    if (isSelectingFor === 'right') setRightVehicle(vehicle);
    setIsSelectingFor(null);
  };

  const awardedPairRef = React.useRef(null);

  // Award XP for Researching (Comparisons)
  React.useEffect(() => {
    if (leftVehicle && rightVehicle) {
        const pairKey = [leftVehicle.id, rightVehicle.id].sort().join('-');
        
        if (awardedPairRef.current !== pairKey) {
            // New unique comparison
            addXp(10, 20);
            awardedPairRef.current = pairKey;
        }
    }
  }, [leftVehicle, rightVehicle, addXp]);


  const filteredSelection = vehicleData.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatClass = (val1, val2) => {
    if (!val2) return '';
    if (val1 > val2) return 'winner';
    if (val1 < val2) return 'loser';
    return 'tie';
  };

  return (
    <div className="versus-container">
      <div className="versus-header">
        <h2>Modo Versus</h2>
        <p>Compara las estadísticas de dos vehículos cara a cara.</p>
      </div>

      <div className="versus-arena">
        {/* Left Slot */}
        <div className="versus-slot">
          {leftVehicle ? (
            <div className="selected-slot">
              <button className="change-btn" onClick={() => handleSelectClick('left')}>Cambiar</button>
              <VehicleCard vehicle={leftVehicle} />
              {/* Individual Radar A (Cyan) */}
              <div style={{marginTop: '1rem', transform: 'scale(0.9)'}}>
                <StatRadar vehicleA={leftVehicle} />
              </div>
            </div>
          ) : (
            <div className="empty-slot" onClick={() => handleSelectClick('left')}>
              <span>+ Seleccionar Vehículo 1</span>
            </div>
          )}
        </div>

        <div className="versus-divider">VS</div>

        {/* Right Slot */}
        <div className="versus-slot">
          {rightVehicle ? (
             <div className="selected-slot">
              <button className="change-btn" onClick={() => handleSelectClick('right')}>Cambiar</button>
              <VehicleCard vehicle={rightVehicle} />
              {/* Individual Radar B (Magenta) */}
              <div style={{marginTop: '1rem', transform: 'scale(0.9)'}}>
                <StatRadar vehicleB={rightVehicle} /> 
              </div>
            </div>
          ) : (
            <div className="empty-slot" onClick={() => handleSelectClick('right')}>
              <span>+ Seleccionar Vehículo 2</span>
            </div>
          )}
        </div>
      </div>

      {leftVehicle && rightVehicle && (
        <div className="comparison-section" style={{marginTop:'2rem'}}>
            <StatRadar 
                vehicleA={leftVehicle} 
                vehicleB={rightVehicle} 
                title="COMPARACIÓN DE RENDIMIENTO"
            />
            
            <div className="comparison-table">
            <div className="comparison-row">
                <span className={`stat-val ${getStatClass(leftVehicle.stats.realKMH, rightVehicle.stats.realKMH)}`}>
                {leftVehicle.stats.realKMH} <small>KM/H</small>
                </span>
                <span className="stat-label">VELOCIDAD MÁX</span>
                <span className={`stat-val ${getStatClass(rightVehicle.stats.realKMH, leftVehicle.stats.realKMH)}`}>
                {rightVehicle.stats.realKMH} <small>KM/H</small>
                </span>
            </div>
            </div>
        </div>
      )}

      {/* Selection Modal Overlay */}
      {isSelectingFor && (
        <div className="modal-overlay" onClick={() => setIsSelectingFor(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Seleccionar Vehículo</h3>
            <input 
              type="text" 
              placeholder="Buscar..." 
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="modal-grid">
              {filteredSelection.map(v => (
                <div key={v.id} className="mini-card" onClick={() => handleVehicleSelect(v)}>
                  <div className="mini-card-img">
                     <img 
                        src={v.image} 
                        alt={v.name} 
                        onError={(e) => {
                            const target = e.target;
                            const backup1 = `https://raw.githubusercontent.com/MericcaN41/gta5carimages/main/images/${v.id}.png`;
                            const backup2 = `https://gta-assets.pages.dev/images/vehicles/${v.id}.png`;
                            const placeholder = "https://via.placeholder.com/100x60?text=No+Img";
                            
                            if (target.src === v.image) target.src = backup1;
                            else if (target.src === backup1) target.src = backup2;
                            else target.src = placeholder;
                        }} 
                     />
                  </div>
                  <div className="mini-card-info">
                    <span className="mini-name">{v.name}</span>
                    <span className="mini-manufacturer">{v.manufacturer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersusMode;
