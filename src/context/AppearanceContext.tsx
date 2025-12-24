import { createContext } from 'react';

export type Theme = 'dark' | 'light';
export type Font = 'font-sans' | 'font-serif' | 'font-mono';

export interface AppearanceContextType {
  theme: Theme;
  font: Font;
  setTheme: (t: Theme) => void;
  setFont: (f: Font) => void;
  persistSettings: () => void;
}

export const AppearanceContext = createContext<AppearanceContextType | undefined>(undefined);