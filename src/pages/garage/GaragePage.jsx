import React from 'react';
import { useGarage } from '../../context/GarageContext';
import VehicleCard from '../../components/vehicle-card/VehicleCard';
import './Garage.css';

const TAG_OPTIONS = [
    { value: 'PENDIENTE', label: '⏳ Pendiente', color: 'var(--text-muted)' },
    { value: 'OBTENIDO', label: '✅ Obtenido', color: 'var(--success)' },
    { value: 'IMPORTANTE', label: '⭐ Importante', color: 'var(--primary-color)' },
    { value: 'HUNTING', label: '🎯 Cazando', color: 'var(--secondary-color)' }
];

const GaragePage = () => {
    const { garageVehicles, garageIds, updateTag } = useGarage();

    const [sortBy, setSortBy] = React.useState('recent');
    const [filterTag, setFilterTag] = React.useState('ALL');

    const TAG_PRIORITY = {
        'IMPORTANTE': 1,
        'OBTENIDO': 2,
        'HUNTING': 3,
        'PENDIENTE': 4
    };

    const filteredVehicles = garageVehicles.filter(v => {
        if (filterTag === 'ALL') return true;
        return v.savedTag === filterTag;
    });

    const sortedVehicles = [...filteredVehicles].sort((a, b) => {
        if (sortBy === 'tag') {
            const pA = TAG_PRIORITY[a.savedTag] || 99;
            const pB = TAG_PRIORITY[b.savedTag] || 99;
            return pA - pB;
        }
        return 0; // Default is insertion order (recent)
    });

    return (
        <div className="garage-container">
            <div className="garage-header animate-slide-up">
                <h2 className="gradient-text">MI GARAJE DE ENSUEÑO</h2>
                <div className="garage-actions" style={{display:'flex', gap:'1rem', alignItems:'center'}}>
                    <div className="filter-box" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                         <label style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>VER:</label>
                         <select
                            value={filterTag}
                            onChange={(e) => setFilterTag(e.target.value)}
                            style={{
                                background:'rgba(0,0,0,0.5)', 
                                border:'1px solid var(--secondary-color)', 
                                color:'#fff', 
                                padding:'0.5rem', 
                                borderRadius:'20px',
                                outline:'none'
                            }}
                         >
                            <option value="ALL">Todo</option>
                            {TAG_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                         </select>
                    </div>

                    <div className="sort-box" style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                        <label style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>ORDENAR:</label>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                background:'rgba(0,0,0,0.5)', 
                                border:'1px solid var(--primary-color)', 
                                color:'#fff', 
                                padding:'0.5rem', 
                                borderRadius:'20px',
                                outline:'none'
                            }}
                        >
                            <option value="recent">🕐 Recientes</option>
                            <option value="tag">🏷️ Etiquetas</option>
                        </select>
                    </div>

                    <div className="stat-card">
                        <span>Vehículos</span>
                        <h3>{garageIds.length}</h3>
                    </div>
                </div>
            </div>

            {garageIds.length === 0 ? (
                <div className="empty-garage animate-pulse">
                    <p>Tu garaje está vacío.</p>
                    <p className="sub-text">Explora el catálogo y añade vehículos con el ❤️</p>
                </div>
            ) : (
                <div className="garage-grid">
                    {sortedVehicles.map(vehicle => (
                        <div key={vehicle.id} className="garage-item-wrapper animate-slide-up">
                            <VehicleCard 
                                vehicle={vehicle} 
                                onSelect={() => {}} 
                            />
                            
                            <div className="garage-controls">
                                <label>Estado:</label>
                                <select 
                                    value={vehicle.savedTag} 
                                    onChange={(e) => updateTag(vehicle.id, e.target.value)}
                                    className="tag-select"
                                    style={{
                                        borderColor: TAG_OPTIONS.find(t => t.value === vehicle.savedTag)?.color || '#fff',
                                        color: TAG_OPTIONS.find(t => t.value === vehicle.savedTag)?.color || '#fff'
                                    }}
                                >
                                    {TAG_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GaragePage;
