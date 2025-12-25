// src/context/AuthContext.tsx - CORRIGIDO
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 
'react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  loginTime: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const auth = localStorage.getItem('admin_authenticated');
      const userData = localStorage.getItem('admin_user');
      
      if (auth === 'true' && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Credenciais hardcoded (serão fornecidas pelo desenvolvedor)
      const validCredentials = {
        email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@milvendas.com',
        password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
      };

      if (email === validCredentials.email && password === validCredentials.password) {
        const userData: User = {
          id: 1,
          email: email,
          name: 'Administrador',
          role: 'admin',
          loginTime: new Date().toISOString()
        };

        setIsAuthenticated(true);
        setUser(userData);
        
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_user', JSON.stringify(userData));
        localStorage.setItem('admin_token', Date.now().toString());
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
  };

  // Se ainda está carregando, mostrar nada (evita flash azul)
  if (loading) {
    return <div className="min-h-screen bg-slate-900" />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};