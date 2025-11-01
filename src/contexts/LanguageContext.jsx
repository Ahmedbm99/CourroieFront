import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../i18n/languages';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('kortibelt_language');
    return saved || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('kortibelt_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: (key, fallback) => getTranslation(language, key, fallback || key)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

