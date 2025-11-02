import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import FamilyPage from './pages/FamilyPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CartModal from './components/CartModal.jsx';
import CartButton from './components/CartButton.jsx';
import QuoteModal from './components/QuoteModal.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import HelpButton from './components/HelpButton.jsx';
import ContactPage from './pages/ContactPage.jsx';

export default function App() {
  return (
    <>
      <Header />
     
      <Routes>
        <Route path="/CourroieFront/" element={<HomePage />} />
        <Route path="/CourroieFront/family" element={<FamilyPage />} />
        <Route path="/CourroieFront/family/:familyKey" element={<FamilyPage />} />
        <Route path="/CourroieFront/product/:id" element={<ProductDetailPage />} />
        <Route path="/CourroieFront/cart" element={<CartPage />} />
        <Route path="/CourroieFront/about" element={<AboutPage />} />
        <Route path="/CourroieFront/contact" element={<ContactPage />} />
      </Routes>
      
      <Footer />
      <CartButton />
      <HelpButton />
      <CartModal />
      <QuoteModal />
      <WhatsAppButton />
    </>
  );
}

