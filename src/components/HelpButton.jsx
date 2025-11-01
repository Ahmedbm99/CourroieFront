import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HelpButton() {
  const { t } = useLanguage();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div style={{
        position: 'fixed',
        bottom: '180px',
        right: '20px',
        zIndex: 999
      }}>
        <button
          onClick={() => setShowHelp(!showHelp)}
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
            fontSize: '1.3rem',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#059669';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#10b981';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={t('needHelp')}
        >
          <i className="fas fa-question"></i>
        </button>
      </div>

      {showHelp && (
        <div style={{
          position: 'fixed',
          bottom: '250px',
          right: '20px',
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          zIndex: 1000,
          maxWidth: '300px',
          minWidth: '250px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem' }}>
              <i className="fas fa-info-circle" style={{ color: '#2563eb', marginRight: '8px' }}></i>
              {t('helpAndAdvice')}
            </h3>
            <button
              onClick={() => setShowHelp(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.3rem',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ color: '#475569', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '15px' }}>
              <strong>{t('helpChoose')}</strong>
            </p>
            <div style={{ marginBottom: '10px' }}>
              <i className="fas fa-search" style={{ color: '#2563eb', marginRight: '8px' }}></i>
              {t('useSearch')}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <i className="fas fa-layer-group" style={{ color: '#2563eb', marginRight: '8px' }}></i>
              {t('consultFamilies')}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <i className="fas fa-download" style={{ color: '#2563eb', marginRight: '8px' }}></i>
              {t('downloadDatasheets')}
            </div>
            <div style={{
              background: '#eff6ff',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '15px',
              borderLeft: '4px solid #2563eb'
            }}>
              <strong style={{ color: '#1e40af' }}>{t('proTip')}:</strong>
              <p style={{ margin: '5px 0 0 0', color: '#475569', fontSize: '0.9rem' }}>
                {t('contactExpert')}
              </p>
            </div>
            <button
              className="cta-button primary"
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => setShowHelp(false)}
            >
              <i className="fas fa-whatsapp"></i> {t('contactExpertBtn')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

