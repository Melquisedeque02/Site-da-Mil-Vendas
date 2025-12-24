// main.tsx - ATUALIZADO
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ContentProvider } from './context/ContentContext';
import { NewsletterProvider } from './context/NewsletterContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <ContentProvider>
        <NewsletterProvider>
          <App />
        </NewsletterProvider>
      </ContentProvider>
    </HashRouter>
  </React.StrictMode>
);