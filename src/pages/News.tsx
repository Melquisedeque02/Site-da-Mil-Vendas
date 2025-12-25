// src/pages/News.tsx - CÓDIGO COMPLETO ATUALIZADO
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Tag, ArrowRight, Search, Filter, BookOpen, TrendingUp } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface NewsItemType {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const News = () => {
  const { settings } = useSettings();
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<NewsItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItemType | null>(null);

  // Carregar notícias do sistema de conteúdo
  useEffect(() => {
    loadNewsFromContent();
  }, [settings]);

  useEffect(() => {
    filterNews();
  }, [newsItems, selectedCategory, searchTerm]);

  const loadNewsFromContent = () => {
    const items: NewsItemType[] = [];
    
    // Procurar todas as notícias no sistema de conteúdo
    for (let i = 1; i <= 20; i++) {
      const title = settings[`news_${i}_title`];
      const excerpt = settings[`news_${i}_excerpt`];
      
      if (title || excerpt) {
        // Processar tags
        const tagsString = settings[`news_${i}_tags`] || 'Tecnologia,Inovação';
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
        
        items.push({
          id: i,
          title: title || 'Novo Artigo',
          excerpt: excerpt || 'Resumo do artigo será exibido aqui.',
          content: settings[`news_${i}_content`] || 'Conteúdo completo do artigo...',
          author: settings[`news_${i}_author`] || 'Equipa Mil Vendas',
          date: settings[`news_${i}_date`] || new Date().toLocaleDateString('pt-AO'),
          readTime: settings[`news_${i}_read_time`] || '5 min',
          category: settings[`news_${i}_category`] || 'Tecnologia',
          tags,
          image: settings[`news_${i}_image`] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          featured: settings[`news_${i}_featured`] === 'true'
        });
      }
    }
    
    // Ordenar por data (mais recente primeiro)
    const sortedItems = items.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    setNewsItems(sortedItems);
  };

  const filterNews = () => {
    let filtered = [...newsItems];
    
    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filtrar por pesquisa
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredItems(filtered);
  };

  const categories = ['all', ...Array.from(new Set(newsItems.map(item => item.category)))];
  const allTags = Array.from(new Set(newsItems.flatMap(item => item.tags))).slice(0, 10);
  const featuredArticles = newsItems.filter(item => item.featured).slice(0, 2);

  if (newsItems.length === 0) {
    return (
      <section id="noticias" className="min-h-screen py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">
              Notícias & Artigos
            </h2>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Em Breve
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Estamos preparando conteúdo valioso sobre tecnologia, inovação e tendências do mercado.
            </p>
          </motion.div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
            <BookOpen size={64} className="mx-auto text-slate-400 dark:text-gray-500 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ainda não há artigos publicados
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Nossa equipa está preparando conteúdo relevante para compartilhar conhecimento 
              e manter você atualizado sobre as últimas tendências tecnológicas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                Voltar ao Início
              </button>
              <a 
                href="#contacto"
                className="px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold rounded-xl transition-all"
              >
                Contactar Equipa
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="min-h-screen py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">
            Notícias & Artigos
          </h2>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Blog & Notícias
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 max-w-3xl mx-auto">
            Fique por dentro das últimas novidades, tendências tecnológicas e insights da nossa equipa.
          </p>
        </motion.div>

        {/* Barra de pesquisa e filtros */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Barra de pesquisa */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtro de categoria */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600 dark:text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas Categorias</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags populares */}
          {allTags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-slate-700 dark:text-gray-300 font-medium flex items-center gap-2">
                <Tag size={16} />
                Tags populares:
              </span>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-gray-300 text-sm rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Artigos em Destaque */}
        {featuredArticles.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Em Destaque</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-slate-50 dark:bg-slate-800/50 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                        DESTAQUE
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.readTime} de leitura
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-gray-400">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-slate-500 dark:text-gray-500" />
                        <span className="text-sm text-slate-700 dark:text-gray-300">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        Ler artigo
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Lista de Artigos */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Todos os Artigos ({filteredItems.length})
            </h3>
            <span className="text-slate-600 dark:text-gray-400 text-sm">
              Mostrando {Math.min(filteredItems.length, 12)} de {newsItems.length}
            </span>
          </div>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-slate-400 dark:text-gray-500 mb-4" />
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Nenhum artigo encontrado
              </h4>
              <p className="text-slate-600 dark:text-gray-400">
                Tente alterar os filtros ou termos de pesquisa.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.slice(0, 12).map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-xs font-semibold text-white bg-blue-600/80 backdrop-blur-sm px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-gray-400 mb-3">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    
                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-600">
                      <span className="text-sm text-slate-700 dark:text-gray-300 flex items-center gap-1">
                        <User size={12} />
                        {article.author}
                      </span>
                      <ArrowRight size={16} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter para Notícias */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/5 dark:to-blue-600/5 p-8 rounded-3xl border border-blue-500/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Não perca nenhuma notícia
              </h3>
              <p className="text-slate-600 dark:text-gray-400">
                Receba os artigos mais recentes diretamente no seu email
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => alert('Obrigado por subscrever!')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Subscrever
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-500 text-center mt-3">
                Prometemos não enviar spam. Você pode cancelar a qualquer momento.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modal de Artigo Completo */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/50 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full my-8"
            >
              <div className="relative">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full">
                      {selectedArticle.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {selectedArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {selectedArticle.readTime} de leitura
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {selectedArticle.author}
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    {selectedArticle.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 text-sm rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed mb-6">
                    {selectedArticle.excerpt}
                  </p>
                  
                  <div className="text-slate-700 dark:text-gray-300 space-y-4">
                    {selectedArticle.content.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Compartilhe este artigo
                  </h4>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => alert('Compartilhado no Facebook!')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                    >
                      Facebook
                    </button>
                    <button 
                      onClick={() => alert('Compartilhado no Twitter!')}
                      className="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all"
                    >
                      Twitter
                    </button>
                    <button 
                      onClick={() => alert('Compartilhado no LinkedIn!')}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all"
                    >
                      LinkedIn
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/?text=Confira este artigo: ${selectedArticle.title}`, '_blank')}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
                    >
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;