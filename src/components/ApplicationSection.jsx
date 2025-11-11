import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function ApplicationsSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Map application cards to a "filter value" you can use in your backend or frontend
  const applications = [
    { icon: 'fas fa-industry', title: t('industry'), desc: t('machinesPumps'), filter: 'industry' },
    { icon: 'fas fa-car', title: t('automotive'), desc: t('engines'), filter: 'automotive' },
    { icon: 'fas fa-tractor', title: t('agriculture'), desc: t('tractors'), filter: 'agriculture' },
    { icon: 'fas fa-robot', title: t('automation'), desc: t('robots'), filter: 'automation' },
    { icon: 'fas fa-conveyor-belt', title: t('conveyors'), desc: t('productTransport'), filter: 'conveyors' }
  ];

  const handleCardClick = (filter) => {
    // Navigate to /family route with query param ?application=filter
    navigate(`/family/?application=${filter}`);
  };

  return (
    <section id="applications" className="applications">
      <div className="container">
        <h2 className="section-title">{t('applications')}</h2>
        <div className="applications-grid">
          {applications.map((app) => (
            <div
              key={app.filter}
              className="application-card"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(app.filter)}
            >
              <i className={app.icon}></i>
              <h3>{app.title}</h3>
              <p>{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
