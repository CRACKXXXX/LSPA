import React, { createContext, useState, useEffect, useContext } from 'react';
import vehiclesData from '../data/vehicles.json';
import { useAuth } from './AuthContext';

const GarageContext = createContext();

export const useGarage = () => {
    return useContext(GarageContext);
};

export const GarageProvider = ({ children }) => {
    const { user, updateUser } = useAuth();
    
    // Load initial state from local storage (For Guest)
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

    // Track previous user to distinguish Logout vs Initial Load
    const prevUserRef = React.useRef(undefined);

    // 1. Sync State on User Change (Login/Logout)
    useEffect(() => {
        const prevUser = prevUserRef.current;
        
        if (user) {
            // User Logged In: Load their garage
            const userGarageIds = user.garage || [];
            const mapped = userGarageIds.map(item => {
                if (typeof item === 'string') return { id: item, tag: 'PENDIENTE' };
                return item;
            });
            setGarageItems(mapped);
        } else {
            // User is NULL (Guest or Logout)
            if (prevUser) {
                // LOGOUT DETECTED: Clear garage state (Don't load old guest data)
                setGarageItems([]);
                // Optional: Clear guest storage to prevent it coming back on refresh?
                // localStorage.removeItem('lspa_garage_guest'); 
            } else {
                // INITIAL LOAD (Guest): Try to load guest persistence
                const guestGarage = localStorage.getItem('lspa_garage_guest');
                if (guestGarage) {
                    try {
                        setGarageItems(JSON.parse(guestGarage));
                    } catch { setGarageItems([]); }
                } else {
                    setGarageItems([]);
                }
            }
        }
        
        // Update Ref
        prevUserRef.current = user;
    }, [user]); // Runs when user object changes identity

    // 2. Persist State (Two Paths)
    useEffect(() => {
        if (user) {
            // If User: Save to Auth Profile DO NOT CALL updateUser HERE TO AVOID LOOPS
            // We only want to persist when ACTIONS happen, not when state changes (which might be caused by updateUser)
            // ... Actually, the standard React pattern is state -> effect -> persistence.
            // But updateUser changes 'user', which triggers the effect above.
            // So we need to be careful. 
            // Better strategy: update persistence INSIDE actions (addToGarage, etc).
        } else {
            // If Guest: Save to LocalStorage
            localStorage.setItem('lspa_garage_guest', JSON.stringify(garageItems));
        }
    }, [garageItems, user]);

    const saveGarageState = (newItems) => {
        setGarageItems(newItems);
        if (user) {
            // Persist to User Profile
            // We map back to just the format the User DB expects (array of objects {id, tag} or strings)
            // Let's store full objects to keep tags.
            updateUser({ garage: newItems });
        }
    };

    const addToGarage = (id) => {
        if (!garageItems.some(item => item.id === id)) {
            const newItem = { id, tag: 'PENDIENTE' };
            const newGarage = [...garageItems, newItem];
            saveGarageState(newGarage);
        }
    };

    const removeFromGarage = (id) => {
        const newGarage = garageItems.filter(item => item.id !== id);
        saveGarageState(newGarage);
    };

    const toggleGarage = (id) => {
        if (garageItems.some(item => item.id === id)) {
            removeFromGarage(id);
        } else {
            addToGarage(id);
        }
    };

    const updateTag = (id, newTag) => {
        const newGarage = garageItems.map(item => 
            item.id === id ? { ...item, tag: newTag } : item
        );
        saveGarageState(newGarage);
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
