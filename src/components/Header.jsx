import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('.header');
      if (!header) return;
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>KORTIBELT</h2>
            <span className="logo-subtitle">AISGroup Tunisia</span>
          </div>
          <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
          <li><a href="https://www.aisgroup.tn"  target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>{t('AIS GROUPE')}</a></li>
            <li><a href="/" onClick={() => setMobileOpen(false)}>{t('home')}</a></li>
            <li className="dropdown">
              <p>{t('products')} <i className="fas fa-chevron-down"></i></p>
              <div className="dropdown-content">
                <a href="/CourroieFront/family/trapezoidales" onClick={() => setMobileOpen(false)}>{t('trapezoidal')}</a>
                <a href="/CourroieFront/family/etroites" onClick={() => setMobileOpen(false)}>{t('narrowTrapezoidal')}</a>
                <a href="/CourroieFront/family/automobiles" onClick={() => setMobileOpen(false)}>{t('automotive')}</a>
                <a href="/CourroieFront/family/synchrones" onClick={() => setMobileOpen(false)}>{t('synchronous')}</a>
                <a href="/CourroieFront/family/variateur" onClick={() => setMobileOpen(false)}>{t('variator')}</a>
                <a href="/CourroieFront/family/speciales" onClick={() => setMobileOpen(false)}>{t('special')}</a>
              </div>
            </li>
            <li><NavLink to="/CourroieFront/about" onClick={() => setMobileOpen(false)}>{t('about')}</NavLink></li>
            <li><NavLink to="/CourroieFront/contact" onClick={() => setMobileOpen(false)}>{t('contact')}</NavLink></li>
          </ul> 
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <LanguageSelector />
            <div className={`hamburger ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(v => !v)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

