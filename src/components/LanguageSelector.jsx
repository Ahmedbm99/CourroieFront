import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
        style={{
          background: 'transparent',
          border: '2px solid #2563eb',
          borderRadius: '8px',
          padding: '8px 16px',
          cursor: 'pointer',
          color: '#2563eb',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#eff6ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        title={language === 'fr' ? 'Switch to English' : 'Passer en français'}
      >
        <i className={`fas fa-globe`}></i>
        <span>{language === 'fr' ? 'FR' : 'EN'}</span>
        <i className={`fas fa-chevron-down`} style={{ fontSize: '0.8rem' }}></i>
      </button>
    </div>
  );
}



