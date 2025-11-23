import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useCart from '../hooks/useCart.js';
import { useLanguage } from '../contexts/LanguageContext';
import BeltsServices from '../services/BeltsServices.js';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add, setCartOpen } = useCart();
  const { t, language } = useLanguage();

const [zoomPosition, setZoomPosition] = useState(null);

  const [product, setProduct] = useState(null);
  const [Fiche, setFiche] = useState([]);
  const [Images, setImages] = useState([]);
  const [Matieres, setMatieres] = useState([]);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await BeltsServices.getBeltById(id);
        setProduct(response.data);
        setFiche(response.data.Fiches || []);
        setImages(response.data.Images || []);
        setMatieres(response.data.Matieres || []);
      } catch (err) {
        setError(t('productNotFound'));
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddToCart = () => {
    add(product, 1);
    setCartOpen(true);
  };

  const handleDownloadDatasheet = () => {
    if (!Fiche || Fiche.length === 0) return;
    const link = document.createElement('a');
    link.href = `https://ahmedbm99.github.io/CourroieFront${currentFiche}`;
    link.download = `Datasheet-${product.nom}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNextMaterial = () => {
    if (Matieres.length > 1) {
      setCurrentMaterialIndex((prevIndex) => (prevIndex + 1) % Matieres.length);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>{t('productNotFound')}</p>;

  const currentMaterial = Matieres[currentMaterialIndex]?.matiere || '-';
  const currentImage = Images[currentMaterialIndex]?.image_url || Images[0]?.image_url || null;
  const currentFiche = Fiche[currentMaterialIndex]?.fiche_technique_url || Fiche[0]?.fiche_technique_url || null;

  return (
    <div style={{ paddingTop: '200px', minHeight: '100vh' }}>
      <div className="container">
        
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          <i className="fas fa-arrow-left"></i> {t('back')}
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '40px',
            marginBottom: '40px'
          }}
        >
          <div>
            <div className="image-card">

              <div className="zoom-container"
                   onMouseMove={(e) => {
       const rect = e.currentTarget.getBoundingClientRect();
       const x = ((e.clientX - rect.left) / rect.width) * 100;
       const y = ((e.clientY - rect.top) / rect.height) * 100;

       setZoomPosition({ x, y });
     }}
     onMouseLeave={() => setZoomPosition(null)}
>
                {Images[0] ? (
                  <>
                    {currentMaterial && (
    <img
      src={`https://ahmedbm99.github.io/CourroieFront/badges/${
        currentMaterial === 'CR' ? 'power.png' :
        currentMaterial === 'CR+NR' || currentMaterial === 'NR+CR' ? 'standard.png' :
        currentMaterial === 'EPDM' ? 'ultra.png' :
        currentMaterial === 'HNBR' ? 'titan.png' :
        null
      }`}
      alt={currentMaterial}
      style={{
        position: 'absolute',
        top: '15px',
        left: '15px',
        width: '150px',
        height: '100px',
        zIndex:'999',
        objectFit: 'contain',
        borderRadius: '20%',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    />
  )}
                  <img
                    src={`https://ahmedbm99.github.io/CourroieFront${currentImage}`}
                    alt={product.nom}
                    className="zoom-img"
                    style={{
          transform: zoomPosition
            ? `scale(2) translate(${50 - zoomPosition.x}%, ${50 - zoomPosition.y}%)`
            : "scale(1)",
          transition: zoomPosition ? "transform 0.05s linear" : "transform 0.3s ease-out"
        }}
                  />
                        <div className="zoom-overlay"></div>

                  </>
                ) : (
                  <p style={{ textAlign: 'center', paddingTop: '40%' }}>{t('imageInavailable')}</p>
                )}
                
              </div>

              <div className="action-buttons">
                <button className="btn-secondary" onClick={handleAddToCart}>
                  {t('addToCart')}
                </button>

                {Fiche.length > 0 && (
                  <button className="btn-secondary" onClick={handleDownloadDatasheet}>
                    {t('downloadDatasheet')}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <h1>{language === 'fr' ? product.nomFrancais || product.nom : product.nomAnglais || product.nom}</h1>

            <div className="info-card">
              <h2 className="section-title">{t('productDetails')}</h2>

              <div className="info-row">
                <span className="info-label">{t('Materials')}:</span>
                <span className="info-value">{currentMaterial}</span>

                {Matieres.length > 1 && (
                  <button className="change-btn" onClick={handleNextMaterial}>
                    {t('changeMaterial')}
                  </button>
                )}
              </div>

              {[
                { key: 'profil', label: t('Profile') },
                { key: 'nom', label: t('Reference') },
                { key: 'largeur_mm', label: t('Largeur'), unit: 'mm' },
                { key: 'hauteur_mm', label: t('Hauteur'), unit: 'mm' },
                { key: 'pas_mm', label: t('Pas'), unit: 'mm' },
                { key: 'fabricant', label: t('Fabricant') },
                { key: 'reference_fabricant', label: t('Reference Fabricant') }
              ].map(attr =>
                product[attr.key] !== null && (
                  <div key={attr.key} style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '180px' }}>{attr.label}:</span>
                    <span style={{ fontSize: '1rem' , color: '#1e293b', fontFamily: 'sans-serif' }}>
                      {product[attr.key]} {attr.unit || ''}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
