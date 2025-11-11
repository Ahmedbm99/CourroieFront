import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';


export default function AboutSection(){
  const { t } = useLanguage();
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>{t('aboutKortibelt')}</h2>
            <p>{t('bridgeDescription')}</p>
            <p>{t('qualityControl')}</p>
            <div className="features">
              <div className="feature"><i className="fas fa-globe-africa"></i><span>{t('africanBrand')}</span></div>
              <div className="feature"><i className="fas fa-certificate"></i><span>{t('isoStandards')}</span></div>
              <div className="feature"><i className="fas fa-cogs"></i><span>{t('rigorousQC')}</span></div>
              <div className="feature"><i className="fas fa-chart-line"></i><span>{t('competitivePrices')}</span></div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="KORTIBELT AISGroup Tunisia" />
          </div>
        </div>
      </div>
    </section>
  );
}