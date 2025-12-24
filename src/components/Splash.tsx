import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoMv from '../assets/logo-mv.svg';

const phrases = [
  "Iniciando sistemas...",
  "Analisando métricas de mercado...",
  "Otimizando sua experiência personalizada...",
  "Carregando soluções de consultoria...",
  "Conectando você à Mil Vendas..."
];

const Splash = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    // 1100ms * 5 frases = 5.5s (dá uma margem de 0.5s antes do Splash fechar)
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev < phrases.length - 1 ? prev + 1 : prev));
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo com brilho */}
        <motion.div
          animate={{ 
            filter: ["drop-shadow(0 0 0px #3B82F6)", "drop-shadow(0 0 20px #3B82F6)", "drop-shadow(0 0 0px #3B82F6)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <img
            src={logoMv}
            alt="Logo"
            className="w-32 h-32 mb-8 filter brightness-0 invert"
          />
        </motion.div>

        {/* Barra de Progresso Sincronizada com 6s */}
        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.8, ease: "linear" }}
          />
        </div>

        {/* Frases Dinâmicas */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase text-center"
            >
              {phrases[currentPhrase]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Splash;