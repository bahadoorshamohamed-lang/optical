import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisitingCard from './components/VisitingCard';
import ProductCategories from './components/ProductCategories';
import Showcase360 from './components/Showcase360';
import ProductModal from './components/ProductModal';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);

  const handleExploreClick = () => {
    setActiveSection('categories');
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'eye-solutions' || sectionId === 'lenses' || sectionId === 'frames') {
      setActiveCategoryTab(sectionId);
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-optom-slate-bg antialiased selection:bg-optom-green selection:text-white">
      {/* Transparent Navigation Header */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={handleNavClick} 
      />

      {/* Main Showcase Page Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Section (Headline: Clear Vision. Better Life.) */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Section 2: 3D Flip Visiting Card (EXCLUSIVE PLACE FOR PERSONAL DETAILS) */}
        <VisitingCard />
        
        {/* Section 3: Showcase Product Catalogue (Active Focus shows ONLY on touch) */}
        <ProductCategories 
          onSelectProduct={(product) => setSelectedProduct(product)}
          activeTab={activeCategoryTab}
          setActiveTab={setActiveCategoryTab}
        />

        {/* Section 4: Arched Optical Product Showcase Viewer */}
        <Showcase360 />
        
        {/* Section 5: About Optical Showcase */}
        <About />
      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Product Detail Modal Popup */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}

export default App;
