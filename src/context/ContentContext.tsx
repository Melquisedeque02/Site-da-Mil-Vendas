// src/context/ContentContext.tsx
import React, { createContext, useContext, useState,useEffect } from 'react';

import type { ReactNode } from 
'react';

interface ContentContextType {
  content: Record<string, string>;
  updateContent: (key: string, value: string) => void;
  resetContent: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

// Exportar o contexto primeiro
export const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

const defaultContent: Record<string, string> = {
  // Hero
  'hero_title_1': 'Tecnologia que',
  'hero_title_highlight': 'Conecta e Inova',
  'hero_description': 'A Mil Vendas entrega soluções digitais robustas, focadas na melhor experiência para o seu cliente.',
  'hero_button_text': 'Contactar Equipa',
  'hero_whatsapp': '244922965959',
  
  // Services
  'services_badge': 'O que fazemos',
  'services_title': 'Soluções Completas',
  'service_1_title': 'Web Development',
  'service_1_desc': 'Aplicações robustas com React, Node e as tecnologias mais recentes.',
  'service_2_title': 'Telecomunicações',
  'service_2_desc': 'Consultoria especializada para otimizar a conectividade da sua empresa.',
  'service_3_title': 'Mobile Solutions',
  'service_3_desc': 'Apps nativas e híbridas focadas na experiência do utilizador.',
  'service_4_title': 'Consultoria Tech',
  'service_4_desc': 'Estratégia digital para escalar o seu modelo de negócio.',
  
  // About
  'about_title': 'Compromisso com a Excelência',
  'about_description': 'A Mil Vendas não é apenas uma agência, é o seu braço direito tecnológico em Luanda.',
  'about_feature_1': 'Desenvolvimento Nativo',
  'about_feature_2': 'Cloud Computing',
  'about_feature_3': 'Segurança de Dados',
  
  // Events
  'event_1_title': 'Workshop de React Avançado',
  'event_1_date': '15 Março 2024',
  'event_1_time': '14:00 - 18:00',
  'event_1_location': 'Luanda, Talatona',
  'event_1_description': 'Workshop prático sobre as últimas features do React e TypeScript.',
  
  'event_2_title': 'Meetup Tech Angola',
  'event_2_date': '22 Março 2024',
  'event_2_time': '18:00 - 21:00',
  'event_2_location': 'Luanda, Centro',
  'event_2_description': 'Encontro da comunidade de desenvolvedores para networking e troca de ideias.',
  
  'event_3_title': 'Hackathon Inovação Digital',
  'event_3_date': '30 Março 2024',
  'event_3_time': '09:00 - 18:00',
  'event_3_location': 'Luanda, Belas',
  'event_3_description': 'Competição de 48h para desenvolver soluções inovadoras.',
  
  // Portfolio
  'portfolio_1_title': 'E-commerce Platform',
  'portfolio_1_description': 'Plataforma de comércio eletrónico completa com painel administrativo e sistema de pagamentos.',
  
  'portfolio_2_title': 'App de Delivery',
  'portfolio_2_description': 'Aplicativo móvel para delivery com rastreamento em tempo real e notificações push.',
  
  'portfolio_3_title': 'Sistema ERP',
  'portfolio_3_description': 'Sistema de gestão empresarial customizado com relatórios analíticos em tempo real.',
  
  'portfolio_4_title': 'Website Corporativo',
  'portfolio_4_description': 'Site institucional com blog integrado, sistema de notícias e área de membros.',
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('site_content');
    return saved ? JSON.parse(saved) : defaultContent;
  });

  const updateContent = (key: string, value: string) => {
    setContent(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('site_content', JSON.stringify(updated));
      return updated;
    });
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.setItem('site_content', JSON.stringify(defaultContent));
  };

  const saveToStorage = () => {
    localStorage.setItem('site_content', JSON.stringify(content));
  };

  const loadFromStorage = () => {
    const saved = localStorage.getItem('site_content');
    if (saved) {
      setContent(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      resetContent,
      saveToStorage,
      loadFromStorage
    }}>
      {children}
    </ContentContext.Provider>
  );
};