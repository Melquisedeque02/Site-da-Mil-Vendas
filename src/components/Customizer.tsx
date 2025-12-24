import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppearance } from '../hooks/useAppearance';
import { Sun, Moon, Type } from 'lucide-react';
import type { Font } from '../context/AppearanceContext';

const Customizer = ({ onComplete }: { onComplete: () => void }) => {
  // Removing "as any" fixes the ESLint error
  const { theme, setTheme, font, setFont, persistSettings } = useAppearance();
  const [dontShowAgain] = useState(false);

  const handleFinish = () => {
    persistSettings();
    if (dontShowAgain) {
      localStorage.setItem('skipCustomizer', 'true');
    }
    onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl text-slate-900 dark:text-white transition-colors duration-500">
        <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">Personalize sua Experiência</h2>
        
        {/* Theme Toggles */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <Moon size={14}/> Visualização
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 dark:border-slate-700'}`}
            >
              <Sun size={20} className={theme === 'light' ? 'text-blue-600' : ''} />
              <span className="text-sm font-medium">Claro</span>
            </button>
            <button 
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-slate-200 dark:border-slate-700'}`}
            >
              <Moon size={20} className={theme === 'dark' ? 'text-blue-400' : ''} />
              <span className="text-sm font-medium">Escuro</span>
            </button>
          </div>
        </div>

        {/* Font Selection */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <Type size={14}/> Tipografia
          </p>
          <div className="flex gap-2">
            {(['font-sans', 'font-serif', 'font-mono'] as Font[]).map((f) => (
              <button 
                key={f} 
                type="button"
                onClick={() => setFont(f)}
                className={`flex-1 py-3 rounded-lg border text-sm transition-all ${font === f ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}
              >
                {f.split('-')[1].toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="button"
          onClick={handleFinish}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all"
        >
          Explorar Mil Vendas
        </button>
      </div>
    </motion.div>
  );
};

export default Customizer;