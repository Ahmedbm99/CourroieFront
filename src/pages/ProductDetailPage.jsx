import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import { families } from '../data/families.js';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../i18n/languages.js';
import { mockProducts } from './FamilyPage.jsx';
export default function ProductDetailPage() {
  const { id } = useParams();
  console.log(mockProducts);
  const navigate = useNavigate();
  const { add, setCartOpen } = useCart();
  const { t, language } = useLanguage();
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
       // const data = await apiService.getProduct(id);
        console.log("Fetching product with id:", id);
       setProduct(mockProducts.find(p => p.id === parseInt(id)));
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
    if (!product) return;
    
    // Si une fiche technique est disponible dans la DB, télécharger directement
    if (product.datasheet_url) {
      const link = document.createElement('a');
      link.href = product.datasheet_url;
      link.download = `Datasheet-${product.name.replace(/\s+/g, '-')}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    
    // Sinon, générer une fiche technique HTML
    const datasheet = createDatasheet(product, language);
    const blob = new Blob([datasheet], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${language === 'fr' ? 'Fiche-Technique' : 'Datasheet'}-${product.name.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadExternalSheet = () => {
    if (!product || !product.external_sheet_url) return;
    
    const link = document.createElement('a');
    link.href = product.external_sheet_url;
    link.download = `External-Sheet-${product.name.replace(/\s+/g, '-')}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createDatasheet = (product, lang) => {
    const tr = (key) => getTranslation(lang, key, key);
    const family = families[product.category];
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fiche Technique - ${product.name}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .datasheet {
            background: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2563eb;
            font-size: 28px;
            margin: 0 0 10px 0;
        }
        .header h2 {
            color: #64748b;
            font-size: 18px;
            font-weight: normal;
            margin: 0;
        }
        .product-image {
            text-align: center;
            margin: 30px 0;
        }
        .product-image img {
            max-width: 400px;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        .info-section {
            margin: 30px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        .info-section h3 {
            color: #2563eb;
            margin-top: 0;
            font-size: 20px;
        }
        .info-row {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .info-label {
            font-weight: bold;
            color: #64748b;
            width: 200px;
        }
        .info-value {
            color: #1e293b;
            flex: 1;
        }
        .specifications {
            background: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3b82f6;
            margin: 20px 0;
        }
        .specifications h3 {
            color: #1e40af;
            margin-top: 0;
        }
        .specifications p {
            margin: 10px 0;
            line-height: 1.8;
            color: #1e293b;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="datasheet">
        <div class="header">
            <h1>KORTIBELT</h1>
            <h2>AISGroup Tunisia - Fiche Technique Produit</h2>
        </div>

        <div class="info-section">
            <h3>Information du Produit</h3>
            <div class="info-row">
                <span class="info-label">Nom du produit:</span>
                <span class="info-value">${product.name}</span>
            </div>
            <div class="info-row">
                <span class="info-label">${tr('category')}:</span>
                <span class="info-value">${family ? family.title : product.category}</span>
            </div>
            <div class="info-row">
                <span class="info-label">${tr('profile')}:</span>
                <span class="info-value">${product.profile}</span>
            </div>
            <div class="info-row">
                <span class="info-label">${tr('materials')}:</span>
                <span class="info-value">${product.material || tr('notSpecified')}</span>
            </div>
            <div class="info-row">
                <span class="info-label">${tr('reference')}:</span>
                <span class="info-value">${product.id}</span>
            </div>
        </div>

        <div class="product-image">
            <img src="${product.image_url}" alt="${product.name}" />
        </div>

        <div class="specifications">
            <h3>${tr('description')} et ${tr('specifications')}</h3>
            <p><strong>${tr('description')}:</strong></p>
            <p>${product.description}</p>
            ${product.specifications ? `
            <p><strong>${tr('specifications')}:</strong></p>
            <p>${product.specifications}</p>
            ` : ''}
        </div>

        ${family && family.description ? `
        <div class="specifications">
            <h3>${tr('familyCharacteristics')}</h3>
            <ul>
                ${family.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="footer">
            <p><strong>KORTIBELT</strong> - Marque africaine avec une technologie mondiale</p>
            <p>www.kortibelt.com | info@kortibelt.com</p>
            <p>Document généré le ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
    </div>
</body>
</html>
    `;
  };

  if (loading) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '80vh' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: '#2563eb' }}></i>
        <p style={{ marginTop: '20px', color: '#64748b' }}>{t('loading')}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '80vh' }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: '3rem', color: '#ef4444' }}></i>
        <h2 style={{ color: '#1e293b', marginTop: '20px' }}>{t('productNotFound')}</h2>
        <p style={{ color: '#64748b', marginBottom: '30px' }}>{error || t('productNotFound')}</p>
        <button className="cta-button primary" onClick={() => navigate('/')}>
          {t('back')}
        </button>
      </div>
    );
  }

  const family = families[product.category];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
            {t('back')}
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Image Section */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '120px'
            }}>
              <div style={{ position: 'relative', paddingBottom: '100%', background: '#f8f9fa', borderRadius: '8px', overflow: 'hidden' }}>
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: '#2563eb',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}>
                  {product.profile}
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <button
                  className="cta-button primary"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <i className="fas fa-cart-plus"></i> {t('addToCart')}
                </button>
                <button
                  className="cta-button secondary"
                  style={{ width: '100%', marginBottom: '10px' }}
                  onClick={() => {
                    add(product, 1);
                    window.dispatchEvent(new CustomEvent('open-quote'));
                  }}
                  disabled={product.stock === 0}
                >
                  <i className="fas fa-file-invoice"></i> {t('requestQuote')}
                </button>
                <button
                  className="btn-secondary"
                  style={{ width: '100%', marginBottom: product.external_sheet_url ? '10px' : '0' }}
                  onClick={handleDownloadDatasheet}
                >
                  <i className="fas fa-download"></i> {t('downloadDatasheet')}
                </button>
                {product.external_sheet_url && (
                  <button
                    className="btn-secondary"
                    style={{ width: '100%' }}
                    onClick={handleDownloadExternalSheet}
                  >
                    <i className="fas fa-file-pdf"></i> {t('downloadExternalSheet')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div>
            <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '10px' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '30px' }}>
              {family ? family.title : product.category}
            </p>

            <div style={{
              background: product.stock > 0 ? '#10b981' : '#ef4444',
              color: 'white',
              padding: '12px 20px',
              borderRadius: '8px',
              display: 'inline-block',
              marginBottom: '30px',
              fontWeight: 'bold'
            }}>
              <i className="fas fa-box"></i> {product.stock > 0 ? `${t('inStock')}  ` : t('outOfStock')}
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                {t('description')}
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#475569' }}>
                {product.description}
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                {t('specifications')}
              </h2>
              <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-line' }}>
                {product.specifications || t('noSpecs')}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
                {t('productDetails')}
              </h2>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('profile')}:</span>
                  <span style={{ color: '#1e293b' }}>{product.profile}</span>
                </div>
                <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('materials')}:</span>
                  <span style={{ color: '#1e293b' }}>{product.material || t('notSpecified')}</span>
                </div>
                <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('reference')}:</span>
                  <span style={{ color: '#1e293b', fontFamily: 'monospace' }}>{product.id}</span>
                </div>
                {product.subcategory && (
                  <div style={{ display: 'flex', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                    <span style={{ fontWeight: 'bold', color: '#64748b', minWidth: '150px' }}>{t('subcategory')}:</span>
                    <span style={{ color: '#1e293b' }}>{product.subcategory}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Family Description */}
        {family && family.description && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
              {t('familyCharacteristics')}
            </h2>
            <ul style={{ fontSize: '1rem', lineHeight: '2', color: '#475569', paddingLeft: '20px' }}>
              {family.description.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

