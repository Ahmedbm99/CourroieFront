import React from 'react';
import { materialsTable, applicationsList } from '../data/families.js';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="brand-intro" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div className="intro-content">
            <h2>{t('about')}</h2>
            <p>{t('brandDescription1')}</p>
            <p>{t('brandDescription2')}</p>
          </div>
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

