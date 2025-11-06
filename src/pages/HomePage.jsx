import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ShowcaseComponent from '../components/Showcase.jsx';
import HeroSlideshow from '../components/HeroSlideshow';
import { useSelector } from 'react-redux';
export default function HomePage() {
  
  const { t } = useLanguage(); 

  return (
    <>

     
      <HeroSlideshow />
      <FamillySection />
      <ShowcaseComponent />
      
      {/* Trust badges */}
      <section style={{ background: '#f8f9fa', padding: '40px 0' }}>
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

 
      <ApplicationsSection />
      <AboutSection />
    </>
  );
}


function ApplicationsSection(){
  const { t } = useLanguage();
  return (
    <section id="applications" className="applications">
      <div className="container">
        <h2 className="section-title">{t('applications')}</h2>
        <div className="applications-grid">
          <div className="application-card"><i className="fas fa-industry"></i><h3>{t('industry')}</h3><p>{t('machinesPumps')}</p></div>
          <div className="application-card"><i className="fas fa-car"></i><h3>{t('automotive')}</h3><p>{t('engines')}</p></div>
          <div className="application-card"><i className="fas fa-tractor"></i><h3>{t('agriculture')}</h3><p>{t('tractors')}</p></div>
          <div className="application-card"><i className="fas fa-robot"></i><h3>{t('automation')}</h3><p>{t('robots')}</p></div>
          <div className="application-card"><i className="fas fa-conveyor-belt"></i><h3>{t('conveyors')}</h3><p>{t('productTransport')}</p></div>
        </div>
      </div>
    </section>
  );
}

function FamillySection(){
    const { t, language } = useLanguage(); 

  const family = useSelector(state => state.family.list );
  console.log("Families from Redux:", family);
  return (
 <section id="applications" className="applications">
      <div className="container">
        <h2 className="section-title">{t('family')}</h2>

        <div className="applications-grid">
          {family && family.length > 0 ? (
            family.map((fam) => (
              <div key={fam.id} className="application-card">
                <i className="fas fa-cog"></i>
                <h3>
                  {language === 'fr' ? fam.nomFrancais : fam.nomAnglais}
                </h3>
                <p>
                  {language === 'fr'
                    ? fam.descriptionFrancais
                    : fam.descriptionAnglais}
                </p>
              </div>
            ))
          ) : (
            <p>{t('loading')}...</p>
          )}
        </div>
      </div>
    </section>
  );
}

function AboutSection(){
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


