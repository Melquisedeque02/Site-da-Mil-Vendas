// src/components/Footer.tsx - ATUALIZADO
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Obrigado por subscrever a newsletter com o email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6 tracking-tighter">MIL VENDAS</h3>
            <p className="text-gray-500 max-w-sm mb-8">
              Líderes em soluções tecnológicas em Luanda. Conectamos marcas a pessoas através do código e do design.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#3b82f6", backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  className="p-3 bg-slate-900 rounded-lg text-gray-400 transition-colors border border-white/5"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Links</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#servicos" className="hover:text-blue-500 transition-colors">Serviços</a></li>
              <li><a href="#sobre" className="hover:text-blue-500 transition-colors">Sobre Nós</a></li>
              <li><Link to="/portfolio" className="hover:text-blue-500 transition-colors">Portfólio</Link></li>
              <li><Link to="/events" className="hover:text-blue-500 transition-colors">Eventos</Link></li>
              <li><Link to="/news" className="hover:text-blue-500 transition-colors">Notícias</Link></li>
              <li><a href="#contacto" className="hover:text-blue-500 transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Mail size={18} />
              Newsletter
            </h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input 
                type="email" 
                placeholder="Seu email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                required
              />
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-all"
              >
                Subscrever
              </motion.button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-white/10">
             
             
            </div>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/5 text-gray-600 text-sm">
          © {new Date().getFullYear()} Mil Vendas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;