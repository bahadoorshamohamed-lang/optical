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
import { API_BASE } from './services/api';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);
  const [activeBrandFilter, setActiveBrandFilter] = useState('all');
  const [appSearchQuery, setAppSearchQuery] = useState('');

  // Live Multi-Device Real-Time Sync Effect (Instant SSE Stream + Fast Polling Fallback)
  useEffect(() => {
    let eventSource = null;

    const handleRemoteStreamUpdate = (payload) => {
      if (!payload || !payload.path || !payload.data) return;
      const { path, data } = payload;
      const cleanData = Array.isArray(data) ? data.map(item => {
        if (!item || typeof item !== 'object') return item;
        const { _id, __v, ...rest } = item;
        return rest;
      }) : data;

      if (path === 'products') {
        localStorage.setItem('vision_care_products_v10', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('products-updated', { detail: cleanData }));
      } else if (path === 'posters') {
        localStorage.setItem('vision_care_posters_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('posters-updated', { detail: cleanData }));
      } else if (path === 'hero') {
        localStorage.setItem('vision_care_hero_slides_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('hero-slides-updated', { detail: cleanData }));
      } else if (path === 'appeal') {
        localStorage.setItem('vision_care_appeal_categories_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('appeal-categories-updated', { detail: cleanData }));
      } else if (path === 'topbar') {
        localStorage.setItem('vision_care_topbar_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('topbar-updated', { detail: cleanData }));
      } else if (path === 'footer') {
        localStorage.setItem('vision_care_footer_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('footer-updated', { detail: cleanData }));
      } else if (path === 'frames') {
        localStorage.setItem('vision_care_frames_collection_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('frames-collection-updated', { detail: cleanData }));
      } else if (path === 'purpose') {
        localStorage.setItem('vision_care_core_purpose_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('core-purpose-updated', { detail: cleanData }));
      } else if (path === 'lenses') {
        localStorage.setItem('vision_care_lenses_collection_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('lenses-collection-updated', { detail: cleanData }));
      } else if (path === 'showcase360') {
        localStorage.setItem('vision_care_showcase360_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('showcase360-updated', { detail: cleanData }));
      } else if (path === 'category-cards') {
        localStorage.setItem('vision_care_category_cards_v1', JSON.stringify(cleanData));
        window.dispatchEvent(new CustomEvent('category-cards-updated', { detail: cleanData }));
      }
    };

    // 1. Establish SSE HTTP Stream Connection directly to Central Cloud API
    try {
      eventSource = new EventSource(`${API_BASE}/api/stream`);
      eventSource.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          handleRemoteStreamUpdate(parsed);
        } catch (e) {
          console.error('Error parsing live SSE event:', e);
        }
      };
    } catch (err) {
      console.warn('SSE Stream initialization fallback:', err);
    }

    const runGlobalSync = () => {
      syncProductsWithAPI();
      syncPostersWithAPI();
      syncAppealCategoriesWithAPI();
      syncTopBarDataWithAPI();

      setTimeout(() => {
        syncHeroSlidesWithAPI();
        syncCategoryCardsWithAPI();
        syncFramesCollectionWithAPI();
        syncCorePurposeWithAPI();
        syncLensesCollectionWithAPI();
        syncShowcase360WithAPI();
        syncFooterDataWithAPI();
      }, 500);
    };

    const initialSyncTimer = setTimeout(runGlobalSync, 100);
    const syncInterval = setInterval(runGlobalSync, 2000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        runGlobalSync();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', runGlobalSync);

    return () => {
      if (eventSource) eventSource.close();
      clearTimeout(initialSyncTimer);
      clearInterval(syncInterval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', runGlobalSync);
    };
  }, []);

  // Admin & Poster State Management
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('vco_admin_logged_in') === 'true';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState('products');
  const [forceOpenPoster, setForceOpenPoster] = useState(false);

  const handleOpenAdmin = (targetTab = 'products') => {
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

        {/* Section 4: Product Showcase Categories & Catalogue */}
        <ProductCategories 
          activeTab={activeCategoryTab}
          setActiveTab={setActiveCategoryTab}
          activeBrand={activeBrandFilter}
          setActiveBrand={setActiveBrandFilter}
          externalSearchQuery={appSearchQuery}
          setExternalSearchQuery={setAppSearchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />

        {/* Product Details Popup Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSelectBrand={handleSelectBrand}
          />
        )}

        {/* Section 5: Arched Optical Product Showcase Viewer */}
        <Showcase360 />
        
        {/* Section 6: About Optical Showcase */}
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
