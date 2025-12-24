// src/admin/EventosPreview.tsx - ATUALIZADO com sistema de sincronização
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit2, Save, Eye, Plus, Trash2, RefreshCw } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';

interface EventItemType {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  participants: string;
}

const EventosPreview: React.FC = () => {
  const { settings, updateSetting } = useSettings();
  const [editMode, setEditMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [eventItems, setEventItems] = useState<EventItemType[]>([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    participants: '50+'
  });

  // Carregar itens do sistema de conteúdo
  useEffect(() => {
    loadEventItems();
  }, [settings]);

  const loadEventItems = () => {
    const items: EventItemType[] = [];
    
    // Procurar todos os eventos no sistema de conteúdo
    for (let i = 1; i <= 10; i++) {
      const title = settings[`event_${i}_title`];
      const date = settings[`event_${i}_date`];
      
      if (title || date) {
        items.push({
          id: i,
          title: title || 'Novo Evento',
          date: date || 'A definir',
          time: settings[`event_${i}_time`] || 'A definir',
          location: settings[`event_${i}_location`] || 'A definir',
          description: settings[`event_${i}_description`] || 'Descrição do evento',
          participants: settings[`event_${i}_participants`] || '50+'
        });
      }
    }
    
    setEventItems(items);
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    
    // Simular sincronização
    setTimeout(() => {
      loadEventItems();
      setSyncStatus('success');
      
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 1000);
  };

  const handleSave = () => {
    setEditMode(false);
    alert('Alterações salvas! Os eventos foram atualizados no sistema.');
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Por favor, preencha pelo menos o título e a data do evento.');
      return;
    }

    const nextId = eventItems.length > 0 ? Math.max(...eventItems.map(event => event.id)) + 1 : 1;
    
    // Adicionar ao sistema de conteúdo
    updateSetting(`event_${nextId}_title`, newEvent.title);
    updateSetting(`event_${nextId}_date`, newEvent.date);
    updateSetting(`event_${nextId}_time`, newEvent.time);
    updateSetting(`event_${nextId}_location`, newEvent.location);
    updateSetting(`event_${nextId}_description`, newEvent.description);
    updateSetting(`event_${nextId}_participants`, newEvent.participants);

    // Limpar formulário
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      participants: '50+'
    });

    alert('Evento adicionado com sucesso! Use o botão Sincronizar para ver as mudanças.');
  };

  const handleDeleteEvent = (eventId: number) => {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      // Remover todas as chaves deste evento
      const keys = ['title', 'date', 'time', 'location', 'description', 'participants'];
      keys.forEach(key => {
        updateSetting(`event_${eventId}_${key}`, '');
      });
      
      alert('Evento removido com sucesso!');
      setTimeout(handleSync, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pré-visualização: Eventos</h1>
          <p className="text-slate-600 dark:text-gray-400">
            {eventItems.length} eventos carregados do sistema
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
            ✓ Sincronização concluída! {eventItems.length} eventos carregados.
          </p>
        </div>
      )}

      {/* Formulário para adicionar novo evento (somente em modo edição) */}
      {editMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Plus size={20} />
            Adicionar Novo Evento
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Título do evento"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            />
            
            <input
              type="text"
              placeholder="Data (ex: 15 Março 2024)"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            />
            
            <input
              type="text"
              placeholder="Horário (ex: 14:00 - 18:00)"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            />
            
            <input
              type="text"
              placeholder="Localização (ex: Luanda, Talatona)"
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          
          <textarea
            placeholder="Descrição do evento"
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white mb-4"
            rows={3}
          />
          
          <div className="flex items-center gap-4 mb-4">
            <label className="text-slate-700 dark:text-gray-300 font-medium">
              Participantes esperados:
            </label>
            <select
              value={newEvent.participants}
              onChange={(e) => setNewEvent({...newEvent, participants: e.target.value})}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
            >
              <option value="20+">20+ participantes</option>
              <option value="50+">50+ participantes</option>
              <option value="100+">100+ participantes</option>
              <option value="200+">200+ participantes</option>
            </select>
          </div>
          
          <button
            onClick={handleAddEvent}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all"
          >
            Adicionar Evento
          </button>
        </motion.div>
      )}

      {/* Botão para adicionar novo item */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Eventos ({eventItems.length})
        </h3>
        <button
          onClick={() => setEditMode(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all"
        >
          <Plus size={20} />
          {editMode ? 'Continuar Editando' : 'Adicionar Evento'}
        </button>
      </div>

      {/* Pré-visualização dos eventos */}
      {eventItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-12 text-center">
          <Calendar size={48} className="mx-auto text-slate-400 dark:text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Nenhum evento cadastrado
          </h3>
          <p className="text-slate-600 dark:text-gray-400 mb-6">
            Adicione eventos usando o botão acima.
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            Criar Primeiro Evento
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventItems.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl border border-slate-200 dark:border-slate-600"
              >
                {editMode ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Calendar size={20} />
                        <span className="font-semibold">Editar Evento #{event.id}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => updateSetting(`event_${event.id}_title`, e.target.value)}
                      placeholder="Título do evento"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white font-semibold"
                    />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={event.date}
                        onChange={(e) => updateSetting(`event_${event.id}_date`, e.target.value)}
                        placeholder="Data"
                        className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      />
                      <input
                        type="text"
                        value={event.time}
                        onChange={(e) => updateSetting(`event_${event.id}_time`, e.target.value)}
                        placeholder="Horário"
                        className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      />
                    </div>
                    
                    <input
                      type="text"
                      value={event.location}
                      onChange={(e) => updateSetting(`event_${event.id}_location`, e.target.value)}
                      placeholder="Localização"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                    />
                    
                    <textarea
                      value={event.description}
                      onChange={(e) => updateSetting(`event_${event.id}_description`, e.target.value)}
                      placeholder="Descrição"
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-sm"
                      rows={3}
                    />
                    
                    <select
                      value={event.participants}
                      onChange={(e) => updateSetting(`event_${event.id}_participants`, e.target.value)}
                      className="w-full px-3 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-slate-900 dark:text-white text-xs"
                    >
                      <option value="20+">20+ participantes</option>
                      <option value="50+">50+ participantes</option>
                      <option value="100+">100+ participantes</option>
                      <option value="200+">200+ participantes</option>
                    </select>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                      <Calendar size={20} />
                      <span className="font-semibold">{event.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-400 mb-4">
                      {event.description}
                    </p>
                    <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-600">
                      <p className="text-sm text-slate-700 dark:text-gray-300">
                        <strong>Horário:</strong> {event.time}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-gray-300">
                        <strong>Local:</strong> {event.location}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-gray-300">
                        <strong>Participantes:</strong> {event.participants}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Painel de controle */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Controles de Eventos</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleSync}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
            <RefreshCw size={16} />
            Sincronizar com Site
          </button>
          <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all">
            Reordenar Eventos
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all">
            Publicar no Site
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            <strong>Nota:</strong> Os eventos são salvos automaticamente no sistema de conteúdo. 
            Use "Sincronizar com Site" para garantir que as mudanças apareçam na página pública.
            As inscrições nos eventos são gerenciadas através do Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventosPreview;