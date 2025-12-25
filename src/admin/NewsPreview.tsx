// src/admin/NewsPreview.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Edit2, Save, Eye, Trash2, Plus, Upload, RefreshCw, X, Calendar, User, Clock, Tag, Star } from 'lucide-react';
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

const NewsPreview: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const [editMode, setEditMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [newsItems, setNewsItems] = useState<NewsItemType[]>([]);
  const [uploadingImage, setUploadingImage] = useState<{itemId: number | null, preview: string}>({ itemId: null, preview: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const categories = ['Tecnologia', 'Negócios', 'Inovação', 'Desenvolvimento', 'Marketing', 'Design', 'Carreira'];
  const tagOptions = ['React', 'Angular', 'Vue', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Cloud', 'IA', 'Machine Learning', 'DevOps', 'Startup', 'Produtividade', 'UX/UI'];

  // Carregar notícias do sistema de conteúdo
  useEffect(() => {
    loadNewsItems();
  }, [settings]);

  const loadNewsItems = () => {
    const items: NewsItemType[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const title = settings[`news_${i}_title`];
      const excerpt = settings[`news_${i}_excerpt`];
      
      if (title || excerpt) {
        const tagsString = settings[`news_${i}_tags`] || 'Tecnologia,Inovação';
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
        
        // Verificar se a imagem é base64 ou URL
        let image = settings[`news_${i}_image`] || 
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
        
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
          image,
          featured: settings[`news_${i}_featured`] === 'true'
        });
      }
    }
    
    // Ordenar por ID (mais recente primeiro)
    const sortedItems = items.sort((a, b) => b.id - a.id);
    setNewsItems(sortedItems);
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    
    setTimeout(() => {
      loadNewsItems();
      setSyncStatus('success');
      
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1000);
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Alterações salvas! As notícias foram atualizadas no sistema.');
  };

  const handleAddItem = () => {
    const nextId = newsItems.length > 0 ? Math.max(...newsItems.map(item => item.id)) + 1 : 1;
    const today = new Date().toLocaleDateString('pt-AO');
    
    updateSetting(`news_${nextId}_title`, `Novo Artigo ${today}`);
    updateSetting(`news_${nextId}_excerpt`, 'Resumo do artigo. Edite este texto para descrever seu conteúdo.');
    updateSetting(`news_${nextId}_content`, 'Conteúdo completo do artigo...\n\nAdicione parágrafos separados por linhas.\n\nUse este espaço para escrever conteúdo detalhado.');
    updateSetting(`news_${nextId}_author`, 'Equipa Mil Vendas');
    updateSetting(`news_${nextId}_date`, today);
    updateSetting(`news_${nextId}_read_time`, '5 min');
    updateSetting(`news_${nextId}_category`, 'Tecnologia');
    updateSetting(`news_${nextId}_tags`, 'Tecnologia,Inovação');
    updateSetting(`news_${nextId}_image`, 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80');
    updateSetting(`news_${nextId}_featured`, 'false');
    
    alert('Novo artigo adicionado! Use o botão Sincronizar para ver as mudanças.');
  };

  const handleDeleteItem = (itemId: number) => {
    if (confirm('Tem certeza que deseja excluir este artigo?')) {
      const keys = ['title', 'excerpt', 'content', 'author', 'date', 'read_time', 'category', 'tags', 'image', 'featured'];
      keys.forEach(key => {
        updateSetting(`news_${itemId}_${key}`, '');
      });
      
      alert('Artigo removido com sucesso!');
      setTimeout(handleSync, 500);
    }
  };

  const handleImageUpload = (itemId: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.itemId = itemId.toString();
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const itemId = e.target.dataset.itemId ? parseInt(e.target.dataset.itemId) : null;

    if (!file || !itemId) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem é muito grande. Por favor, selecione uma imagem menor que 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      setUploadingImage({ itemId, preview: imageUrl });
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const confirmImageUpload = () => {
    if (uploadingImage.itemId && uploadingImage.preview) {
      updateSetting(`news_${uploadingImage.itemId}_image`, uploadingImage.preview);
      setUploadingImage({ itemId: null, preview: '' });
      alert('Imagem atualizada com sucesso!');
      setTimeout(() => handleSync(), 500);
    }
  };

  const cancelImageUpload = () => {
    setUploadingImage({ itemId: null, preview: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pré-visualização: Notícias</h1>
          <p className="text-slate-600 dark:text-gray-400">
            {newsItems.length} artigos carregados do sistema
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
            ✓ Sincronização concluída! {newsItems.length} artigos carregados.
          </p>
        </div>
      )}

      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Modal de Preview da Imagem */}
      {uploadingImage.preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pré-visualização da Imagem</h3>
                <button
                  onClick={cancelImageUpload}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <X size={24} className="text-slate-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="mb-6">
                <img 
                  src={uploadingImage.preview} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-2 text-center">
                  Esta será a nova imagem do artigo
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={confirmImageUpload}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Confirmar Upload
                </button>
                <button
                  onClick={cancelImageUpload}
                  className="flex-1 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Botão para adicionar novo artigo */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Artigos ({newsItems.length})
        </h3>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all"
        >
          <Plus size={20} />
          Novo Artigo
        </button>
      </div>

      {/* Grid de artigos */}
      {newsItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
          <BookOpen size={48} className="mx-auto text-slate-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Nenhum artigo publicado
          </h3>
          <p className="text-slate-600 dark:text-gray-400 mb-6">
            Adicione artigos usando o botão acima.
          </p>
          <button
            onClick={handleAddItem}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            Criar Primeiro Artigo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden group"
            >
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {item.featured && (
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Star size={10} />
                      Destaque
                    </span>
                  )}
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-5">
                {editMode ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateSetting(`news_${item.id}_title`, e.target.value)}
                        placeholder="Título do artigo"
                        className="flex-1 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-semibold"
                      />
                      <div className="flex gap-2 ml-2">
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={item.featured}
                            onChange={(e) => updateSetting(`news_${item.id}_featured`, e.target.checked.toString())}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <Star size={16} className="text-yellow-500" />
                        </label>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <textarea
                      value={item.excerpt}
                      onChange={(e) => updateSetting(`news_${item.id}_excerpt`, e.target.value)}
                      placeholder="Resumo/descrição curta"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white text-sm"
                      rows={2}
                    />
                    
                    <textarea
                      value={item.content}
                      onChange={(e) => updateSetting(`news_${item.id}_content`, e.target.value)}
                      placeholder="Conteúdo completo (use novas linhas para parágrafos)"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white text-sm"
                      rows={4}
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.author}
                        onChange={(e) => updateSetting(`news_${item.id}_author`, e.target.value)}
                        placeholder="Autor"
                        className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      />
                      
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => updateSetting(`news_${item.id}_date`, e.target.value)}
                        placeholder="Data (ex: 15/03/2024)"
                        className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={item.category}
                        onChange={(e) => updateSetting(`news_${item.id}_category`, e.target.value)}
                        className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      >
                        <option value="">Selecione categoria</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      
                      <input
                        type="text"
                        value={item.readTime}
                        onChange={(e) => updateSetting(`news_${item.id}_read_time`, e.target.value)}
                        placeholder="Tempo de leitura (ex: 5 min)"
                        className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-gray-300 mb-1">
                        Tags (separadas por vírgula)
                      </label>
                      <input
                        type="text"
                        value={item.tags.join(',')}
                        onChange={(e) => updateSetting(`news_${item.id}_tags`, e.target.value)}
                        placeholder="Tecnologia,Inovação,Angola"
                        className="w-full px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      />
                      <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
                        Sugestões: {tagOptions.slice(0, 5).join(', ')}...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {item.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {item.author}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-3">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 text-xs rounded"
                        >
                          <Tag size={10} className="inline mr-1" />
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-1 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-gray-400 text-xs rounded">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-500">
                      <div className="flex items-center gap-2">
                        {item.featured && (
                          <Star size={12} className="text-yellow-500" />
                        )}
                        <span>ID: {item.id}</span>
                      </div>
                      <span>{item.category}</span>
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
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Controles de Notícias</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              <strong>Dica:</strong> Marque artigos como "Destaque" para aparecerem em posição de relevância na página.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleSync}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              <RefreshCw size={16} />
              Sincronizar
            </button>
            <button 
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
            >
              <Plus size={16} />
              Novo Rápido
            </button>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <h4 className="font-medium text-slate-700 dark:text-gray-300 mb-2">Dicas para Artigos:</h4>
          <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
            <li>• Use imagens horizontais (16:9) para melhor visualização</li>
            <li>• Mantenha o resumo curto (2-3 frases) e atraente</li>
            <li>• Use tags relevantes para melhor organização</li>
            <li>• Artigos em destaque aparecem primeiro na página</li>
            <li>• O conteúdo suporta quebras de linha para parágrafos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsPreview;