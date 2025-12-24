import React from 'react';
import { motion } from 'framer-motion';
import logoMv from '../assets/logo-mv.svg';
import { useSettings } from '../hooks/useSettings';

const About = () => {
  const { settings, loading } = useSettings();

  const defaultContent = {
    title: "Compromisso com a Excelência",
    description: "A Mil Vendas não é apenas uma agência, é o seu braço direito tecnológico em Luanda. Utilizamos a marca \"mv\" como símbolo da nossa agilidade e precisão.",
    features: ['Desenvolvimento Nativo', 'Cloud Computing', 'Segurança de Dados']
  };

  const content = {
    title: settings['about_title'] || defaultContent.title,
    description: settings['about_description'] || defaultContent.description,
    features: [
      settings['about_feature_1'] || defaultContent.features[0],
      settings['about_feature_2'] || defaultContent.features[1],
      settings['about_feature_3'] || defaultContent.features[2],
    ]
  };

  if (loading && Object.keys(settings).length === 0) {
    return <div className="py-24 bg-white dark:bg-slate-900 min-h-[500px] transition-colors duration-500" />;
  }

  return (
    <section id="sobre" className="py-24 bg-white dark:bg-slate-800/10 text-slate-900 dark:text-white relative px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center order-2 md:order-1"
        >
          <div className="relative">
            {/* Brilho de fundo adaptado para não estourar no modo claro */}
            <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/20 blur-[100px] rounded-full transition-colors duration-500"></div>
            <img 
              src={logoMv} 
              alt="Sobre MV" 
              className="relative z-10 w-72 h-72 md:w-96 md:h-96 object-contain filter brightness-0 dark:invert drop-shadow-2xl transition-all duration-500" 
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <h2 className="text-4xl font-bold mb-6 transition-colors duration-500">{content.title}</h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed mb-6 transition-colors duration-500">
            {content.description}
          </p>
          <ul className="space-y-4">
            {content.features.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600/10 dark:bg-blue-600/20 rounded flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold transition-colors duration-500">
                  ✓
                </div>
                <span className="text-slate-700 dark:text-gray-200 transition-colors duration-500">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;