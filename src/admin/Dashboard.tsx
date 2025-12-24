// src/admin/Dashboard.tsx - ATUALIZADO
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, Edit, Bell, Mail, Calendar } from 'lucide-react';
import { useNewsletter } from '../context/NewsletterContext';

const Dashboard: React.FC = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const { subscriptions, unreadCount, markAsRead } = useNewsletter();

  const handleViewSubscription = (id: string) => {
    markAsRead(id);
    alert(`Visualizando inscrição ${id}. Em produção, abriria um modal com detalhes.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-gray-400">Gerencie o conteúdo do site</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
          >
            {previewMode ? <Edit size={20} /> : <Eye size={20} />}
            {previewMode ? 'Modo Edição' : 'Modo Visualização'}
          </button>
          
          {/* Badge de notificações */}
          {unreadCount > 0 && (
            <div className="relative">
              <Bell className="w-6 h-6 text-slate-600 dark:text-gray-400" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Páginas</h3>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">6</p>
          <p className="text-sm text-slate-500 dark:text-gray-400">Páginas editáveis</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Novas Inscrições</h3>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{unreadCount}</p>
          <p className="text-sm text-slate-500 dark:text-gray-400">Pendentes de leitura</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Próximo Evento</h3>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">15 Março 2024</p>
          <p className="text-sm text-slate-500 dark:text-gray-400">Workshop React</p>
        </motion.div>
      </div>

      {/* Lista de Inscrições Recentes */}
      {subscriptions.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Inscrições Recentes</h3>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full">
              {subscriptions.length} total
            </span>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {subscriptions.slice(0, 5).map((sub) => (
              <div 
                key={sub.id} 
                className={`p-4 rounded-xl border transition-all ${sub.read 
                  ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700' 
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900 dark:text-white">{sub.name || 'Sem nome'}</h4>
                      {!sub.read && (
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
                          NOVO
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">{sub.email}</p>
                    {sub.phone && (
                      <p className="text-slate-500 dark:text-gray-500 text-sm">Tel: {sub.phone}</p>
                    )}
                    {sub.event && (
                      <p className="text-slate-500 dark:text-gray-500 text-sm mt-2">
                        <strong>Evento:</strong> {sub.event}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-gray-500">
                      {new Date(sub.subscribedAt).toLocaleDateString('pt-AO')}
                    </p>
                    <button
                      onClick={() => handleViewSubscription(sub.id)}
                      className="mt-2 px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 text-xs font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {subscriptions.length > 5 && (
            <div className="mt-4 text-center">
              <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300">
                Ver todas as inscrições ({subscriptions.length})
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Instruções</h3>
        <ul className="space-y-3 text-slate-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>Clique em qualquer página para pré-visualizar</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>Use o botão "Modo Visualização/Edição" para alternar</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>As alterações são salvas automaticamente</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <span>Novas inscrições aparecerão aqui como notificações</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;