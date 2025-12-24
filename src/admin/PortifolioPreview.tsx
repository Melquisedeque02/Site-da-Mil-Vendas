// src/admin/PortifolioPreview.tsx - CORRIGIDO
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Edit2, Save, Eye, Trash2, Plus, Upload, RefreshCw } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface PortfolioItemType {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  client: string;
  year: string;
  technologies: string[];
}

const PortifolioPreview: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const [editMode, setEditMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItemType[]>([]);

  // Carregar itens do sistema de conteúdo
  useEffect(() => {
    loadPortfolioItems();
  }, [settings]);

  const loadPortfolioItems = () => {
    const items: PortfolioItemType[] = [];
    
    // Procurar todos os itens de portfólio no sistema de conteúdo
    for (let i = 1; i <= 10; i++) {
      const title = settings[`portfolio_${i}_title`];
      const description = settings[`portfolio_${i}_description`];
      
      if (title || description) {
        // Obter tecnologias como array
        const techString = settings[`portfolio_${i}_tech`] || 'React,Node.js';
        const technologies = techString.split(',').map((tech: string) => tech.trim()).filter(Boolean);
        
        items.push({
          id: i,
          title: title || 'Sem título',
          description: description || 'Sem descrição',
          category: settings[`portfolio_${i}_category`] || 'Web Development',
          imageUrl: settings[`portfolio_${i}_image`] || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          client: settings[`portfolio_${i}_client`] || 'Cliente',
          year: settings[`portfolio_${i}_year`] || '2024',
          technologies
        });
      }
    }
    
    setPortfolioItems(items);
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    
    // Simular sincronização
    setTimeout(() => {
      loadPortfolioItems();
      setSyncStatus('success');
      
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1000);
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Alterações salvas! O conteúdo foi atualizado no sistema.');
  };

  const handleAddItem = () => {
    const nextId = portfolioItems.length > 0 ? Math.max(...portfolioItems.map(item => item.id)) + 1 : 1;
    const title = `Novo Projeto ${nextId}`;
    const description = 'Descrição do novo projeto. Edite este texto.';
    
    updateSetting(`portfolio_${nextId}_title`, title);
    updateSetting(`portfolio_${nextId}_description`, description);
    updateSetting(`portfolio_${nextId}_category`, 'Web Development');
    updateSetting(`portfolio_${nextId}_image`, 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80');
    updateSetting(`portfolio_${nextId}_client`, 'Novo Cliente');
    updateSetting(`portfolio_${nextId}_year`, new Date().getFullYear().toString());
    updateSetting(`portfolio_${nextId}_tech`, 'React,Node.js');
    
    alert('Novo item adicionado! Use o botão Sincronizar para ver as mudanças.');
  };

  const handleDeleteItem = (itemId: number) => {
    if (confirm('Tem certeza que deseja excluir este item do portfólio?')) {
      // Remover todas as chaves deste item
      const keys = ['title', 'description', 'category', 'image', 'client', 'year', 'tech'];
      keys.forEach(key => {
        updateSetting(`portfolio_${itemId}_${key}`, '');
      });
      
      alert('Item removido com sucesso!');
      setTimeout(handleSync, 500);
    }
  };

  const handleImageUpload = (itemId: number) => {
    // Em produção, isso faria upload real
    const imageUrl = prompt('Cole a URL da imagem:');
    if (imageUrl) {
      updateSetting(`portfolio_${itemId}_image`, imageUrl);
      alert('Imagem atualizada!');
    }
  };

  const categories = ['Web Development', 'Mobile App', 'Software', 'Design', 'Consultoria'];
  const techOptions = [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js', 'TypeScript',
    'Python', 'Django', 'Flask', 'Java', 'Spring', 'C#', '.NET',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Firebase', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pré-visualização: Portfólio</h1>
          <p className="text-slate-600 dark:text-gray-400">
            {portfolioItems.length} itens carregados do sistema
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw size={20} className={syncStatus === 'syncing' ? 'animate-spin' : ''} />
            {syncStatus === 'syncing' ? 'Sincronizando...' : 'Sincronizar'}
          </button>
          
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
          >
            {editMode ? <Eye size={20} /> : <Edit2 size={20} />}
            {editMode ? 'Visualizar' : 'Editar'}
          </button>
          
          {editMode && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all"
            >
              <Save size={20} />
              Salvar
            </button>
          )}
        </div>
      </div>

      {/* Status de Sincronização */}
      {syncStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <p className="text-green-700 dark:text-green-400 text-sm font-medium">
            ✓ Sincronização concluída! {portfolioItems.length} itens carregados.
          </p>
        </div>
      )}

      {/* Botão para adicionar novo item */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Itens do Portfólio ({portfolioItems.length})
        </h3>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all"
        >
          <Plus size={20} />
          Adicionar Novo Item
        </button>
      </div>

      {/* Grid do portfólio */}
      {portfolioItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
          <Image size={48} className="mx-auto text-slate-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Nenhum item no portfólio
          </h3>
          <p className="text-slate-600 dark:text-gray-400 mb-6">
            Adicione itens ao portfólio usando o botão acima.
          </p>
          <button
            onClick={handleAddItem}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            Criar Primeiro Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden group"
            >
              {/* Imagem com botão de upload */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {editMode && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleImageUpload(item.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all"
                    >
                      <Upload size={16} />
                      Alterar Imagem
                    </button>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-xs font-semibold text-white bg-blue-600 px-2 py-1 rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-4">
                {editMode ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateSetting(`portfolio_${item.id}_title`, e.target.value)}
                        placeholder="Título do projeto"
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-semibold"
                      />
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="ml-2 p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <textarea
                      value={item.description}
                      onChange={(e) => updateSetting(`portfolio_${item.id}_description`, e.target.value)}
                      placeholder="Descrição do projeto"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white text-sm"
                      rows={2}
                    />
                    
                    <select
                      value={item.category}
                      onChange={(e) => updateSetting(`portfolio_${item.id}_category`, e.target.value)}
                      className="w-full px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.client}
                        onChange={(e) => updateSetting(`portfolio_${item.id}_client`, e.target.value)}
                        placeholder="Cliente"
                        className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-xs"
                      />
                      
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => updateSetting(`portfolio_${item.id}_year`, e.target.value)}
                        placeholder="Ano"
                        className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1">
                        Tecnologias (separadas por vírgula)
                      </label>
                      <input
                        type="text"
                        value={item.technologies.join(',')}
                        onChange={(e) => updateSetting(`portfolio_${item.id}_tech`, e.target.value)}
                        placeholder="React,Node.js,MongoDB"
                        className="w-full px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-xs"
                      />
                      <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
                        Sugestões: {techOptions.slice(0, 5).join(', ')}...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.technologies.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-gray-400 text-xs rounded">
                          +{item.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-gray-500">
                      <span className="font-medium">{item.client}</span>
                      <span>{item.year}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Painel de controle */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Controles do Portfólio</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              <strong>Como funciona:</strong> Os itens são salvos no sistema de conteúdo. 
              Use "Sincronizar" para ver as mudanças refletidas.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleSync}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              <RefreshCw size={16} />
              Forçar Sincronização
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all">
              Publicar no Site
            </button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <h4 className="font-medium text-slate-700 dark:text-gray-300 mb-2">Dicas:</h4>
          <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
            <li>• As mudanças aparecem automaticamente após sincronização</li>
            <li>• Para upload de imagens, cole URLs de serviços como Unsplash</li>
            <li>• As tecnologias devem ser separadas por vírgulas</li>
            <li>• A organização dos itens é mantida automaticamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PortifolioPreview;