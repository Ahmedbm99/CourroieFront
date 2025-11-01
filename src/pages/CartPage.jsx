import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import { apiService } from '../services/apiService.js';
import { useLanguage } from '../contexts/LanguageContext';

export default function CartPage() {
  const { items, total, clear, remove, update, setCartOpen } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showQuoteModal, setShowQuoteModal] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function handleQuoteSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      setSubmitting(true);
      await apiService.createQuote({
        customerInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company
        },
        products: items,
        message: data.message
      });
      clear();
      setShowQuoteModal(false);
      e.currentTarget.reset();
      showToast('Demande de devis envoyée avec succès!', 'success');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      showToast(err.message || 'Erreur lors de l\'envoi du devis', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <button
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
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
            {t('back')}
          </button>
          <h1 style={{ fontSize: '2.5rem', color: '#1e293b', margin: 0 }}>
            <i className="fas fa-shopping-cart" style={{ marginRight: '15px' }}></i>
            {t('yourCart')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '10px' }}>
            {items.length === 0 ? t('emptyCart') : `${items.reduce((sum, item) => sum + item.quantity, 0)} ${t('itemsInCart')}`}
          </p>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '20px' }}></i>
            <h2 style={{ color: '#1e293b', marginBottom: '10px' }}>{t('emptyCart')}</h2>
            <p style={{ color: '#64748b', marginBottom: '30px' }}>{t('addProductsToCart')}</p>
            <button className="cta-button primary" onClick={() => navigate('/')}>
              <i className="fas fa-arrow-left"></i> {t('continueShopping')}
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {items.map(item => (
                <div key={item.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr auto auto',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  {/* Image */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: '#f8f9fa'
                  }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      color: '#1e293b',
                      margin: '0 0 10px 0'
                    }}>
                      {item.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      flexWrap: 'wrap',
                      color: '#64748b',
                      fontSize: '0.95rem'
                    }}>
                      <span><strong>Profil:</strong> {item.profile}</span>
                      {item.material && <span><strong>Matériau:</strong> {item.material}</span>}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <button
                        style={{
                          background: '#f8f9fa',
                          border: 'none',
                          padding: '10px 15px',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          color: '#475569'
                        }}
                        onClick={() => update(item.id, item.quantity - 1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span style={{
                        padding: '10px 20px',
                        minWidth: '60px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        borderLeft: '2px solid #e5e7eb',
                        borderRight: '2px solid #e5e7eb'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        style={{
                          background: '#f8f9fa',
                          border: 'none',
                          padding: '10px 15px',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          color: '#475569'
                        }}
                        onClick={() => update(item.id, item.quantity + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => remove(item.id)}
                    style={{
                      background: '#fee2e2',
                      color: '#ef4444',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 15px',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                    title="Supprimer du panier"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: '#1e293b',
                marginBottom: '20px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '15px'
              }}>
                {t('orderSummary')}
              </h2>
              {total > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#1e293b',
                  marginBottom: '20px'
                }}>
                  <span>{t('total')}:</span>
                  <span>{total.toFixed(2)} TND</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <button
                  className="btn-secondary"
                  onClick={clear}
                  style={{ flex: 1, minWidth: '150px' }}
                >
                  <i className="fas fa-trash"></i> {t('clearCart')}
                </button>
                <button
                  className="cta-button primary"
                  onClick={() => setShowQuoteModal(true)}
                  style={{ flex: 2, minWidth: '200px' }}
                >
                  <i className="fas fa-file-invoice"></i> {t('requestQuote')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="modal" style={{ display: 'block' }} onClick={e => {
          if (e.target.classList.contains('modal')) setShowQuoteModal(false);
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3><i className="fas fa-file-invoice"></i> {t('quoteRequest')}</h3>
              <span className="close" onClick={() => setShowQuoteModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <form className="quote-form" onSubmit={handleQuoteSubmit}>
                <div className="form-group">
                  <label htmlFor="customerName">{t('fullName')} *</label>
                  <input type="text" id="customerName" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="customerEmail">{t('email')} *</label>
                  <input type="email" id="customerEmail" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="customerPhone">{t('phone')}</label>
                  <input type="tel" id="customerPhone" name="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="customerCompany">{t('company')}</label>
                  <input type="text" id="customerCompany" name="company" />
                </div>
                <div className="form-group">
                  <label htmlFor="quoteMessage">{t('message')}</label>
                  <textarea id="quoteMessage" name="message" rows="4" placeholder={t('message')}></textarea>
                </div>
                <div className="quote-summary">
                  <h4>{t('orderSummary')}:</h4>
                  <div>
                    {items.map(item => (
                      <div className="quote-summary-item" key={item.id}>
                        <span>{item.name} (x{item.quantity})</span>
                        <span>{item.price ? `${(item.price * item.quantity).toFixed(2)} TND` : t('onQuote')}</span>
                      </div>
                    ))}
                    {total > 0 && (
                      <div className="quote-summary-item">
                        <span><strong>{t('total')}</strong></span>
                        <span><strong>{total.toFixed(2)} TND</strong></span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-secondary" onClick={() => setShowQuoteModal(false)}>{t('cancel')}</button>
                  <button type="submit" className="cta-button primary" disabled={submitting}>
                    {submitting ? t('sending') : t('sendRequest')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function showToast(message, type = 'info') {
  const el = document.createElement('div');
  el.className = `notification notification-${type}`;
  el.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i><span>${message}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('show'), 50);
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 3000);
}

