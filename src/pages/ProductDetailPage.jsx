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
    if (!product?.fiche_technique_url) return;
    const link = document.createElement('a');
    link.href = `https://ahmedbm99.github.io/CourroieFront${product.fiche_technique_url}`;
    link.download = `Datasheet-${product.nom}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading...</p>;
  if (error || !product) return <p>{t('productNotFound')}</p>;

  const family = families.find(f => f.id === product.famille_courroie_id);
  const type = types.find(t => t.id === product.type_courroie_id);

  const specs = Object.entries(product).filter(
    ([key, value]) =>
      value !== null &&
      ![
        'id',
        'nom',
        'nomFrancais',
        'nomAnglais',
        'descriptionFrancais',
        'descriptionAnglais',
        'famille_courroie_id',
        'type_courroie_id',
        'image_url',
        'fiche_technique_url',
        'profil'
      ].includes(key)
  );

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
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
                <img
                  src={`https://ahmedbm99.github.io/CourroieFront${product.image_url}`}
                  alt={product.nom}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
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
                {product.fiche_technique_url && (
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


         <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('Nom de famille')}:</span>
                  <span style={{ color: '#1e293b' }}> {family ? (language === 'fr' ? family.nomFrancais : family.nomAnglais) : '-'}</span>
                </div>
               <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('description famille')}:</span>
                  <span style={{ color: '#1e293b' }}> {(language === 'fr' ? family.descriptionFrancais : family.descriptionAnglais)}</span>
                </div>
               <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('Types')}:</span>
                  <span style={{ color: '#1e293b' }}> {type ? (language === 'fr' ? type.nomFrancais : type.nomAnglais) : '-'}</span>
                </div>
  <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('description')}:</span>
                  <span style={{ color: '#1e293b' }}> {(language === 'fr' ? type.descriptionFrancais : type.descriptionAnglais)} </span>
                </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                {t('productDetails')}
              </h2>
    <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
  <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
    {t('productDetails')}
  </h2>

  {[
    { key: 'profil', label: t('Profile') },
    { key: 'matiere', label: t('Materials') },
    { key: 'nom', label: t('Reference') },
    { key: 'largeur_mm', label: t('Largeur'), unit: 'mm' },
    { key: 'hauteur_mm', label: t('Hauteur'), unit: 'mm' },
    { key: 'pas_mm', label: t('Pas'), unit: 'mm' },
    { key: 'angle_trapeze_deg', label: t('Angle Trapèze'), unit: '°' },
    { key: 'poids_g_m', label: t('Poids'), unit: 'Grammes' },
    { key: 'fabricant', label: t('Fabricant') },
    { key: 'reference_fabricant', label: t('Reference Fabricant') },
    { key: 'longueur_int_mm', label: t('Longueur Intérieure'), unit: 'mm' },
    { key: 'longueur_prim_mm', label: t('Longueur Primitive'), unit: 'mm' },
    { key: 'longueur_ext_mm', label: t('Longueur Extérieure'), unit: 'mm' },
    { key: 'epaisseur_mm', label: t('Épaisseur'), unit: 'mm' },
    { key: 'nombre_dents', label: t('Nombre de Dents') },
    { key: 'nombre_nervures', label: t('Nombre de Nervures') },
    { key: 'temperature_min', label: t('Température Min'), unit: '°C' },
    { key: 'temperature_max', label: t('Température Max'), unit: '°C' },
    { key: 'vitesse_max_m_s', label: t('Vitesse Max'), unit: 'm/s' },
    { key: 'resistance_traction_n', label: t('Résistance Traction'), unit: 'N' },
    { key: 'durete_shore', label: t('Dureté Shore') },
    { key: 'resistance_usure', label: t('Résistance Usure') },
    { key: 'resistance_huile', label: t('Résistance Huile') },
    { key: 'resistance_chaleur', label: t('Résistance Chaleur') },
    { key: 'resistance_ozone', label: t('Résistance Ozone') },
    { key: 'conductivite_antistatique', label: t('Conductivité Antistatique') },
    { key: 'resistance_chimique', label: t('Résistance Chimique') },
    { key: 'allongement_max_pct', label: t('Allongement Max'), unit: '%' },
    { key: 'flexibilite', label: t('Flexibilité') },
    { key: 'renforcement', label: t('Renforcement') },
    { key: 'revetement', label: t('Revêtement') },
    { key: 'revetement_dents', label: t('Revêtement Dents') },
    { key: 'forme_dent', label: t('Forme Dent') },
    { key: 'type_denture', label: t('Type Denture') },
    { key: 'charge_max_n', label: t('Charge Max'), unit: 'N' },
    { key: 'tol_largeur_mm', label: t('Tolérance Largeur'), unit: 'mm' },
    { key: 'tol_hauteur_mm', label: t('Tolérance Hauteur'), unit: 'mm' }
  ].map(attr =>
    product[attr.key] !== null && (
      <div key={attr.key} style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '10px' }}>
        <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '180px' }}>{attr.label}:</span>
        <span style={{ color: '#1e293b', fontFamily: 'monospace' }}>
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
      </div>
   
  );
}
