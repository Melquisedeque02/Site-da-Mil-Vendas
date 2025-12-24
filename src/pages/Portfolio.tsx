// src/pages/Portfolio.tsx - ATUALIZADO para sistema de conteúdo
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Smartphone, Globe, Filter, Eye } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface PortfolioItemType {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  client: string;
  year: string;
  icon: React.ReactNode;
  details: string;
}

const Portfolio = () => {
  const { settings } = useSettings();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([]);

  // Carregar itens do sistema de conteúdo
  useEffect(() => {
    loadPortfolioFromContent();
  }, [settings]);

  const loadPortfolioFromContent = () => {
    const items: PortfolioItemType[] = [];
    const categoryIcons: Record<string, React.ReactNode> = {
      'Web Development': <Globe className="w-6 h-6" />,
      'Mobile App': <Smartphone className="w-6 h-6" />,
      'Software': <Code className="w-6 h-6" />,
      'Design': <Globe className="w-6 h-6" />,
      'Consultoria': <Code className="w-6 h-6" />
    };

    // Procurar todos os itens de portfólio no sistema de conteúdo
    for (let i = 1; i <= 10; i++) {
      const title = settings[`portfolio_${i}_title`];
      const description = settings[`portfolio_${i}_description`];
      
      if (title || description) {
        const category = settings[`portfolio_${i}_category`] || 'Web Development';
        const techString = settings[`portfolio_${i}_tech`] || 'React,Node.js';
        const technologies = techString.split(',').map(tech => tech.trim()).filter(Boolean);
        
        items.push({
          id: i,
          title: title || 'Projeto sem título',
          category,
          description: description || 'Descrição do projeto será adicionada em breve.',
          image: settings[`portfolio_${i}_image`] || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          technologies,
          liveUrl: '#',
          caseStudyUrl: '#',
          client: settings[`portfolio_${i}_client`] || 'Cliente',
          year: settings[`portfolio_${i}_year`] || '2024',
          icon: categoryIcons[category] || <Globe className="w-6 h-6" />,
          details: description || 'Detalhes do projeto serão adicionados em breve.'
        });
      }
    }

    // Se não houver itens, mostrar alguns exemplos padrão
    if (items.length === 0) {
      items.push(
        {
          id: 1,
          title: 'Adicione seu primeiro projeto',
          category: 'Web Development',
          description: 'Use o painel admin para adicionar projetos ao portfólio.',
          image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          technologies: ['React', 'Node.js'],
          liveUrl: '#',
          caseStudyUrl: '#',
          client: 'Mil Vendas',
          year: '2024',
          icon: <Globe className="w-6 h-6" />,
          details: 'Este é um exemplo. Adicione seus projetos reais através do painel administrativo.'
        }
      );
    }

    setPortfolioItems(items);
  };

  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="min-h-screen py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">
            Nosso Trabalho
          </h2>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Portfólio
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {portfolioItems.length > 1 
              ? `Conheça os ${portfolioItems.length} projetos que desenvolvemos para nossos clientes.`
              : 'Adicione seus projetos através do painel administrativo.'}
          </p>
        </motion.div>

        {/* Filtros (só mostrar se houver múltiplas categorias) */}
        {categories.length > 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
              <Filter size={18} className="text-slate-600 dark:text-gray-400" />
              <span className="text-slate-700 dark:text-gray-300 font-medium">Filtrar:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid do Portfólio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all"
            >
              {/* Imagem */}
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(item.id)}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Eye size={40} className="text-white" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <div className="text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>
                
                {/* Tecnologias */}
                {item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-gray-400 text-xs font-medium rounded-full">
                        +{item.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProject(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all"
                    >
                      Ver Detalhes
                      <Eye size={16} />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500 dark:text-gray-500">{item.client}</div>
                    <div className="text-xs text-slate-400 dark:text-gray-600">{item.year}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de Detalhes */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {(() => {
                const project = portfolioItems.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <>
                    <div className="relative">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="p-6 md:p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full mb-2">
                            {project.category}
                          </span>
                          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {project.title}
                          </h2>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-600 dark:text-gray-400">Cliente</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{project.client}</p>
                          <p className="text-slate-500 dark:text-gray-500 text-sm">{project.year}</p>
                        </div>
                      </div>
                      
                      <p className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                        {project.details}
                      </p>
                      
                      {project.technologies.length > 0 && (
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tecnologias Utilizadas</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium rounded-lg"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-4">
                        <a 
                          href={`https://wa.me/${settings['hero_whatsapp'] || '244922965959'}?text=Olá! Gostaria de falar sobre um projeto similar ao "${project.title}"`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2"
                        >
                          Solicitar Orçamento Similar
                        </a>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/5 dark:to-blue-600/5 p-8 rounded-3xl border border-blue-500/20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Tem um projeto em mente?
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Vamos transformar sua ideia em uma solução digital de sucesso.
            </p>
            <a 
              href={`https://wa.me/${settings['hero_whatsapp'] || '244922965959'}?text=Olá! Gostaria de falar sobre um projeto`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
            >
              Falar com Especialista
              <ExternalLink size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;