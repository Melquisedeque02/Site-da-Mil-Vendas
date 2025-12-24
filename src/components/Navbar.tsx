// src/components/Navbar.tsx - ATUALIZADO
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoMv from '../assets/logo-mv.svg';
import { useAppearance } from '../hooks/useAppearance';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useAppearance();

  // Mapeamento das rotas
  const navLinks = [
    { name: 'Serviços', href: '#servicos' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Portfólio', href: '/portfolio', external: false },
    { name: 'Eventos', href: '/events', external: false },
    { name: 'Contacto', href: '#contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 px-6 
      ${scrolled 
        ? 'py-3 bg-slate-950/95 backdrop-blur-md shadow-2xl border-b border-white/5' 
        : 'py-5 bg-gradient-to-b from-slate-950/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <a href="#home" className="flex items-center gap-2 group">
          <img 
            src={logoMv} 
            alt="Logo" 
            className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 !invert transition-transform group-hover:scale-110" 
          />
          <span className="text-xl md:text-2xl font-bold !text-white tracking-tighter">
            MIL VENDAS
          </span>
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          {/* LINKS DE NAVEGAÇÃO */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.external === false ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="!text-gray-400 hover:!text-white transition-all font-medium text-xs uppercase tracking-[0.2em] relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="!text-gray-400 hover:!text-white transition-all font-medium text-xs uppercase tracking-[0.2em] relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </a>
              )
            ))}
          </div>

          {/* ÁREA ADMIN */}
          <Link
            to="/auth/login"
            className="flex items-center gap-2 !text-gray-400 hover:!text-white transition-all font-medium text-xs uppercase tracking-[0.2em] group"
          >
            <LogIn size={16} />
            <span>Admin</span>
          </Link>

          {/* TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 !text-white hover:bg-white/10 transition-all"
            title="Alternar Modo Claro/Escuro"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div key="sun" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                  <Sun size={18} className="text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                  <Moon size={18} className="text-blue-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;