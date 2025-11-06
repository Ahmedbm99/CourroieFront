import React from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import { useLanguage } from '../contexts/LanguageContext';


import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

export default function AnimatedBanner() {
      const { t } = useLanguage();
  const slides = [
    { key: '0', bg: './etroite.jpg', title: t('power') },
    { key: '1', bg: './dente.jpg', title: t('precision') },
    { key: '2', bg: './speciale.jpg', title: t('solution') },
  ];


  return (
    <div style={{ height: '500px', width: '100%' }}>
      <BannerAnim prefixCls="banner-user" autoPlay style={{ height: '100%' }}>
        {slides.map(({ key, bg, title }) => (
          <Element
            prefixCls="banner-user-elem"
            key={key}
            style={{
              height: '100%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <BgElement
              key="bg"
              className="bg"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                background: `url(${bg}) no-repeat center center`,
                backgroundSize: 'cover',
                filter: 'brightness(0.85)',
                zIndex: 0,
                top: 0,
                left: 0,
              }}
            />
            <TweenOne
              className="banner-user-title"
              style={{
                position: 'relative',
                zIndex: 10,
                color: 'rgba(255, 255, 255, 1)',
                fontSize: 'clamp(1.5rem, 4vw, 3rem)', // responsive font size
                fontWeight: 'bold Arial',
                maxWidth: '90%',
                padding: '15rem 3rem',
                textShadow: '2 6px 18px rgba(0,0,0,0.7)',
              }}
              animation={{ delay:10, y:5, opacity: 0.9, type: 'from' }}
            >
              {title}
            </TweenOne>
          </Element>
        ))}
      </BannerAnim>
    </div>
  );
}
