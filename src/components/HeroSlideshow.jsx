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
  const slides1 = [
    { key: '0', bg: './titan.png', title: t('power') },
    { key: '1', bg: './power.png', title: t('precision') },
    { key: '2', bg: './ultram.jpg', title: t('solution') },
    { key: '3', bg: './ultra.png', title: t('solution') },
    
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <BannerAnim prefixCls="banner-user" autoPlay style={{ height: '100%' }}>
        {slides1.map(({ key, bg, title }) => (
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
           
          </Element>
        ))}
      </BannerAnim>
    </div>
  );
}
