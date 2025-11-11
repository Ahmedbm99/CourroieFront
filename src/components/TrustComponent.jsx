import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TrustComponent() {
      const { t } = useLanguage(); 
    
return (
 <section style={{ background: '#f8f9fa', padding: '40px 0', marginBottom: '0px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
            <div>
              <i className="fas fa-truck" style={{ fontSize: '2.5rem', color: '#2563eb', marginBottom: '10px' }}></i>
              <h3 style={{ color: '#1e293b', marginBottom: '5px' }}>{t('fastDelivery')}</h3>
              <p style={{ color: '#64748b' }}>{t('under24h')}</p>
            </div>
            <div>
              <i className="fas fa-lock" style={{ fontSize: '2.5rem', color: '#2563eb', marginBottom: '10px' }}></i>
              <h3 style={{ color: '#1e293b', marginBottom: '5px' }}>{t('securePayment')}</h3>
              <p style={{ color: '#64748b' }}>{t('protectedTransaction')}</p>
            </div>
            <div>
              <i className="fas fa-shield-alt" style={{ fontSize: '2.5rem', color: '#2563eb', marginBottom: '10px' }}></i>
              <h3 style={{ color: '#1e293b', marginBottom: '5px' }}>{t('guaranteedQuality')}</h3>
              <p style={{ color: '#64748b' }}>{t('isoStandards')}</p>
            </div>
            <div>
              <i className="fas fa-undo" style={{ fontSize: '2.5rem', color: '#2563eb', marginBottom: '10px' }}></i>
              <h3 style={{ color: '#1e293b', marginBottom: '5px' }}>{t('freeReturn')}</h3>
              <p style={{ color: '#64748b' }}>{t('within14Days')}</p>
            </div>
          </div>
        </div>
      </section>

 )};    