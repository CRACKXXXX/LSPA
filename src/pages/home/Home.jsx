
import React, { useState, useMemo } from 'react';
import VehicleCard from '../../components/vehicle-card/VehicleCard';
import CustomDropdown from '../../components/custom-dropdown/CustomDropdown';
import Footer from '../../components/footer/Footer';
import vehiclesData from '../../data/vehicles.json';
import './Home.css';

const Home = () => {
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [minTopSpeed, setMinTopSpeed] = useState(0); // KM/H now
  const [sortBy, setSortBy] = useState('name_asc'); 
  
  // Logic Flags
  const [onlyWeaponized, setOnlyWeaponized] = useState(false);
  const [onlyImani, setOnlyImani] = useState(false);
  const [onlyHsw, setOnlyHsw] = useState(false);

  // Derive Manufacturers & Classes
  const manufacturers = useMemo(() => {
     const set = new Set(vehiclesData.map(v => v.manufacturer).filter(m => m !== 'Unknown'));
     return ['All', ...Array.from(set).sort()];
  }, []);

  const classes = useMemo(() => {
    const set = new Set(vehiclesData.map(v => v.class));
    return Array.from(set).sort();
  }, []);

  const classIcons = {
      'Super': '🏎️', 'Supers': '🏎️',
      'Sports': '🏁', 'Sport': '🏁',
      'Sports Classics': '🏛️', 'Sports Classic': '🏛️',
      'Muscle': '💪', 'Muscles': '💪',
      'Off-Road': '🏔️', 'Off-roads': '🏔️', 
      'SUV': '🚙', 'SUVs': '🚙', 'Suvs': '🚙',
      'Motorcycle': '🏍️', 'Motorcycles': '🏍️', 'Bikes': '🏍️',
      'Compact': '🚗', 'Compacts': '🚗',
      'Sedan': '🚘', 'Sedans': '🚘',
      'Coupe': '🛋️', 'Coupes': '🛋️',
      'Van': '🚐', 'Vans': '🚐',
      'Utility': '🛠️', 'Utilities': '🛠️',
      'Industrial': '🏭',
      'Cycle': '🚲', 'Cycles': '🚲', 
      'Boat': '🚤', 'Boats': '🚤',
      'Plane': '✈️', 'Planes': '✈️',
      'Helicopter': '🚁', 'Helicopters': '🚁',
      'Military': '🎖️',
      'Emergency': '🚑',
      'Service': '🚕',
      'Commercial': '🚛',
      'Trains': '🚂',
      'Open Wheel': '🏎️'
  };

  const handleClassToggle = (cls) => {
    setSelectedClasses(prev => 
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  // Smart Matcher State
  const [smartPreference, setSmartPreference] = useState(null); // 'speed', 'drift', 'control', 'offroad'

  const handleSmartSelect = (pref) => {
      // Toggle logic
      if (smartPreference === pref) {
          setSmartPreference(null);
          return;
      }
      setSmartPreference(pref);
      
      // Auto-configure filters based on preference
      if (pref === 'speed') {
          setSortBy('speed_desc');
          setMinTopSpeed(190);
      } else if (pref === 'drift') {
          setSortBy('accel_desc'); // Power needed for drift
          setMinTopSpeed(0);
      } else if (pref === 'control') {
          setSortBy('handling_desc');
          setMinTopSpeed(0);
      } else {
          setSortBy('name_asc');
          setMinTopSpeed(0);
      }
  };

  const filteredVehicles = useMemo(() => {
    return vehiclesData.filter(vehicle => {
      // 0. Smart Matcher Logic
      if (smartPreference === 'drift') {
          // Drift = High Power + Low Traction (Slippery)
          // Adjust logic: Traction < 2.5 and Accel > 7
          const traction = parseFloat(vehicle.stats.handling);
          const accel = parseFloat(vehicle.stats.acceleration);
          if (traction > 2.5 || accel < 6.5) return false;
      }
      if (smartPreference === 'control') {
          // Grip = High Traction + High Braking
          if (parseFloat(vehicle.stats.handling) < 8.0 || parseFloat(vehicle.stats.braking) < 7.0) return false;
      }
      if (smartPreference === 'offroad') {
          if (vehicle.class !== 'Off-Road' && vehicle.class !== 'SUV') return false;
      }

      // 1. Search
      if (searchTerm && !vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !vehicle.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // 2. Manufacturer
      if (selectedManufacturer !== 'All' && vehicle.manufacturer !== selectedManufacturer) return false;
      
      // 3. Class
      if (selectedClasses.length > 0 && !selectedClasses.includes(vehicle.class)) return false;
      
      // 4. Sliders (RealKMH)
      const speed = vehicle.stats.realKMH || (vehicle.stats.realMPH * 1.6);
      if (speed < minTopSpeed) return false;

      // 5. Flags
      if (onlyWeaponized && !vehicle.isWeaponized) return false;
      if (onlyImani && !vehicle.hasImaniTech) return false;
      if (onlyHsw && !vehicle.isHsw) return false;

      return true;
    }).sort((a, b) => {
        // Sorting Logic
        if (sortBy === 'speed_desc') return (b.stats.realKMH || 0) - (a.stats.realKMH || 0);
        if (sortBy === 'speed_asc') return (a.stats.realKMH || 0) - (b.stats.realKMH || 0);
        
        if (sortBy === 'accel_desc') return (b.stats.acceleration || 0) - (a.stats.acceleration || 0);
        if (sortBy === 'accel_asc') return (a.stats.acceleration || 0) - (b.stats.acceleration || 0);

        if (sortBy === 'handling_desc') return (b.stats.handling || 0) - (a.stats.handling || 0);
        if (sortBy === 'handling_asc') return (a.stats.handling || 0) - (b.stats.handling || 0);

        if (sortBy === 'braking_desc') return (b.stats.braking || 0) - (a.stats.braking || 0);
        if (sortBy === 'braking_asc') return (a.stats.braking || 0) - (b.stats.braking || 0);

        return a.name.localeCompare(b.name);
    });
  }, [searchTerm, selectedManufacturer, selectedClasses, minTopSpeed, onlyWeaponized, onlyImani, onlyHsw, sortBy, smartPreference]);

  return (
    <>
    <div className="home-container">
      {/* Sidebar Filters */}
      <aside className="filters-sidebar glass-panel">
        <div className="sidebar-header">
            <h2>Catálogo LSPA</h2>
            <button className="reset-btn" onClick={() => {
                setSearchTerm('');
                setSelectedManufacturer('All');
                setSelectedClasses([]);
                setMinTopSpeed(0);
                setOnlyWeaponized(false);
                setOnlyImani(false);
                setOnlyHsw(false);
            }}>Reset</button>
        </div>

        <div className="filter-group">
            <label>Fabricante</label>
            <CustomDropdown
                options={manufacturers.map(m => ({ value: m, label: m, color: m === 'All' ? '#fff' : 'var(--secondary-color)' }))}
                value={selectedManufacturer}
                onChange={setSelectedManufacturer}
                accentColor="var(--secondary-color)"
                fullWidth
            />
        </div>

        <div className="filter-group">
             <label>Clase de Vehículo</label>
             <div className="checkbox-group">
                {classes.map(cls => (
                    <label key={cls} className="checkbox-label" title={cls}>
                        <input 
                            type="checkbox" 
                            checked={selectedClasses.includes(cls)}
                            onChange={() => handleClassToggle(cls)}
                        />
                        <span className="class-icon">{classIcons[cls] || '🔹'}</span>
                        <span className="class-name">{cls}</span>
                    </label>
                ))}
             </div>
        </div>

        <div className="filter-group">
            <label>Velocidad Mínima ({minTopSpeed} KM/H)</label>
            <input 
                type="range" 
                min="0" max="500" 
                value={minTopSpeed} 
                onChange={(e) => setMinTopSpeed(Number(e.target.value))} 
            />
        </div>

        <div className="filter-group flags-group">
            <label className="toggle-label">
                <input type="checkbox" checked={onlyWeaponized} onChange={(e) => setOnlyWeaponized(e.target.checked)} />
                Vehículos Armados
            </label>
            <label className="toggle-label">
                <input type="checkbox" checked={onlyImani} onChange={(e) => setOnlyImani(e.target.checked)} />
                Imani Tech
            </label>
            <label className="toggle-label">
                <input type="checkbox" checked={onlyHsw} onChange={(e) => setOnlyHsw(e.target.checked)} />
                Mejoras HSW
            </label>
        </div>
      </aside>

      {/* Main Grid Area */}
      <main className="vehicles-grid-section">
        <div className="grid-header-actions">
            <div className="search-bar-container">
                <i className="search-icon">🔍</i>
                <input 
                    type="text" 
                    placeholder="Buscar vehículo..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="sort-container">
                <CustomDropdown
                    label="Ordenar:"
                    options={[
                        { value: 'name_asc', label: '🔤 Nombre (A-Z)', color: '#fff' },
                        { value: 'speed_desc', label: '🏎️ Velocidad (Más Rápido)', color: 'var(--secondary-color)' },
                        { value: 'speed_asc', label: '🐢 Velocidad (Más Lento)', color: 'var(--text-muted)' },
                        { value: 'accel_desc', label: '⚡ Aceleración (Mayor)', color: 'var(--primary-color)' },
                        { value: 'accel_asc', label: '🐌 Aceleración (Menor)', color: 'var(--text-muted)' },
                        { value: 'handling_desc', label: '🎯 Manejo (Mejor)', color: 'var(--secondary-color)' },
                        { value: 'handling_asc', label: '💫 Manejo (Peor)', color: 'var(--text-muted)' },
                        { value: 'braking_desc', label: '🛑 Frenada (Mejor)', color: '#ff4444' },
                        { value: 'braking_asc', label: '⚠️ Frenada (Peor)', color: 'var(--text-muted)' },
                    ]}
                    value={sortBy}
                    onChange={setSortBy}
                    accentColor="var(--primary-color)"
                />
            </div>
        </div>

        <div className="results-meta">
            Encontrados: {filteredVehicles.length}
        </div>

        <div className="vehicle-grid-container">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))
          ) : (
            <div className="no-results">
                <h3>No hay resultados</h3>
                <p>Intenta cambiar los filtros.</p>
            </div>
          )}
        </div>
      </main>
    </div>

    {/* Botón flotante toggle del footer */}
    <button
      className={`home-footer-toggle-btn ${isFooterOpen ? 'active' : ''}`}
      onClick={() => setIsFooterOpen(p => !p)}
      aria-label="Mostrar/ocultar footer"
      title={isFooterOpen ? 'Ocultar footer' : 'Mostrar footer'}
    >
      {isFooterOpen ? '✕' : 'ℹ'}
    </button>

    {/* Mini footer compacto */}
    <div className={`home-mini-footer ${isFooterOpen ? 'footer-open' : ''}`}>
      <Footer />
    </div>
    </>
  );
};

export default Home;
