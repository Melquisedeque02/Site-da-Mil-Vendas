// src/admin/Dashboard.tsx - ATUALIZADO com modal de detalhes
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, Edit, Bell, Mail, Calendar, X, User, Phone, Clock, Trash2 } from 'lucide-react';
import { useNewsletter } from '../context/NewsletterContext';

const Dashboard: React.FC = () => {
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any | null>(null);
  const { subscriptions, unreadCount, markAsRead, deleteSubscription } = useNewsletter();

  const handleViewSubscription = (subscription: any) => {
    setSelectedSubscription(subscription);
    markAsRead(subscription.id);
  };

  const handleDeleteSubscription = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta inscrição?')) {
      deleteSubscription(id);
      setSelectedSubscription(null);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-AO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full">
                {subscriptions.length} total
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                {unreadCount} não lidas
              </span>
            </div>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {subscriptions.slice(0, 5).map((sub, index) => (
              <div 
                key={sub.id} 
                onClick={() => handleViewSubscription(sub)}
                className={`p-4 rounded-xl border transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                  sub.read 
                    ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700' 
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-slate-500 dark:text-gray-500 font-mono">
                        #{index + 1}
                      </span>
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
                      {formatDate(sub.subscribedAt)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewSubscription(sub);
                      }}
                      className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      Ver Detalhes
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

      {/* Modal de Detalhes da Inscrição */}
      {selectedSubscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Cabeçalho */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Detalhes da Inscrição</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-sm">
                    {selectedSubscription.read ? 'Visualizada' : 'Nova inscrição'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubscription(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  <X size={24} className="text-slate-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Informações do Inscrito */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Informações Pessoais</h4>
                    <p className="text-slate-700 dark:text-gray-300">
                      <strong>Nome:</strong> {selectedSubscription.name || 'Não informado'}
                    </p>
                    <p className="text-slate-700 dark:text-gray-300">
                      <strong>Email:</strong> {selectedSubscription.email}
                    </p>
                    {selectedSubscription.phone && (
                      <p className="text-slate-700 dark:text-gray-300">
                        <strong>Telefone:</strong> {selectedSubscription.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Detalhes do Evento */}
                {selectedSubscription.event && (
                  <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Evento</h4>
                      <p className="text-slate-700 dark:text-gray-300">
                        {selectedSubscription.event}
                      </p>
                    </div>
                  </div>
                )}

                {/* Metadados */}
                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Informações Técnicas</h4>
                    <p className="text-slate-700 dark:text-gray-300">
                      <strong>ID:</strong> {selectedSubscription.id.slice(0, 8)}...
                    </p>
                    <p className="text-slate-700 dark:text-gray-300">
                      <strong>Data:</strong> {formatDate(selectedSubscription.subscribedAt)}
                    </p>
                    <p className="text-slate-700 dark:text-gray-300">
                      <strong>Status:</strong> {selectedSubscription.read ? 'Lida' : 'Não lida'}
                    </p>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => {
                      window.open(`mailto:${selectedSubscription.email}?subject=Resposta à sua inscrição`, '_blank');
                    }}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                  >
                    Responder por Email
                  </button>
                  <button
                    onClick={() => handleDeleteSubscription(selectedSubscription.id)}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={20} />
                    Excluir
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setSelectedSubscription(null)}
                    className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
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
            <span>Clique nas inscrições para ver detalhes completos</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;