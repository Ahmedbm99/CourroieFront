import React, { useMemo } from 'react';
import useCart from '../hooks/useCart.js';
import { useLanguage } from '../contexts/LanguageContext';

export default function CartModal() {
  const { items, total, clear, remove, update, isCartOpen, setCartOpen } = useCart();
  const { t } = useLanguage();
  const display = isCartOpen ? 'block' : 'none';
  return (
    <div id="cartModal" className="modal" style={{ display }} onClick={e => { if (e.target.classList.contains('modal')) setCartOpen(false); }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3><i className="fas fa-shopping-cart"></i> {t('yourCart')}</h3>
          <span className="close" onClick={() => setCartOpen(false)}>&times;</span>
        </div>
        <div className="modal-body">
          <div id="cartItems" className="cart-items">
            {items.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>{t('emptyCart')}</p>
            ) : items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image_url} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-profile">{t('profile')}: {item.profile}</div>
                  <div className="cart-item-quantity">
                    <button className="quantity-btn" onClick={() => update(item.id, item.quantity - 1)}>-</button>
                    <input type="number" className="quantity-input" value={item.quantity} min="1" onChange={e => update(item.id, parseInt(e.target.value || '0', 10))} />
                    <button className="quantity-btn" onClick={() => update(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-price">
                  {item.price ? `${(item.price * item.quantity).toFixed(2)} TND` : <span style={{ color: '#64748b', fontStyle: 'italic' }}>{t('onQuote')}</span>}
                </div>
                <div className="cart-item-remove" onClick={() => remove(item.id)}>
                  <i className="fas fa-trash"></i>
                </div>
              </div>
            ))}
          </div>
          {total > 0 && (
            <div className="cart-total">
              <div className="total-line">
                <span>{t('total')}:</span>
                <span id="cartTotal">{total.toFixed(2)} TND</span>
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button id="clearCart" className="btn-secondary" onClick={clear}>{t('clearCart')}</button>
          <button id="requestQuote" className="cta-button primary" onClick={() => {
            const el = document.getElementById('quoteModal');
            window.dispatchEvent(new CustomEvent('open-quote'));
          }}>{t('requestQuote')}</button>
        </div>
      </div>
    </div>
  );
}

