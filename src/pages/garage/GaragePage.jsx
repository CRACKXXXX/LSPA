import { useState } from 'react';

import { useGarage } from '../../context/GarageContext';
import VehicleCard from '../../components/vehicle-card/VehicleCard';
import CustomDropdown from '../../components/custom-dropdown/CustomDropdown';
import './Garage.css';

const TAG_OPTIONS = [
    { value: 'PENDIENTE', label: '⏳ Pendiente', color: 'var(--text-muted)' },
    { value: 'OBTENIDO', label: '✅ Obtenido', color: 'var(--success)' },
    { value: 'IMPORTANTE', label: '⭐ Importante', color: 'var(--primary-color)' },
    { value: 'HUNTING', label: '🎯 Cazando', color: 'var(--secondary-color)' }
];

const FILTER_OPTIONS = [
    { value: 'ALL', label: '🌐 Todo', color: '#fff' },
    ...TAG_OPTIONS
];

const SORT_OPTIONS = [
    { value: 'recent', label: '🕐 Recientes', color: 'var(--primary-color)' },
    { value: 'tag', label: '🏷️ Etiquetas', color: 'var(--secondary-color)' }
];

const GaragePage = () => {
    const { garageVehicles, garageIds, updateTag } = useGarage();

    const [sortBy, setSortBy] = useState('recent');
    const [filterTag, setFilterTag] = useState('ALL');

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
        return 0;
    });

    return (
        <div className="garage-container">
            <div className="garage-header animate-slide-up">
                <h2 className="gradient-text">MI GARAJE DE ENSUEÑO</h2>
                <div className="garage-actions">
                    <CustomDropdown
                        label="VER:"
                        options={FILTER_OPTIONS}
                        value={filterTag}
                        onChange={setFilterTag}
                        accentColor="var(--secondary-color)"
                    />

                    <CustomDropdown
                        label="ORDENAR:"
                        options={SORT_OPTIONS}
                        value={sortBy}
                        onChange={setSortBy}
                        accentColor="var(--primary-color)"
                    />

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
                                <CustomDropdown
                                    label=""
                                    options={TAG_OPTIONS}
                                    value={vehicle.savedTag}
                                    onChange={(val) => updateTag(vehicle.id, val)}
                                    accentColor={TAG_OPTIONS.find(t => t.value === vehicle.savedTag)?.color || '#fff'}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GaragePage;
