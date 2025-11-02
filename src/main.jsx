import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter  } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
     <LanguageProvider>
    <HashRouter>
     
        <App />

    </HashRouter >
      </LanguageProvider>
  </React.StrictMode>
);

