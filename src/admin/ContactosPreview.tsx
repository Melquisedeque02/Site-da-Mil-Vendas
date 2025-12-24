// src/admin/ContactosPreview.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare, Eye, Globe } from 'lucide-react';

const ContactosPreview: React.FC = () => {
  // Dados estáticos para pré-visualização
  const contactInfo = {
    address: 'Luanda, Angola',
    email: 'geral@milvendas.com',
    phone: '+244 922 965 959',
    whatsapp: 'https://wa.me/244922965959',
    socialMedia: {
      facebook: 'https://facebook.com/milvendas',
      instagram: 'https://instagram.com/milvendas',
      linkedin: 'https://linkedin.com/company/milvendas'
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pré-visualização: Contactos</h1>
          <p className="text-slate-600 dark:text-gray-400">
            Visualização da página de contactos (não editável conforme requisito)
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
          <Eye size={20} />
          <span className="font-medium">Apenas Visualização</span>
        </div>
      </div>

      {/* Aviso sobre não editável */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Eye className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
              Modo Apenas Visualização
            </h3>
            <p className="text-yellow-700 dark:text-yellow-400">
              Conforme os requisitos do projeto, a página de contactos não é editável através do painel admin.
              As alterações devem ser feitas diretamente no código ou através do desenvolvedor.
            </p>
          </div>
        </div>
      </div>

      {/* Pré-visualização da página de contactos */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Cabeçalho da pré-visualização */}
        <div className="border-b border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm text-slate-500 dark:text-gray-400">
              milvendas.com/contacto
            </span>
          </div>
        </div>

        {/* Conteúdo da pré-visualização */}
        <div className="p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-blue-500 font-semibold uppercase tracking-wider">Contacto</h2>
            <p className="text-4xl font-bold text-slate-900 dark:text-white mt-2">
              Vamos criar algo incrível?
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* INFO DE CONTACTO */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-slate-100 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Informações de Contacto
                </h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <MapPin />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold">Localização</p>
                      <p className="text-slate-600 dark:text-gray-400">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Mail />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold">Email</p>
                      <p className="text-slate-600 dark:text-gray-400">{contactInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Phone />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold">Telefone</p>
                      <p className="text-slate-600 dark:text-gray-400">{contactInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                      <Globe />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-semibold">Redes Sociais</p>
                      <div className="flex gap-4 mt-2">
                        <a href={contactInfo.socialMedia.facebook} className="text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          Facebook
                        </a>
                        <a href={contactInfo.socialMedia.instagram} className="text-slate-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
                          Instagram
                        </a>
                        <a href={contactInfo.socialMedia.linkedin} className="text-slate-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500">
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ÁREA DE MENSAGEM */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-blue-50 dark:bg-blue-900/10 p-8 md:p-12 rounded-3xl border border-blue-200 dark:border-blue-800 flex flex-col justify-center items-center text-center"
            >
              <MessageSquare size={60} className="text-blue-500 mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Atendimento Instantâneo
              </h3>
              <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-sm">
                Prefere um contacto mais rápido? Clique no botão abaixo para falar diretamente 
                com a nossa equipa técnica via WhatsApp.
              </p>
              
              <motion.a 
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-3"
              >
                Enviar Mensagem no WhatsApp
              </motion.a>
              <p className="mt-4 text-xs text-slate-500 dark:text-gray-500 italic">
                Resposta média em menos de 30 minutos.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Informações técnicas para o desenvolvedor */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Informações para Desenvolvedor
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-slate-700 dark:text-gray-300 mb-2">Arquivo Principal</h4>
            <code className="block p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-800 dark:text-gray-300">
              src/pages/Contact.tsx
            </code>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-700 dark:text-gray-300 mb-2">Para alterar contactos:</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              <li>1. Edite diretamente o arquivo Contact.tsx</li>
              <li>2. Ou crie um sistema de configurações no banco MySQL</li>
              <li>3. Atualize as variáveis no contexto/appearance</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-medium text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Globe size={18} />
            Integração com MySQL
          </h4>
          <p className="text-sm text-slate-600 dark:text-gray-400">
            Para tornar os contactos editáveis via admin, será necessário:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-gray-400">
            <li>• Criar tabela <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">contact_settings</code> no MySQL</li>
            <li>• Desenvolver API endpoints para CRUD</li>
            <li>• Atualizar o Contexto de Autenticação para incluir permissões</li>
            <li>• Modificar este componente para modo edição</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactosPreview;