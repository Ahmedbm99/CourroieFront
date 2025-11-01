import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService.js';
import useCart from '../hooks/useCart.js';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [showDimensionSearch, setShowDimensionSearch] = useState(false);
  const [dimensions, setDimensions] = useState({
    length_min: '',
    length_max: '',
    width_min: '',
    width_max: '',
    thickness_min: '',
    thickness_max: ''
  });
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const { add, setCartOpen } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      await apiService.healthCheck();
      const filters = {};
      if (dimensions.length_min || dimensions.length_max) {
        if (dimensions.length_min) filters.length_min = dimensions.length_min;
        if (dimensions.length_max) filters.length_max = dimensions.length_max;
      }
      if (dimensions.width_min || dimensions.width_max) {
        if (dimensions.width_min) filters.width_min = dimensions.width_min;
        if (dimensions.width_max) filters.width_max = dimensions.width_max;
      }
      if (dimensions.thickness_min || dimensions.thickness_max) {
        if (dimensions.thickness_min) filters.thickness_min = dimensions.thickness_min;
        if (dimensions.thickness_max) filters.thickness_max = dimensions.thickness_max;
      }
      const products = await apiService.getProducts(filters);
      setAllProducts(products);
      setFiltered(products);
    })();
  }, [dimensions]);

  useEffect(() => {
    let list = [...allProducts];
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.profile.toLowerCase().includes(q));
    }
    setFiltered(list);
    setPage(1);
  }, [allProducts, category, query]);

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const toShow = filtered.slice(0, endIndex);

  return (
    <>
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>{t('heroTitle')}</h1>
            <h2>{t('heroSubtitle')}</h2>
            <p>{t('heroDescription')}</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                <span>{t('fastDelivery')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                <i className="fas fa-shield-alt" style={{ color: '#2563eb' }}></i>
                <span>{t('guaranteedQuality')}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                <i className="fas fa-headset" style={{ color: '#10b981' }}></i>
                <span>Support expert</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a className="cta-button primary" href="#products">{t('discoverProducts')}</a>
              <button className="cta-button secondary">{t('downloadCatalog')}</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="KORTIBELT Transmission de puissance" />
          </div>
        </div>
      </section>

      <section className="brand-intro">
        <div className="container">
          <div className="intro-content">
            <h2>{t('brandIntro')}</h2>
            <p>{t('brandDescription1')}</p>
            <p>{t('brandDescription2')}</p>
          </div>
        </div>
      </section>

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

 
   
      <MaterialsSection />
      <ApplicationsSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

function MaterialsSection(){
  const { t } = useLanguage();
  return (
    <section id="materials" className="materials">
      <div className="container">
        <h2 className="section-title">{t('materialsTechnology')}</h2>
        <div className="materials-content">
          <div className="materials-table">
            <table>
              <thead><tr><th>{t('element')}</th><th>{t('matter')}</th><th>{t('function')}</th></tr></thead>
              <tbody>
                <tr><td><strong>{t('body')}</strong></td><td>CR Rubber / EPDM / PU</td><td>{t('heatResistance')}</td></tr>
                <tr><td><strong>{t('cord')}</strong></td><td>Kevlar / Polyester / Fibre de verre</td><td>{t('traction')}</td></tr>
                <tr><td><strong>{t('fabric')}</strong></td><td>Nylon / Coton / Linatex</td><td>{t('protection')}</td></tr>
                <tr><td><strong>{t('coating')}</strong></td><td>PU / PVC / Linatex</td><td>{t('adaptedApplication')}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="materials-image">
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt={t('crossSection')} />
            <p>{t('crossSection')}</p>
          </div>
        </div>
      </div>
    </section>
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

function ContactSection(){
  const { t } = useLanguage();
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">{t('contactDistribution')}</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item"><i className="fas fa-map-marker-alt"></i><div><h4>{t('address')}</h4><p>{t('industrialZone')}<br/>{t('tunisia')}</p></div></div>
            <div className="contact-item"><i className="fas fa-phone"></i><div><h4>{t('phone')}</h4><p>+216 ...</p></div></div>
            <div className="contact-item"><i className="fas fa-envelope"></i><div><h4>{t('email')}</h4><p>info@kortibelt.com</p></div></div>
            <div className="contact-item"><i className="fas fa-globe"></i><div><h4>{t('website')}</h4><p>www.kortibelt.com</p></div></div>
          </div>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder={t('yourName')} required />
            <input type="email" placeholder={t('yourEmail')} required />
            <input type="text" placeholder={t('subject')} required />
            <textarea placeholder={t('yourMessage')} rows="5" required></textarea>
            <button type="submit">{t('sendMessage')}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

