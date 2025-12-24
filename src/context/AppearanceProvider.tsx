import React, { useState, useEffect } from 'react';
import { AppearanceContext } from './AppearanceContext';
import type { AppearanceContextType, Theme, Font } from './AppearanceContext';

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => 
    (localStorage.getItem('theme') as Theme) || 'dark'
  );
  const [font, setFont] = useState<Font>(() => 
    (localStorage.getItem('font') as Font) || 'font-sans'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'font-sans', 'font-serif', 'font-mono');
    root.classList.add(theme, font);
  }, [theme, font]);

  const persistSettings = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('font', font);
  };

  const value: AppearanceContextType = { theme, font, setTheme, setFont, persistSettings };

  return (
    <AppearanceContext.Provider value={value}>
      {children}
    </AppearanceContext.Provider>
  );
}