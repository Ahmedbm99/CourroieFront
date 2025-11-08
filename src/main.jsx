import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <LanguageProvider>
    <BrowserRouter basename="/CourroieFront/">
     
        <App />

    </BrowserRouter>
      </LanguageProvider>
      </Provider>
  </React.StrictMode>
);

