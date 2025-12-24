// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Em produção, isso seria uma chamada à API
    // Por enquanto, credenciais hardcoded (serão fornecidas pelo desenvolvedor)
    const validCredentials = {
      email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@milvendas.com',
      password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
    };

    if (email === validCredentials.email && password === validCredentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};