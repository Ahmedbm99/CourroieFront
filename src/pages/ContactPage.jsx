import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';


function ContactPage(){
  const { t } = useLanguage();
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">{t('contactDistribution')}</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item"><i className="fas fa-map-marker-alt"></i><div><h4>{t('address')}</h4><p>{t('industrialZone')}<br/>{t('tunisia')}</p></div></div>
            <div className="contact-item"><i className="fas fa-phone"></i><div><h4>{t('phone')}</h4><p>+216 52 677 764</p></div></div>
            <div className="contact-item"><i className="fas fa-envelope"></i><div><h4>{t('email')}</h4><p>commercial@aisgroup.tn</p></div></div>
            <div className="contact-item"><i className="fas fa-globe"></i><div><h4>{t('website')}</h4><p>www.aisgroup.tn</p></div></div>
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

export default ContactPage;
