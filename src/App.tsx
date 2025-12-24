// App.tsx - ATUALIZADO com novas páginas
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { AppearanceProvider } from './context/AppearanceProvider';
import { AuthProvider } from './context/AuthContext';
import Splash from './components/Splash';
import Customizer from './components/Customizer';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsappButton from './components/WhatsappButton';

// Páginas públicas
import Hero from './pages/Hero';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Events from './pages/Events';
import Portfolio from './pages/Portfolio';

// Admin components
import Login from './auth/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import EventosPreview from './admin/EventosPreview';
import PortifolioPreview from './admin/PortifolioPreview';
import ContactosPreview from './admin/ContactosPreview';

import logoMv from './assets/logo-mv.svg';

// Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  return <>{children}</>;
};

// Componente para a página principal com âncoras
const MainPage: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <main>
        <section id="home"><Hero /></section>
        <section id="servicos"><Services /></section>
        <section id="sobre"><About /></section>
        <section id="contacto"><Contact /></section>
      </main>
      <Footer />
      <WhatsappButton />
    </>
  );
};

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [showCustomizer, setShowCustomizer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      const skip = localStorage.getItem('skipCustomizer');
      if (skip !== 'true') {
        setShowCustomizer(true);
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500">
      <AnimatePresence mode="wait">
        {showSplash && <Splash key="splash" />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <AnimatePresence>
            {showCustomizer && (
              <Customizer 
                key="customizer" 
                onComplete={() => setShowCustomizer(false)} 
              />
            )}
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white overflow-x-hidden relative"
          >
            {/* MARCA D'ÁGUA GLOBAL */}
            <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
              <motion.img 
                src={logoMv} 
                alt="" 
                animate={{ opacity: 0.05, scale: 1.1 }} 
                className="w-[85%] md:w-[55%] filter brightness-0 dark:invert transition-all duration-500" 
              />
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="relative z-10 text-slate-900 dark:text-white transition-colors duration-500">
              <Routes>
                {/* Rota raiz */}
                <Route path="/" element={<MainPage />} />
                
                {/* Páginas separadas */}
                <Route path="/events" element={
                  <>
                    <Navbar />
                    <Events />
                    <Footer />
                    <WhatsappButton />
                  </>
                } />
                
                <Route path="/portfolio" element={
                  <>
                    <Navbar />
                    <Portfolio />
                    <Footer />
                    <WhatsappButton />
                  </>
                } />
                
                {/* Rotas de autenticação */}
                <Route path="/auth/login" element={<Login />} />
                
                {/* Rotas protegidas do admin */}
                <Route path="/auth/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="eventos" element={<EventosPreview />} />
                  <Route path="portifolio" element={<PortifolioPreview />} />
                  <Route path="contactos" element={<ContactosPreview />} />
                </Route>
                
                {/* Rota catch-all para redirecionar para a raiz */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppearanceProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppearanceProvider>
  );
}