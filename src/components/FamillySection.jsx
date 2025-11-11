import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSelector } from 'react-redux';

export default function FamillySection(){
    const { t, language } = useLanguage(); 
    const navigate = useNavigate();

  const family = useSelector(state => state.family.list );
  return (
 <section id="familycard" className="familycard">
      <div className="container">
        <h2 className="section-title">{t('family')}</h2>

        <div className="familycard-grid" >
          {family && family.length > 0 ? (
            family.map((fam) => (
              <div key={fam.id} className="familycard-card" onClick={() => navigate(`/family/${fam.id}`)} style={{ cursor: "pointer" }}>
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