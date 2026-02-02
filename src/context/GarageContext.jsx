import React, { createContext, useState, useEffect, useContext } from 'react';
import vehiclesData from '../data/vehicles.json';

const GarageContext = createContext();

export const useGarage = () => {
    return useContext(GarageContext);
};

export const GarageProvider = ({ children }) => {
    // Load initial state from local storage with Migration Logic
    const [garageItems, setGarageItems] = useState(() => {
        const saved = localStorage.getItem('lspa_garage');
        if (!saved) return [];
        
        try {
            const parsed = JSON.parse(saved);
            // Migration: If array of strings, convert to objects
            if (Array.isArray(parsed) && typeof parsed[0] === 'string') {
                return parsed.map(id => ({ id, tag: 'PENDIENTE' }));
            }
            return parsed; // Assuming it's already objects
        } catch (e) {
            console.error("Error parsing garage", e);
            return [];
        }
    });

    // Persist to local storage
    useEffect(() => {
        localStorage.setItem('lspa_garage', JSON.stringify(garageItems));
    }, [garageItems]);

    const addToGarage = (id) => {
        if (!garageItems.some(item => item.id === id)) {
            setGarageItems(prev => [...prev, { id, tag: 'PENDIENTE' }]);
        }
    };

    const removeFromGarage = (id) => {
        setGarageItems(prev => prev.filter(item => item.id !== id));
    };

    const toggleGarage = (id) => {
        if (garageItems.some(item => item.id === id)) {
            removeFromGarage(id);
        } else {
            addToGarage(id);
        }
    };

    const updateTag = (id, newTag) => {
        setGarageItems(prev => prev.map(item => 
            item.id === id ? { ...item, tag: newTag } : item
        ));
    };

    const isInGarage = (id) => garageItems.some(item => item.id === id);

    // Get tag for a vehicle
    const getTag = (id) => {
        const item = garageItems.find(i => i.id === id);
        return item ? item.tag : null;
    };

    // Derived data
    // Map vehicles to include their tag
    const garageVehicles = garageItems.map(item => {
        const vehicle = vehiclesData.find(v => v.id === item.id);
        if (!vehicle) return null;
        return { ...vehicle, savedTag: item.tag };
    }).filter(v => v !== null);
    
    // Legacy support for count
    const garageIds = garageItems.map(i => i.id);

    const value = {
        garageIds, // Kept for header count
        garageVehicles,
        addToGarage,
        removeFromGarage,
        toggleGarage,
        isInGarage,
        updateTag,
        getTag
    };

    return (
        <GarageContext.Provider value={value}>
            {children}
        </GarageContext.Provider>
    );
};
