import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart.js';

export default function CartButton() {
  const { items } = useCart();
  const navigate = useNavigate();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-float" style={{
      position: 'fixed',
      bottom: '100px',
      right: '20px',
      zIndex: 999
    }}>
      <button
        onClick={() => navigate('/cart')}
        style={{
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '15px 24px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '1rem',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#1d4ed8';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#2563eb';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <i className="fas fa-shopping-cart"></i>
        <span>Panier</span>
        {itemCount > 0 && (
          <span style={{
            background: '#ef4444',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 'bold'
          }}>
            {itemCount}
          </span>
        )}
      </button>
    </div>
  );
}

