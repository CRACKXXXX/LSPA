import React, { createContext, useState, useContext, useEffect } from 'react';

const GarageContext = createContext();

export const useGarage = () => useContext(GarageContext);

export const GarageProvider = ({ children }) => {
  const [garage, setGarage] = useState(() => {
    const saved = localStorage.getItem('lspa_garage');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lspa_garage', JSON.stringify(garage));
  }, [garage]);

  const addToGarage = (car) => {
    if (!garage.find(c => c.id === car.id)) {
      setGarage([...garage, car]);
    }
  };

  const removeFromGarage = (carId) => {
    setGarage(garage.filter(c => c.id !== carId));
  };

  const isInGarage = (carId) => {
    return garage.some(c => c.id === carId);
  };

  const getGarageValue = () => {
    return garage.reduce((total, car) => total + car.price, 0);
  };

  return (
    <GarageContext.Provider value={{ garage, addToGarage, removeFromGarage, isInGarage, getGarageValue }}>
      {children}
    </GarageContext.Provider>
  );
};
