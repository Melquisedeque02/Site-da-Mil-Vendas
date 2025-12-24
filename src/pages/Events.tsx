// src/pages/Events.tsx - CÓDIGO COMPLETO ATUALIZADO
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Mail, User, Phone, ExternalLink } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { useNewsletter } from '../context/NewsletterContext';

interface EventItemType {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  participants: string;
}

const Events = () => {
  const { settings } = useSettings();
  const { addSubscription } = useNewsletter();
  const [showSubscriptionForm, setShowSubscriptionForm] = useState<number | null>(null);
  const [subscriptionData, setSubscriptionData] = useState({
    name: '',
    email: '',
    phone: '',
    event: ''
  });

  // Carregar eventos do sistema de conteúdo
  const [eventItems, setEventItems] = useState<EventItemType[]>([]);

  useEffect(() => {
    loadEventsFromContent();
  }, [settings]);

  const loadEventsFromContent = () => {
    const items: EventItemType[] = [];
    
    // Procurar todos os eventos no sistema de conteúdo (até 10 eventos)
    for (let i = 1; i <= 10; i++) {
      const title = settings[`event_${i}_title`];
      const date = settings[`event_${i}_date`];
      
      // Só incluir se tiver pelo menos título ou data
      if (title || date) {
        items.push({
          id: i,
          title: title || 'Novo Evento',
          date: date || 'Em breve',
          time: settings[`event_${i}_time`] || 'A definir',
          location: settings[`event_${i}_location`] || 'Luanda',
          description: settings[`event_${i}_description`] || 'Descrição do evento será adicionada em breve.',
          participants: settings[`event_${i}_participants`] || '50+'
        });
      }
    }
    
    // Ordenar por data (mais recente primeiro)
    const sortedItems = items.sort((a, b) => {
      // Simples ordenação por ID (pode melhorar para datas reais)
      return b.id - a.id;
    });
    
    setEventItems(sortedItems);
  };

  // Se não houver eventos, mostrar mensagem
  if (eventItems.length === 0) {
    return (
      <section id="eventos" className="min-h-screen py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">
              Eventos & Workshops
            </h2>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Próximos Eventos
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
              Em breve anunciaremos novos eventos e workshops. Fique atento!
            </p>
          </motion.div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
            <Calendar size={64} className="mx-auto text-slate-400 dark:text-gray-500 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Nenhum evento programado no momento
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Estamos preparando eventos incríveis para a comunidade. 
              Cadastre-se na nossa newsletter para ser notificado quando houver novidades.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contacto"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                Contactar para Sugestões
              </a>
              <a 
                href={`https://wa.me/${settings['hero_whatsapp'] || '244922965959'}?text=Olá! Gostaria de sugerir um tema para evento`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                WhatsApp para Ideias
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleSubscribe = (eventId: number, eventTitle: string) => {
    setShowSubscriptionForm(eventId);
    setSubscriptionData(prev => ({ ...prev, event: eventTitle }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriptionData.name || !subscriptionData.email) {
      alert('Por favor, preencha pelo menos o nome e email.');
      return;
    }

    addSubscription(subscriptionData);
    
    alert(`Obrigado ${subscriptionData.name}! Sua inscrição foi realizada com sucesso.`);
    
    // Reset form
    setSubscriptionData({
      name: '',
      email: '',
      phone: '',
      event: ''
    });
    
    setShowSubscriptionForm(null);
  };

  return (
    <section id="eventos" className="min-h-screen py-24 bg-white dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">
            Eventos & Workshops
          </h2>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
            Próximos Eventos
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            Participe dos nossos eventos e workshops para se manter atualizado com as últimas tendências tecnológicas.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {eventItems.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all group"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                  <Calendar size={20} />
                  <span className="font-semibold">{event.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {event.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-400">
                  {event.description}
                </p>
              </div>
              
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                  <Clock size={18} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-gray-300">
                  <Users size={18} />
                  <span>{event.participants} participantes</span>
                </div>
              </div>
              
              {/* Formulário de Inscrição */}
              {showSubscriptionForm === event.id ? (
                <div className="mt-6 space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Inscreva-se no Evento
                  </h4>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Seu nome"
                        value={subscriptionData.name}
                        onChange={(e) => setSubscriptionData({...subscriptionData, name: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Seu email"
                        value={subscriptionData.email}
                        onChange={(e) => setSubscriptionData({...subscriptionData, email: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                        required
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Seu telefone (opcional)"
                        value={subscriptionData.phone}
                        onChange={(e) => setSubscriptionData({...subscriptionData, phone: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
                      >
                        Confirmar Inscrição
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSubscriptionForm(null)}
                        className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={() => handleSubscribe(event.id, event.title)}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                  >
                    Inscrever-se
                  </button>
                  <a
                    href={`https://wa.me/${settings['hero_whatsapp'] || '244922965959'}?text=Olá! Gostaria de mais informações sobre o evento: ${encodeURIComponent(event.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center"
                    title="Falar no WhatsApp"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Estatísticas */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {eventItems.length}
            </div>
            <div className="text-slate-700 dark:text-gray-300 font-medium">
              Eventos Ativos
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {eventItems.reduce((total, event) => {
                const participants = parseInt(event.participants) || 50;
                return total + participants;
              }, 0)}+
            </div>
            <div className="text-slate-700 dark:text-gray-300 font-medium">
              Participantes Totais
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-2xl text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {new Date().getFullYear()}
            </div>
            <div className="text-slate-700 dark:text-gray-300 font-medium">
              Ano Ativo
            </div>
          </div>
        </motion.div>

        {/* CTA Parceria */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/5 dark:to-blue-600/5 p-8 md:p-12 rounded-3xl border border-blue-500/20">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Quer organizar um evento connosco?
            </h3>
            <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Temos parcerias com empresas e comunidades para organizar eventos tecnológicos, 
              workshops e meetups. Juntos podemos criar experiências memoráveis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${settings['hero_whatsapp'] || '244922965959'}?text=Olá! Gostaria de falar sobre uma parceria para eventos`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                <Phone size={18} />
                Contactar para Parceria
              </a>
              
              <a 
                href="mailto:geral@milvendas.com"
                className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold rounded-xl transition-all"
              >
                <Mail size={18} />
                Enviar Proposta por Email
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                Benefícios da Parceria
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">Audiência Qualificada</h5>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Acesso à nossa comunidade de profissionais</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Calendar size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">Logística Completa</h5>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Cuidamos de toda a organização do evento</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <ExternalLink size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-900 dark:text-white">Divulgação Ampliada</h5>
                    <p className="text-sm text-slate-600 dark:text-gray-400">Promoção em todas as nossas plataformas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Não perca os próximos eventos
              </h3>
              <p className="text-slate-600 dark:text-gray-400">
                Receba notificações sobre novos eventos, workshops e oportunidades
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Seu melhor email"
                    value={subscriptionData.email}
                    onChange={(e) => setSubscriptionData({...subscriptionData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                >
                  Inscrever
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-500 text-center mt-3">
                Prometemos não enviar spam. Você pode cancelar a qualquer momento.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;