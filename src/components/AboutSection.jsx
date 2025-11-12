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
  <div
  style={{
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    marginTop: '40px',
    borderRadius: '10px',
  }}
>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819.8071861254737!2d10.73829756625433!3d34.72462812805315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002d0056200c07%3A0xb6fb8be2de6302ab!2sAIS!5e0!3m2!1sfr!2stn!4v1762950057246!5m2!1sfr!2stn"
    style={{
      border: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="AIS Location"
  ></iframe>
</div>

      </div>
    </section>
  );
}