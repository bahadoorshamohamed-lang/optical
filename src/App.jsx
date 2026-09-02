import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VisitingCard from './components/VisitingCard';
import EyewearAppeal from './components/EyewearAppeal';
import ProductCategories from './components/ProductCategories';
import Showcase360 from './components/Showcase360';
import ProductModal from './components/ProductModal';
import About from './components/About';
import Footer from './components/Footer';
import OpenPosterModal from './components/OpenPosterModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';
import { syncHeroSlidesWithAPI } from './data/heroSlides';
import { syncPostersWithAPI } from './data/posters';
import { syncAppealCategoriesWithAPI } from './data/appealCategories';
import { syncCategoryCardsWithAPI } from './data/productCategoryCards';
import { syncProductsWithAPI } from './data/products';
import { syncFramesCollectionWithAPI } from './data/framesCollection';
import { syncCorePurposeWithAPI } from './data/corePurpose';
import { syncLensesCollectionWithAPI } from './data/lensesCollection';
import { syncShowcase360WithAPI } from './data/showcase360';
import { syncTopBarDataWithAPI, syncFooterDataWithAPI } from './data/siteConfig';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);
  const [activeBrandFilter, setActiveBrandFilter] = useState('all');
  const [appSearchQuery, setAppSearchQuery] = useState('');

  // Live Multi-Device Sync Effect
  useEffect(() => {
    const runGlobalSync = () => {
      syncHeroSlidesWithAPI();
      syncPostersWithAPI();
      syncAppealCategoriesWithAPI();
      syncCategoryCardsWithAPI();
      syncProductsWithAPI();
      syncFramesCollectionWithAPI();
      syncCorePurposeWithAPI();
      syncLensesCollectionWithAPI();
      syncShowcase360WithAPI();
      syncTopBarDataWithAPI();
      syncFooterDataWithAPI();
    };

    runGlobalSync();
    const syncInterval = setInterval(runGlobalSync, 12000);
    return () => clearInterval(syncInterval);
  }, []);

  // Admin & Poster State Management
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('vco_admin_logged_in') === 'true';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState('topbar');
  const [forceOpenPoster, setForceOpenPoster] = useState(false);

  const handleOpenAdmin = (targetTab = 'topbar') => {
    if (typeof targetTab === 'string') {
      setAdminInitialTab(targetTab);
    }
    if (isAdminLoggedIn) {
      setShowAdminDashboard(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('vco_admin_logged_in', 'true');
    setShowAdminLogin(false);
    setShowAdminDashboard(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('vco_admin_logged_in');
    setShowAdminDashboard(false);
  };

  const handleTriggerPublicPoster = () => {
    setForceOpenPoster(true);
    // Reset force state after open triggers
    setTimeout(() => setForceOpenPoster(false), 500);
  };

  const handleExploreClick = () => {
    setActiveSection('categories');
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectBrand = (brandName) => {
    setActiveBrandFilter(brandName || 'all');
    setAppSearchQuery('');
    setActiveSection('categories');
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchQuery = (query) => {
    setAppSearchQuery(query || '');
    setActiveBrandFilter('all');
    setActiveSection('categories');
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAppealCategorySelect = (item) => {
    const target = item?.targetTab || 
      (item?.id ? item.id.replace('cat-', '').replace('appeal-', '') : null) || 
      (item?.label ? item.label.toLowerCase() : null);
    
    if (target) {
      setActiveCategoryTab(target);
    }
    setActiveSection('categories');
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
        onSelectBrand={handleSelectBrand}
        onSearchQuery={handleSearchQuery}
      />

      {/* Main Showcase Page Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Section 2: 3D Flip Visiting Card */}
        <VisitingCard />
        
        {/* Section 3: Eyewear With Mass Appeal */}
        <EyewearAppeal onSelectAppealCategory={handleAppealCategorySelect} />

        {/* Section 4: Showcase Product Catalogue */}
        <ProductCategories 
          activeTab={activeCategoryTab}
          setActiveTab={setActiveCategoryTab}
          activeBrand={activeBrandFilter}
          setActiveBrand={setActiveBrandFilter}
          externalSearchQuery={appSearchQuery}
          setExternalSearchQuery={setAppSearchQuery}
        />

        {/* Section 4: Arched Optical Product Showcase Viewer */}
        <Showcase360 />
        
        {/* Section 5: About Optical Showcase */}
        <About />
      </main>

      {/* Footer */}
      <Footer 
        onNavClick={handleNavClick}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Public Open Poster Modal (Auto opens for visitors & floating re-trigger button) */}
      <OpenPosterModal 
        forceOpen={forceOpenPoster} 
        onClose={() => setForceOpenPoster(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Admin Login Modal (admin / admin123) */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Admin Control Panel & Open Poster Management Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        initialTab={adminInitialTab}
        onClose={() => setShowAdminDashboard(false)}
        onLogout={handleAdminLogout}
        onTriggerPublicPoster={handleTriggerPublicPoster}
      />
    </div>
  );
}

export default App;
