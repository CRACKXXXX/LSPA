import React, { useState, useEffect } from 'react';
import { Search, Grid, List as ListIcon, Filter, SlidersHorizontal, Dice5 } from 'lucide-react';
import CarCard from './CarCard';
import './FleetGallery.css';

const FleetGallery = ({ cars, onRandom }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDrivetrain, setSelectedDrivetrain] = useState('All');
  const [minSeats, setMinSeats] = useState(0);
  const [priceRange, setPriceRange] = useState(5000000); // Default max

  const [filteredCars, setFilteredCars] = useState(cars);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique classes
  const carClasses = ['All', ...new Set(cars.map(c => c.class))];

  useEffect(() => {
    let result = cars;

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(lower) || 
        c.manufacturer.toLowerCase().includes(lower)
      );
    }

    // Class
    if (selectedClass !== 'All') {
      result = result.filter(c => c.class === selectedClass);
    }

    // Drivetrain
    if (selectedDrivetrain !== 'All') {
      result = result.filter(c => c.drivetrain === selectedDrivetrain);
    }

    // Seats
    if (minSeats > 0) {
      result = result.filter(c => c.seats >= minSeats);
    }

    // Price
    result = result.filter(c => c.price <= priceRange);

    setFilteredCars(result);
  }, [searchTerm, selectedClass, selectedDrivetrain, minSeats, priceRange, cars]);

  return (
    <div className="fleet-gallery-container">
      <div className="gallery-toolbar">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search fleet (Predictive)..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="toolbar-actions">
           <button className="action-btn random-btn" onClick={onRandom} title="Random Car">
             <Dice5 size={20} />
           </button>
          <button 
            className={`action-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            title="Filters"
          >
            <SlidersHorizontal size={20} />
          </button>
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              {carClasses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Drivetrain</label>
            <select value={selectedDrivetrain} onChange={(e) => setSelectedDrivetrain(e.target.value)}>
              <option value="All">All</option>
              <option value="RWD">RWD</option>
              <option value="AWD">AWD</option>
              <option value="FWD">FWD</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Min Seats: {minSeats}</label>
            <input 
              type="range" min="0" max="6" step="1" 
              value={minSeats} 
              onChange={(e) => setMinSeats(parseInt(e.target.value))} 
            />
          </div>
          <div className="filter-group">
            <label>Max Price: ${priceRange.toLocaleString()}</label>
            <input 
              type="range" min="0" max="3000000" step="50000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(parseInt(e.target.value))} 
            />
          </div>
        </div>
      )}

      <div className={`gallery-grid ${viewMode === 'list' ? 'gallery-list-mode' : ''}`}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <CarCard key={car.id} car={car} viewMode={viewMode} />
          ))
        ) : (
          <div className="no-results">
            <p>No vehicles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FleetGallery;
