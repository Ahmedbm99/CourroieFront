import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WhatsAppButton() {
  const { t, language } = useLanguage(); // detect language (fr/en)
  const phoneNumber = "21652677764";
  const defaultMessage =
    language === 'fr'
      ? "Bonjour, je souhaite avoir plus d'informations."
      : "Hello, I would like to get more information.";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const [showBubble, setShowBubble] = useState(false);

  // ⏱️ Show popup after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '180px',
          right: '20px',
          zIndex: 999,
        }}
      >
        <button
          onClick={() => setShowBubble(!showBubble)}
          style={{
            background: '#25D366',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '55px',
            height: '55px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
            fontSize: '1.6rem',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1EBE57';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#25D366';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title={t('whatsappHelp')}
        >
          <i className="fab fa-whatsapp"></i>
        </button>
      </div>

      {/* Popup Bubble */}
      {showBubble && (
        <div
          style={{
            position: 'fixed',
            bottom: '250px',
            right: '20px',
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxWidth: '300px',
            minWidth: '250px',
            animation: 'fadeIn 0.4s ease',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <h3
              style={{
                margin: 0,
                color: '#1e293b',
                fontSize: '1.2rem',
              }}
            >
              <i
                className="fab fa-whatsapp"
                style={{ color: '#25D366', marginRight: '8px' }}
              ></i>
              {t('whatsappAssistance')}
            </h3>
            <button
              onClick={() => setShowBubble(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.3rem',
                color: '#94a3b8',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>

          <div style={{ color: '#475569', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '15px' }}>
              {language === 'fr'
                ? "Bonjour 👋\nBesoin d’aide ? Cliquez ci-dessous pour discuter sur WhatsApp."
                : "Hello 👋\nNeed help? Click below to chat on WhatsApp."}
            </p>

            <div
              style={{
                background: '#ecfdf5',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '15px',
                borderLeft: '4px solid #25D366',
              }}
            >
              <strong style={{ color: '#065f46' }}>
                {t('available')}
              </strong>
              <p
                style={{
                  margin: '5px 0 0 0',
                  color: '#047857',
                  fontSize: '0.9rem',
                }}
              >
                {t('availabilityTime')}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                width: '100%',
                background: '#25D366',
                color: 'white',
                textAlign: 'center',
                padding: '10px 0',
                borderRadius: '8px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#1EBE57')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = '#25D366')
              }
            >
              <i className="fab fa-whatsapp"></i> {t('chatOnWhatsApp')}
            </a>
          </div>
        </div>
      )}

      {/* Optional fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}
