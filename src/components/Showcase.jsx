import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const ShowcasePro = () => {
  const { language } = useLanguage();

  const showcaseItems = [
    {
      id: 1,
      title: language === 'fr' ? 'Courroies Synchrone' : 'Synchrone Belts',
      description:
        language === 'fr'
          ? 'Courroies robustes pour la transmission de puissance industrielle — longue durée de vie et fiabilité exceptionnelle.'
          : 'Robust belts for industrial power transmission — long lifetime and outstanding reliability.',
      image: 'https://deremaux.com/wp-content/uploads/courroie-synchrone-20190322.jpg',
      link: '/family/synchrones',
    },
    {
      id: 2,
      title: language === 'fr' ? 'Courroies Traprézoidale' : 'Trapezoidal Belts',
      description:
        language === 'fr'
          ? 'Performance et silence optimaux pour les moteurs et accessoires automobiles.'
          : 'Optimized performance and quiet operation for automotive engines and accessories.',
      image: 'https://www.atecfrance.fr/content/images/product_main/courroie-trapezoidale-linea-00.jpg',
        link: '/family/trapezoidales',
    },
    {
      id: 3,
      title: language === 'fr' ? 'Courroies Automobile' : 'Automotive Belts',
      description:
        language === 'fr'
          ? 'Solutions sur mesure pour environnements extrêmes, machines spéciales et besoins uniques.'
          : 'Tailor-made belt solutions for extreme environments, special machines, and unique requirements.',
      image: 'https://cdn-s-www.leprogres.fr/images/e4aeb08c-147f-42b9-9f43-85ca2addf3be/NW_raw/une-courroie-crantee-et-ses-deux-galets-tendeurs-changez-toutes-les-pieces-necessaires-il-en-va-de-la-bonne-sante-de-votre-automobile-photo-dr-1604394025.jpg',
      link: '/family/automobiles',
    },
  ];

  return (
    
    <section className="relative " style={{ background: '#f8f9fa', padding: '40px 0' }}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-14 tracking-tight">
          {language === 'fr' ? 'Nos Produits Phares' : 'Our Featured Products'}
        </h2>

        <Swiper
          modules={[Autoplay, Pagination,]}
          
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden"
        >
          {showcaseItems.map((item) => (
         <SwiperSlide key={item.id}>
  <div className="relative group">
    <div className="relative w-50px  overflow-hidden rounded-xl">
      <img
        src={item.image}
        alt={item.title}
          style={{ width: '70%', height: '600px' }}
        className="w-full h-full  object-center transition-transform duration-[4000ms] group-hover:scale-50"
      />
    </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white z-30 max-w-2xl transition-transform duration-700 transform translate-y-full group-hover:translate-y-0">
        <h3 className="text-2xl md:text-3xl font-semibold mb-3 leading-tight drop-shadow-md">
          {item.title}
        </h3>
        <p className="text-sm md:text-base font-light text-gray-200 mb-4 leading-relaxed">
          {item.description}
        </p>
      <Link
        to={item.link}
        className="inline-block px-7 py-3 bg-blue-600/90 backdrop-blur-sm rounded-md text-white font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg"
      >
        {language === 'fr' ? 'En savoir plus' : 'Learn more'}
      </Link>
    </div>
  </div>
</SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background: #3b82f6;
          opacity: 0.6;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: #1e40af;
          opacity: 1;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};

export default ShowcasePro;
