/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { TourContextType } from '../../types/tour';



const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const openTour = () => setIsTourOpen(true);
  const closeTour = () => setIsTourOpen(false);

  return (
    <TourContext.Provider value={{ isTourOpen, openTour, closeTour }}>
      {children}
    </TourContext.Provider>
  );
};