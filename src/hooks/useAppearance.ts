import { useContext } from 'react';
import { AppearanceContext } from '../context/AppearanceContext';
import type { AppearanceContextType } from '../context/AppearanceContext';

export function useAppearance(): AppearanceContextType {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance deve ser usado dentro de um AppearanceProvider');
  }
  return context;
}