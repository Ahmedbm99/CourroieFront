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

  const families = useSelector(state => state.family.list);
  const types = useSelector(state => state.type.list);

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

  const family = families.find(f => f.id === product.famille_courroie_id);
  const type = types.find(t => t.id === product.type_courroie_id);
  const currentMaterial = Matieres[currentMaterialIndex]?.matiere || '-';
  const currentImage = Images[currentMaterialIndex]?.image_url || Images[0]?.image_url || null;
  const currentFiche = Fiche[currentMaterialIndex]?.fiche_technique_url || Fiche[0]?.fiche_technique_url || null;
  const specs = Object.entries(product).filter(
    ([key, value]) =>
      value !== null &&
      ![
        'id', 'nom', 'nomFrancais', 'nomAnglais',
        'descriptionFrancais', 'descriptionAnglais',
        'famille_courroie_id', 'type_courroie_id',
        'image_url', 'fiche_technique_url', 'profil'
      ].includes(key)
  );

  return (
   
    <div style={{ paddingTop: '200px', minHeight: '100vh' }}>
      
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}
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
          {/* Image & Actions */}
          <div>
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: '120px'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '100%',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                {Images[0] ? (
                  <img
                    src={`https://ahmedbm99.github.io/CourroieFront${currentImage }`}
                    alt={product.nom}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                ) : (
                  <p style={{ textAlign: 'center', paddingTop: '40%' }}>{t('imageInavailable')}</p>
                )}
              {currentMaterial && (
              <img
                src={`https://ahmedbm99.github.io/CourroieFront/badges/${
                  currentMaterial === 'CR'
                    ? 'power.jpg'
                    : currentMaterial === 'CR+NR' || currentMaterial === 'NR+CR'
                    ? 'standard.jpg'
                    : currentMaterial === 'EPDM'
                    ? 'ultra.jpg'
                    : 'titan.jpg'
                }`}
                alt={currentMaterial}
                style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  width: '150px',
                  height: '100px',
                  objectFit: 'contain',
                  borderRadius: '20%',
                  background: 'rgba(255, 255, 255, 0.8)',
                  padding: '5px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
            )}
                {product.profile && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: '#2563eb',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}
                  >
                    {product.profile}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

          {/* Info Section */}
          <div>
            <h1>{language === 'fr' ? product.nomFrancais || product.nom : product.nomAnglais || product.nom}</h1>

            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                {t('productDetails')}
              </h2>

              {/* Matériau */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '10px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '180px' }}>{t('Materials')}:</span>
                  <span style={{ fontSize:'1rem', color: '#1e293b', fontFamily: 'arial', marginLeft: '100px' }}>{currentMaterial}</span>
                </div>
                {Matieres.length > 1 && (
                  <button
                    onClick={handleNextMaterial}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    {t('changeMaterial')}
                  </button>
                )}
              </div>

              {/* Spécifications restantes */}
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
