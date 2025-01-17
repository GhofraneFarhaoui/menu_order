import React, { createContext, useContext, useState, ReactNode } from 'react';

type Settings = {
  activeMenu: string;
  inactiveMenu: string;
  background: string;
  category: string;
  typography: string;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

const defaultSettings: Settings = {
  activeMenu: '#FFFFFF',
  inactiveMenu: '#FF5C5C',
  background: '#FFFFFF',
  category: '#FF5C5C',
  typography: 'Baloo Bhaina 2',
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
