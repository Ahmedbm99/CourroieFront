import React from 'react';

import { FourSquare } from 'react-loading-indicators'; 
import ShowcaseComponent from '../components/Showcase.jsx';
import HeroSlideshow from '../components/HeroSlideshow';
import { useSelector } from 'react-redux';
import AboutSection from '../components/AboutSection.jsx';
import ApplicationsSection from '../components/ApplicationSection.jsx';
import FamillySection from '../components/FamillySection.jsx';
import TrustComponent from '../components/TrustComponent.jsx';
export default function HomePage() {
  
  
   const isLoadingFamily = useSelector((state) => state.family.isLoading);
    const isLoadingType = useSelector((state) => state.type.isLoading);
  

    if (isLoadingFamily && isLoadingType) {
      return (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <FourSquare color="#546d54" size="large" />
        </div>
      );
    }
  return (
    <>
      
     
      <HeroSlideshow />
      <FamillySection />
      <ShowcaseComponent />
       <ApplicationsSection />
       <AboutSection />
      <TrustComponent />

 
     
      
    </>
  );
}









