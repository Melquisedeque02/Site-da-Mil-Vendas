import React from 'react';
import { motion } from 'framer-motion';
import logoMv from '../assets/logo-mv.svg';
import { useSettings } from '../hooks/useSettings';

const Hero = () => {
  const { settings, loading } = useSettings();

  const defaultContent = {
    title_part1: "Tecnologia que",
    title_highlight: "Conecta e Inova",
    description: "A Mil Vendas entrega soluções digitais robustas, focadas na melhor experiência para o seu cliente.",
    button_text: "Contactar Equipa",
    whatsapp_number: "244922965959"
  };

  const content = {
    title_part1: settings['hero_title_1'] || defaultContent.title_part1,
    title_highlight: settings['hero_title_highlight'] || defaultContent.title_highlight,
    description: settings['hero_description'] || defaultContent.description,
    button_text: settings['hero_button_text'] || defaultContent.button_text,
    whatsapp: settings['hero_whatsapp'] || defaultContent.whatsapp_number
  };

  const whatsappUrl = `https://wa.me/${content.whatsapp}?text=Olá! Gostaria de falar sobre um projeto com a Mil Vendas.`;

  if (loading && Object.keys(settings).length === 0) {
    // Skeleton adaptável ao tema
    return <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-500" />; 
  }

  return (
    <section id="hero" className="min-h-screen flex items-center relative px-6 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          {/* Cor alterada para text-slate-900 (light) e text-white (dark) */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight transition-colors duration-500">
            {content.title_part1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
              {content.title_highlight}
            </span>
          </h1>
          
          {/* Cor do parágrafo ajustada para contraste em ambos os modos */}
          <p className="mt-8 text-xl text-slate-600 dark:text-gray-400 max-w-lg transition-colors duration-500">
            {content.description}
          </p>

          <div className="mt-10 flex gap-4">
            <motion.a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold shadow-lg transition-all text-lg"
            >
              {content.button_text}
            </motion.a>
          </div>
        </motion.div>

        {/* LOGO SVG com filtro inteligente */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex-1 flex justify-center"
        >
          <img 
            src={logoMv} 
            alt="Mil Vendas" 
            className="w-72 h-72 md:w-[500px] md:h-[500px] object-contain filter drop-shadow-[0_0_40px_rgba(59,130,246,0.2)] brightness-0 dark:invert transition-all duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;