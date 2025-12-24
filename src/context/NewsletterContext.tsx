// src/context/NewsletterContext.tsx
import React, { createContext, useContext, useState,useEffect } from 'react';

import type { ReactNode } from 
'react';

interface Subscription {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  event?: string;
  subscribedAt: Date;
  read: boolean;
}

interface NewsletterContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Omit<Subscription, 'id' | 'subscribedAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  deleteSubscription: (id: string) => void;
  unreadCount: number;
}

export const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const useNewsletter = () => {
  const context = useContext(NewsletterContext);
  if (!context) {
    throw new Error('useNewsletter must be used within NewsletterProvider');
  }
  return context;
};

interface NewsletterProviderProps {
  children: ReactNode;
}

export const NewsletterProvider: React.FC<NewsletterProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('newsletter_subscriptions');
    return saved ? JSON.parse(saved) : [];
  });

  const unreadCount = subscriptions.filter(sub => !sub.read).length;

  const addSubscription = (subscriptionData: Omit<Subscription, 'id' | 'subscribedAt' | 'read'>) => {
    const newSubscription: Subscription = {
      ...subscriptionData,
      id: Date.now().toString(),
      subscribedAt: new Date(),
      read: false
    };

    setSubscriptions(prev => {
      const updated = [newSubscription, ...prev];
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(updated));
      return updated;
    });

    // Simular notificação
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Nova Inscrição!', {
        body: `Novo inscrito: ${subscriptionData.email}`,
        icon: '/logo-mv.svg'
      });
    }

    return newSubscription;
  };

  const markAsRead = (id: string) => {
    setSubscriptions(prev => {
      const updated = prev.map(sub => 
        sub.id === id ? { ...sub, read: true } : sub
      );
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(prev => {
      const updated = prev.filter(sub => sub.id !== id);
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    // Pedir permissão para notificações
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  return (
    <NewsletterContext.Provider value={{ 
      subscriptions, 
      addSubscription, 
      markAsRead, 
      deleteSubscription,
      unreadCount 
    }}>
      {children}
    </NewsletterContext.Provider>
  );
};