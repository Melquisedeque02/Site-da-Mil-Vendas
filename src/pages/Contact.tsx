import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

const Contact = () => {
  const whatsappUrl = "https://wa.me/244900000000?text=Olá! Vi o site da Mil Vendas e gostaria de solicitar um orçamento.";

  return (
    <section id="contato" className="py-24 relative px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-blue-500 font-semibold uppercase tracking-wider">Contacto</h2>
          <p className="text-4xl font-bold text-white mt-2">Vamos criar algo incrível?</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* INFO DE CONTACTO */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Informações de Contacto</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500"><MapPin /></div>
                  <div>
                    <p className="text-white font-semibold">Localização</p>
                    <p className="text-gray-400">Luanda, Angola</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500"><Mail /></div>
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-400">geral@milvendas.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg text-blue-500"><Phone /></div>
                  <div>
                    <p className="text-white font-semibold">Telefone</p>
                    <p className="text-gray-400">+244 922 965 959</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ÁREA DE MENSAGEM / FORMULÁRIO */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/20 p-8 md:p-12 rounded-3xl border border-blue-500/20 flex flex-col justify-center items-center text-center"
          >
            <MessageSquare size={60} className="text-blue-500 mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-white mb-4">Atendimento Instantâneo</h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Prefere um contacto mais rápido? Clique no botão abaixo para falar diretamente com a nossa equipa técnica via WhatsApp.
            </p>
            
            <motion.a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3"
            >
              Enviar Mensagem no WhatsApp
            </motion.a>
            <p className="mt-4 text-xs text-gray-500 italic">Resposta média em menos de 30 minutos.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;