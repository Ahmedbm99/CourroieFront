import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import FamilyServices from '../services/FamilyServices';
import TypesServices from '../services/TypesServices';
import { setFamily } from '../store/familySlice';
import { setTypes } from '../store/typeSlice';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const { t, language } = useLanguage();
  const [families, setFamilies] = useState([]);
  const [types, setTypesState] = useState([]);


  useEffect(() => {
    const fetchFamiliesWithTypes = async () => {
      // Only fetch if Redux store is empty
      if (families.length > 0 && types.length > 0) return;

      try {
        const familyResponse = await FamilyServices.getAllFamilies();
        const typeResponse = await TypesServices.getAllTypes();
        setFamilies(familyResponse.data);
        setTypesState(typeResponse.data);
        dispatch(setFamily(familyResponse.data));
        dispatch(setTypes(typeResponse.data));
      } catch (error) {
        console.error('Error fetching families or types:', error);
      }
    };

    fetchFamiliesWithTypes();

    // Scroll effect
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
  }, [dispatch, families.length, types.length]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>KORTIBELT</h2>
            <span className="logo-subtitle">
              <a
                href="https://www.aisgroup.tn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                AISGroup Tunisia
              </a>
            </span>
          </div>

          <ul className={`nav-menu ${mobileOpen ? 'active' : ''}`}>
            <li>
              <NavLink to="/" onClick={() => setMobileOpen(false)}>
                {t('home')}
              </NavLink>
            </li>

            {/* Show each family with its types */}
            {families && families.length > 0 ? (
              families.map((fam) => (
                <li key={fam.id} className="dropdown">
                  <span>
                    {language === 'fr' ? fam.nomFrancais : fam.nomAnglais}{' '}
                    <i className="fas fa-chevron-down"></i>
                  </span>
                  <div className="dropdown-content">
                    {types
                      .filter((type) => type.famille_id === fam.id)
                      .map((type) => (
                        <NavLink
                          key={type.id}
                          to={`/type/${type.id}`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {language === 'fr'
                            ? type.nomFrancais
                            : type.nomAnglais}
                        </NavLink>
                      ))}
                  </div>
                </li>
              ))
            ) : (
              <li>{t('loading')}...</li>
            )}

            <li>
              <NavLink to="/about" onClick={() => setMobileOpen(false)}>
                {t('about')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
                {t('contact')}
              </NavLink>
            </li>
          </ul>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '25px',
            }}
          >
            <LanguageSelector />
            <div
              className={`hamburger ${mobileOpen ? 'active' : ''}`}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
