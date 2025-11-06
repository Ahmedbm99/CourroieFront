import React, { useEffect, useMemo, useState } from 'react';
import useCart from '../hooks/useCart.js';
import  Api  from '../services/Api.js';
import { useLanguage } from '../contexts/LanguageContext';

export default function QuoteModal() {
  const { items, total, clear } = useCart();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener('open-quote', openHandler);
    return () => window.removeEventListener('open-quote', openHandler);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      setSubmitting(true);
      /*await apiService.createQuote({
        customerInfo: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company
        },
        products: items,
        message: data.message
      }); */
      clear();
      setOpen(false);
      e.currentTarget.reset();
      showToast(t('quoteSuccess'), 'success');
    } catch (err) {
      showToast(err.message || t('quoteError'), 'error');
    } finally {
      setSubmitting(false);
    }
  }

  const display = open ? 'block' : 'none';

  return (
    <div id="quoteModal" className="modal" style={{ display }} onClick={e => { if (e.target.classList.contains('modal')) setOpen(false); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3><i className="fas fa-file-invoice"></i> {t('quoteRequest')}</h3>
          <span className="close" onClick={() => setOpen(false)}>&times;</span>
        </div>
        <div className="modal-body">
          <form id="quoteForm" className="quote-form" onSubmit={onSubmit}>
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
              <textarea id="quoteMessage" name="message" rows="4" placeholder={t('describeNeeds')}></textarea>
            </div>
            <div className="quote-summary">
              <h4>{t('orderSummary')}:</h4>
              <div id="quoteSummary">
                {items.map(item => (
                  <div className="quote-summary-item" key={item.id}>
                    <span>{item.name} (x{item.quantity})</span>
                    <span>{item.price ? `${(item.price * item.quantity).toFixed(2)} TND` : <span style={{ color: '#64748b', fontStyle: 'italic' }}>{t('onQuote')}</span>}</span>
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
              <button type="button" className="btn-secondary" onClick={() => setOpen(false)}>{t('cancel')}</button>
              <button type="submit" className="cta-button primary" disabled={submitting}>{submitting ? t('sending') : t('sendRequest')}</button>
            </div>
          </form>
        </div>
      </div>
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

