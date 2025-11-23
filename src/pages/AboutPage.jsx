import React from 'react';
import { materialsTable, applicationsList } from '../data/families.js';
import { useLanguage } from '../contexts/LanguageContext';
import HeroSlideshow from '../components/HeroSlideshow';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
          <HeroSlideshow />
    
      <section className="brand-intro" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div className="intro-content">
            <h2>{t('about')}</h2>
            <p>{t('brandDescription1')}</p>
            <p>{t('brandDescription2')}</p>
           <p>{t('distributorIntro')}</p>
            <ul>
              <li>{t('valuePerformance')}</li>
              <li>{t('valuePrecision')}</li>
              <li>{t('valueReliability')}</li>
              <li>{t('valueDurability')}</li>
            </ul>
            <p>{t('distributorCall')}</p>
          
          </div>
          
        </div>
        <div>

                      <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d819.8071861254737!2d10.73829756625433!3d34.72462812805315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002d0056200c07%3A0xb6fb8be2de6302ab!2sAIS!5e0!3m2!1sfr!2stn!4v1762950057246!5m2!1sfr!2stn"
            style={{
              border: 0,
              position: 'relative',
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
      </section>

      <section className="materials">
        <div className="container">
          <h2 className="section-title">{t('materialsTechnology')}</h2>
          <div className="materials-content">
            <div className="materials-table">
              <table>
                <thead>
                  <tr><th>{t('element')}</th><th>{t('matter')}</th><th>{t('function')}</th></tr>
                </thead>
                <tbody>
                  {materialsTable.map(row => (
                    <tr key={row.element}>
                      <td><strong>{row.element}</strong></td>
                      <td>{row.matter}</td>
                      <td>{row.function}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="materials-image">
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80" alt={t('crossSection')} />
              <p>{t('crossSection')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="applications">
        <div className="container">
          <h2 className="section-title">{t('applications')}</h2>
          <div className="applications-grid">
            {applicationsList.map(app => (
              <div className="application-card" key={app.title}>
                <i className={`fas ${app.icon}`}></i>
                <h3>{app.title}</h3>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

