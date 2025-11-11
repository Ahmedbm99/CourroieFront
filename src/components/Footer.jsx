import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t('kortibelt')}</h3>
            <p className="footer-subtitle">{t('aisGroup')}</p>
            <p>{t('africanBrand')}</p>
          </div>
          <div className="footer-section">
            <h4>{t('products')}</h4>
            <ul>
              <li><a href="#trapezoidales">{t('trapezoidal')}</a></li>
              <li><a href="#etroites">{t('narrowTrapezoidal')}</a></li>
              <li><a href="#automobiles">{t('automotive')}</a></li>
              <li><a href="#synchrones">{t('synchronous')}</a></li>
              <li><a href="#variateur">{t('variator')}</a></li>
              <li><a href="#speciales">{t('special')}</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('information')}</h4>
            <ul>
              <li><a href="#about">{t('about')}</a></li>
              <li><a href="#materials">{t('materialsTechnology')}</a></li>
              <li><a href="#applications">{t('applications')}</a></li>
              <li><a href="#contact">{t('contact')}</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{t('contact')}</h4>
            <p><i className="fas fa-map-marker-alt"></i> {t('industrialZone')}, {t('tunisia')}</p>
            <p><i className="fas fa-phone"></i> +216 74 461 168 </p>
            <p><i class="fa-brands fa-whatsapp"></i> +216 52 677 764</p>
            <p><i class="fa-brands fa-whatsapp"></i>+216 58 419 119</p>
            <p><i class="fa-brands fa-weixin"></i> medfakhfakh</p>
          
            <p><i className="fas fa-envelope"></i> commercial@aisgroup.tn</p>
            <p><i className="fas fa-globe"></i>  <a
                    href="https://www.aisgroup.tn"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  > www.aisgroup.tn </a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 {t('aisGroup')} <a href="https://www.aisgroup.tn" target='_blank' rel="noopener noreferrer" style={{textDecoration: 'none', color:'inherit'}} > www.aisgroup.tn.</a> {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

