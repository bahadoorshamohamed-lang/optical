import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Power, 
  LogOut, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Image as ImageIcon,
  Clock,
  ShieldCheck,
  LayoutGrid,
  TrendingUp,
  Sliders,
  Monitor,
  PhoneCall,
  PanelBottom,
  Save,
  MapPin,
  Mail,
  Building,
  Glasses,
  Layers,
  Scan,
  Target,
  Pencil
} from 'lucide-react';
import { getStoredPosters, savePosters } from '../data/posters';
import { getStoredHeroSlides, saveHeroSlides } from '../data/heroSlides';
import { 
  getStoredTopBarData, 
  saveTopBarData, 
  getStoredFooterData, 
  saveFooterData 
} from '../data/siteConfig';
import { getStoredAppealCategories, saveAppealCategories } from '../data/appealCategories';
import { getStoredProducts, saveProducts } from '../data/products';
import { getStoredFramesCollection, saveFramesCollection } from '../data/framesCollection';
import { getStoredCorePurpose, saveCorePurpose } from '../data/corePurpose';
import { getStoredLensesCollection, saveLensesCollection } from '../data/lensesCollection';
import ImageUploaderInput from './ImageUploaderInput';

const HERO_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1920&q=80',
];

const POSTER_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80',
];

const AdminDashboard = ({ isOpen, onClose, onLogout, onTriggerPublicPoster }) => {
  const [activeTab, setActiveTab] = useState('topbar'); // 'topbar' | 'footer' | 'appeal' | 'products' | 'frames' | 'purpose' | 'lenses' | 'hero' | 'posters'
  
  // Data states
  const [posters, setPosters] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [topBarConfig, setTopBarConfig] = useState(getStoredTopBarData());
  const [footerConfig, setFooterConfig] = useState(getStoredFooterData());
  const [appealCategories, setAppealCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [framesCollection, setFramesCollection] = useState([]);
  const [corePurposeItems, setCorePurposeItems] = useState([]);
  const [lensesCollection, setLensesCollection] = useState([]);

  // Form & Action states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState('hero'); // 'hero' | 'poster' | 'appeal' | 'product' | 'frame' | 'purpose' | 'lens'
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmInfo, setDeleteConfirmInfo] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State Objects
  const [heroFormData, setHeroFormData] = useState({
    url: HERO_PRESET_IMAGES[0],
    title: '',
    isActive: true,
  });

  const [posterFormData, setPosterFormData] = useState({
    imageUrl: POSTER_PRESET_IMAGES[0],
    validUntil: '2026-12-31',
    isActive: true,
  });

  const [appealFormData, setAppealFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    imageUrl: '',
    targetTab: 'all',
    isActive: true,
  });

  const [productFormData, setProductFormData] = useState({
    id: '',
    name: '',
    category: 'lenses',
    categoryLabel: 'Lenses',
    shortDescription: '',
    fullDescription: '',
    imageUrl: '',
    hoverImageUrl: '',
  });

  const [frameFormData, setFrameFormData] = useState({
    id: '',
    name: '',
    category: 'PREMIUM EXECUTIVE',
    imageUrl: '',
    isActive: true,
  });

  const [purposeFormData, setPurposeFormData] = useState({
    id: '',
    label: '',
    tagline: '',
    description: '',
    bgImage: '',
    isActive: true,
  });

  const [lensFormData, setLensFormData] = useState({
    id: '',
    name: '',
    lensType: 'SINGLE VISION',
    coating: 'Scratch-Resistant & Hard Coat',
    indexRate: '1.56 Mid-Index',
    description: '',
    imageUrl: '',
    isActive: true,
  });

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    setPosters(getStoredPosters());
    setHeroSlides(getStoredHeroSlides());
    setTopBarConfig(getStoredTopBarData());
    setFooterConfig(getStoredFooterData());
    setAppealCategories(getStoredAppealCategories());
    setProducts(getStoredProducts());
    setFramesCollection(getStoredFramesCollection());
    setCorePurposeItems(getStoredCorePurpose());
    setLensesCollection(getStoredLensesCollection());
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- TOPBAR & FOOTER SAVE HANDLERS ---
  const handleSaveTopBarConfig = (e) => {
    e.preventDefault();
    saveTopBarData(topBarConfig);
    showToast('Top Bar settings saved & updated live!');
  };

  const handleSaveFooterConfig = (e) => {
    e.preventDefault();
    saveFooterData(footerConfig);
    showToast('Footer section settings saved & updated live!');
  };

  // --- HERO SLIDES CRUD HANDLERS ---
  const handleOpenAddHeroForm = () => {
    setEditingItem(null);
    setFormType('hero');
    setHeroFormData({
      url: HERO_PRESET_IMAGES[Math.floor(Math.random() * HERO_PRESET_IMAGES.length)],
      title: 'Optical Eyewear Showcase',
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditHeroForm = (slide) => {
    setEditingItem(slide);
    setFormType('hero');
    setHeroFormData({
      url: slide.url || HERO_PRESET_IMAGES[0],
      title: slide.title || '',
      isActive: slide.isActive !== undefined ? slide.isActive : true,
    });
    setIsFormOpen(true);
  };

  const handleSaveHeroSlide = (e) => {
    e.preventDefault();
    if (!heroFormData.url.trim()) return;

    let updatedList = [];
    if (editingItem) {
      updatedList = heroSlides.map(s => 
        s.id === editingItem.id ? { ...s, ...heroFormData } : s
      );
      showToast('Hero background image updated!');
    } else {
      const newSlide = {
        id: `hero-${Date.now()}`,
        ...heroFormData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      updatedList = [newSlide, ...heroSlides];
      showToast('New Hero background image added!');
    }

    setHeroSlides(updatedList);
    saveHeroSlides(updatedList);
    setIsFormOpen(false);
  };

  // --- MASS APPEAL CATEGORIES CRUD HANDLERS ---
  const handleOpenAddAppealForm = () => {
    setEditingItem(null);
    setFormType('appeal');
    setAppealFormData({
      id: `appeal-${Date.now()}`,
      title: '',
      subtitle: '',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      targetTab: 'all',
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditAppealForm = (item) => {
    setEditingItem(item);
    setFormType('appeal');
    setAppealFormData({ ...item });
    setIsFormOpen(true);
  };

  const handleSaveAppealForm = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingItem) {
      updatedList = appealCategories.map(a => a.id === editingItem.id ? appealFormData : a);
      showToast('Appeal category saved!');
    } else {
      updatedList = [appealFormData, ...appealCategories];
      showToast('New appeal category added!');
    }
    setAppealCategories(updatedList);
    saveAppealCategories(updatedList);
    setIsFormOpen(false);
  };

  // --- OPTICAL PRODUCTS CRUD HANDLERS ---
  const handleOpenAddProductForm = () => {
    setEditingItem(null);
    setFormType('product');
    setProductFormData({
      id: `prod-${Date.now()}`,
      name: '',
      category: 'lenses',
      categoryLabel: 'Lenses',
      shortDescription: '',
      fullDescription: '',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      hoverImageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80',
    });
    setIsFormOpen(true);
  };

  const handleOpenEditProductForm = (prod) => {
    setEditingItem(prod);
    setFormType('product');
    setProductFormData({
      ...prod,
      hoverImageUrl: prod.hoverImageUrl || prod.secondaryImageUrl || prod.hoverImage || ''
    });
    setIsFormOpen(true);
  };

  const handleSaveProductForm = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingItem) {
      updatedList = products.map(p => p.id === editingItem.id ? productFormData : p);
      showToast('Product details updated!');
    } else {
      updatedList = [productFormData, ...products];
      showToast('New optical product added!');
    }
    setProducts(updatedList);
    saveProducts(updatedList);
    setIsFormOpen(false);
  };

  // --- MARQUEE FRAMES CRUD HANDLERS ---
  const handleOpenAddFrameForm = () => {
    setEditingItem(null);
    setFormType('frame');
    setFrameFormData({
      id: `frame-${Date.now()}`,
      name: '',
      category: 'PREMIUM EXECUTIVE',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditFrameForm = (frame) => {
    setEditingItem(frame);
    setFormType('frame');
    setFrameFormData({ ...frame });
    setIsFormOpen(true);
  };

  const handleSaveFrameForm = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingItem) {
      updatedList = framesCollection.map(f => f.id === editingItem.id ? frameFormData : f);
      showToast('Frame item updated!');
    } else {
      updatedList = [frameFormData, ...framesCollection];
      showToast('New frame added to collection!');
    }
    setFramesCollection(updatedList);
    saveFramesCollection(updatedList);
    setIsFormOpen(false);
  };

  // --- CORE PURPOSE CRUD HANDLERS ---
  const handleOpenAddPurposeForm = () => {
    setEditingItem(null);
    setFormType('purpose');
    setPurposeFormData({
      id: `purpose-${Date.now()}`,
      label: '',
      tagline: '',
      description: '',
      bgImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditPurposeForm = (item) => {
    setEditingItem(item);
    setFormType('purpose');
    setPurposeFormData({ ...item });
    setIsFormOpen(true);
  };

  const handleSavePurposeForm = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingItem) {
      updatedList = corePurposeItems.map(cp => cp.id === editingItem.id ? purposeFormData : cp);
      showToast('Core purpose item updated!');
    } else {
      updatedList = [...corePurposeItems, purposeFormData];
      showToast('New core purpose item added!');
    }
    setCorePurposeItems(updatedList);
    saveCorePurpose(updatedList);
    setIsFormOpen(false);
  };

  // --- LENSES COLLECTION CRUD HANDLERS ---
  const handleOpenAddLensForm = () => {
    setEditingItem(null);
    setFormType('lens');
    setLensFormData({
      id: `lens-item-${Date.now()}`,
      name: '',
      lensType: 'SINGLE VISION',
      coating: 'Scratch-Resistant & Hard Coat',
      indexRate: '1.56 Mid-Index',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80',
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditLensForm = (lens) => {
    setEditingItem(lens);
    setFormType('lens');
    setLensFormData({ ...lens });
    setIsFormOpen(true);
  };

  const handleSaveLensForm = (e) => {
    e.preventDefault();
    let updatedList;
    if (editingItem) {
      updatedList = lensesCollection.map(l => l.id === editingItem.id ? lensFormData : l);
      showToast('Lens item updated!');
    } else {
      updatedList = [lensFormData, ...lensesCollection];
      showToast('New lens type added to collection!');
    }
    setLensesCollection(updatedList);
    saveLensesCollection(updatedList);
    setIsFormOpen(false);
  };

  const handleDeleteHeroSlide = (id) => {
    const updatedList = heroSlides.filter(s => s.id !== id);
    setHeroSlides(updatedList);
    saveHeroSlides(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Hero background image deleted.');
  };

  const handleToggleHeroActive = (id) => {
    const updatedList = heroSlides.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    setHeroSlides(updatedList);
    saveHeroSlides(updatedList);
    showToast('Hero slide visibility updated!');
  };

  // --- OPEN POSTERS CRUD HANDLERS ---
  const handleOpenAddPosterForm = () => {
    setEditingItem(null);
    setPosterFormData({
      imageUrl: POSTER_PRESET_IMAGES[Math.floor(Math.random() * POSTER_PRESET_IMAGES.length)],
      validUntil: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditPosterForm = (poster) => {
    setEditingItem(poster);
    setPosterFormData({
      imageUrl: poster.imageUrl || POSTER_PRESET_IMAGES[0],
      validUntil: poster.validUntil || '',
      isActive: poster.isActive !== undefined ? poster.isActive : true,
    });
    setIsFormOpen(true);
  };

  const handleSavePoster = (e) => {
    e.preventDefault();
    if (!posterFormData.imageUrl.trim()) return;

    let updatedList = [];
    if (editingItem) {
      updatedList = posters.map(p => 
        p.id === editingItem.id ? { ...p, ...posterFormData } : p
      );
      showToast('Open Poster image updated!');
    } else {
      const newPoster = {
        id: `poster-${Date.now()}`,
        ...posterFormData,
        createdAt: new Date().toISOString().split('T')[0],
      };
      updatedList = [newPoster, ...posters];
      showToast('New Open Poster created & published!');
    }

    setPosters(updatedList);
    savePosters(updatedList);
    setIsFormOpen(false);
  };

  const handleDeletePoster = (id) => {
    const updatedList = posters.filter(p => p.id !== id);
    setPosters(updatedList);
    savePosters(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Open Poster deleted.');
  };

  const handleTogglePosterActive = (id) => {
    const updatedList = posters.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    );
    setPosters(updatedList);
    savePosters(updatedList);
    showToast('Poster visibility updated!');
  };

  // --- EYEWEAR WITH MASS APPEAL HANDLERS ---
  const handleToggleAppealActive = (id) => {
    const updatedList = appealCategories.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setAppealCategories(updatedList);
    saveAppealCategories(updatedList);
    showToast('Appeal category updated live!');
  };

  const handleDeleteAppealCategory = (id) => {
    const updatedList = appealCategories.filter(item => item.id !== id);
    setAppealCategories(updatedList);
    saveAppealCategories(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Appeal category deleted.');
  };

  // --- ALL OPTICAL PRODUCTS HANDLERS ---
  const handleDeleteProduct = (id) => {
    const updatedList = products.filter(p => p.id !== id);
    setProducts(updatedList);
    saveProducts(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Optical product deleted.');
  };

  // --- FRAMES COLLECTION MARQUEE HANDLERS ---
  const handleToggleFrameActive = (id) => {
    const updatedList = framesCollection.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setFramesCollection(updatedList);
    saveFramesCollection(updatedList);
    showToast('Frame item visibility updated!');
  };

  const handleDeleteFrame = (id) => {
    const updatedList = framesCollection.filter(item => item.id !== id);
    setFramesCollection(updatedList);
    saveFramesCollection(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Frame item deleted from collection.');
  };

  // --- CORE PURPOSE FOCUS ITEMS HANDLERS ---
  const handleToggleCorePurposeActive = (id) => {
    const updatedList = corePurposeItems.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setCorePurposeItems(updatedList);
    saveCorePurpose(updatedList);
    showToast('Core purpose item updated!');
  };

  const handleDeleteCorePurpose = (id) => {
    const updatedList = corePurposeItems.filter(item => item.id !== id);
    setCorePurposeItems(updatedList);
    saveCorePurpose(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Core purpose item deleted.');
  };

  // --- LENSES COLLECTION HANDLERS ---
  const handleToggleLensActive = (id) => {
    const updatedList = lensesCollection.map(item =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setLensesCollection(updatedList);
    saveLensesCollection(updatedList);
    showToast('Lens item visibility updated!');
  };

  const handleDeleteLens = (id) => {
    const updatedList = lensesCollection.filter(item => item.id !== id);
    setLensesCollection(updatedList);
    saveLensesCollection(updatedList);
    setDeleteConfirmInfo(null);
    showToast('Lens item deleted from collection.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      
      {/* Main Dashboard Window with Premium White Background & Glass Stroke */}
      <div className="relative w-full max-w-5xl bg-white/98 text-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-950/20 border border-slate-200/90 my-6 flex flex-col max-h-[92vh]">
        
        {/* Premium Dashboard Top Navigation Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-white/10 text-emerald-400 border border-white/10 shadow-inner backdrop-blur-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-serif font-extrabold tracking-tight text-white">
                  Vision Care Opticals
                </h2>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-widest">
                  Live Admin Control
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Dynamic Storefront Content & Inventory Management Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onTriggerPublicPoster}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 text-white hover:bg-white/20 text-xs font-bold transition-all border border-white/10 shadow-xs backdrop-blur-md"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Preview Poster</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500/20 text-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all border border-rose-500/30 shadow-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High-End Segmented Navigation Bar */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200/80 overflow-x-auto flex-shrink-0 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab('topbar')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'topbar'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-emerald-500" />
              <span>Top Bar Header</span>
            </button>

            <button
              onClick={() => setActiveTab('footer')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'footer'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <PanelBottom className="w-4 h-4 text-emerald-500" />
              <span>Footer Section</span>
            </button>

            <button
              onClick={() => setActiveTab('appeal')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'appeal'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Mass Appeal ({appealCategories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'products'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <Glasses className="w-4 h-4 text-emerald-500" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('frames')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'frames'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <Scan className="w-4 h-4 text-blue-500" />
              <span>Frames Marquee ({framesCollection.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('purpose')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'purpose'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <Target className="w-4 h-4 text-purple-500" />
              <span>Core Purpose ({corePurposeItems.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('lenses')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'lenses'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <Eye className="w-4 h-4 text-cyan-500" />
              <span>Lenses ({lensesCollection.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'hero'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <Monitor className="w-4 h-4 text-indigo-500" />
              <span>Hero Slides ({heroSlides.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('posters')}
              className={`px-4 py-2.5 rounded-2xl text-xs transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'posters'
                  ? 'bg-slate-900 text-white font-black shadow-md scale-[1.02]'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 font-bold border border-slate-200/60'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-rose-500" />
              <span>Open Posters ({posters.length})</span>
            </button>
          </div>
        </div>

        {/* Floating Glass Toast Notification */}
        {toastMessage && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black px-6 py-3 flex items-center justify-center gap-2 animate-fadeIn flex-shrink-0 shadow-lg tracking-wide">
            <CheckCircle2 className="w-4 h-4 animate-bounce" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-grow bg-slate-50/50">
          
          {/* TAB 1: TOP BAR SETTINGS CRUD */}
          {activeTab === 'topbar' && (
            <form onSubmit={handleSaveTopBarConfig} className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                      <PhoneCall className="w-5 h-5 text-optom-green" />
                      <span>Top Header Announcement & Contact Bar</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      Configure store contact phone, address, timings, and header tagline displayed at the top of every page.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-600">Show Top Bar:</span>
                    <input
                      type="checkbox"
                      checked={topBarConfig.isTopBarVisible}
                      onChange={(e) => setTopBarConfig({ ...topBarConfig, isTopBarVisible: e.target.checked })}
                      className="w-5 h-5 text-optom-green accent-optom-green rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      Store Phone Number *
                    </label>
                    <div className="relative">
                      <PhoneCall className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={topBarConfig.phone}
                        onChange={(e) => setTopBarConfig({ ...topBarConfig, phone: e.target.value })}
                        placeholder="9047320092"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      Store Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={topBarConfig.email}
                        onChange={(e) => setTopBarConfig({ ...topBarConfig, email: e.target.value })}
                        placeholder="visioncareomalur@gmail.com"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                      />
                    </div>
                  </div>

                  {/* Address Line */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      Store Address Line
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={topBarConfig.address}
                        onChange={(e) => setTopBarConfig({ ...topBarConfig, address: e.target.value })}
                        placeholder="Opposite to Government Hospital, Main Road, Omalur"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                      />
                    </div>
                  </div>

                  {/* City & Pincode */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      City, State & Pincode
                    </label>
                    <input
                      type="text"
                      value={topBarConfig.cityPincode}
                      onChange={(e) => setTopBarConfig({ ...topBarConfig, cityPincode: e.target.value })}
                      placeholder="Salem, Tamil Nadu - 636455"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                    />
                  </div>

                  {/* Working Hours */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      Working Hours Display
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={topBarConfig.workingHours}
                        onChange={(e) => setTopBarConfig({ ...topBarConfig, workingHours: e.target.value })}
                        placeholder="Mon - Sat: 9:30 AM - 9:00 PM"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                      />
                    </div>
                  </div>

                  {/* Store Tagline */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      Header Tagline / Specialty
                    </label>
                    <input
                      type="text"
                      value={topBarConfig.tagline}
                      onChange={(e) => setTopBarConfig({ ...topBarConfig, tagline: e.target.value })}
                      placeholder="Complete Ophthalmic Lens Fitting & Eye Care"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                    />
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider hover:bg-optom-green-hover transition-all shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Top Bar Changes</span>
                  </button>
                </div>

              </div>
            </form>
          )}

          {/* TAB 2: FOOTER SECTION SETTINGS CRUD */}
          {activeTab === 'footer' && (
            <form onSubmit={handleSaveFooterConfig} className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-5">
                
                <div className="pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <PanelBottom className="w-5 h-5 text-optom-green" />
                    <span>Footer Section Content & Branding</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Customize footer bio paragraph, copyright statement, and store footer tagline.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* About Bio Text */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                      Footer About Bio Description *
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={footerConfig.aboutText}
                      onChange={(e) => setFooterConfig({ ...footerConfig, aboutText: e.target.value })}
                      placeholder="Providing precision eye care, high-grade anti-glare & blue cut lenses..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Copyright Text */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                        Copyright Notice Line
                      </label>
                      <input
                        type="text"
                        value={footerConfig.copyrightText}
                        onChange={(e) => setFooterConfig({ ...footerConfig, copyrightText: e.target.value })}
                        placeholder="© 2026 Vision Care Opticals. All Rights Reserved."
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                      />
                    </div>

                    {/* Footer Tagline */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                        Footer Quality Tagline
                      </label>
                      <input
                        type="text"
                        value={footerConfig.tagline}
                        onChange={(e) => setFooterConfig({ ...footerConfig, tagline: e.target.value })}
                        placeholder="Designed for Clear Vision & Optical Excellence"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                      />
                    </div>

                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider hover:bg-optom-green-hover transition-all shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Footer Settings</span>
                  </button>
                </div>

              </div>
            </form>
          )}

          {/* TAB 3: EYEWEAR WITH MASS APPEAL CRUD */}
          {activeTab === 'appeal' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>Eyewear With Mass Appeal Categories ({appealCategories.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Manage the circular animated category avatars shown in the "Eyewear With Mass Appeal" section.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddAppealForm}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-amber-600 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {appealCategories.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all p-5 flex flex-col justify-between space-y-4 ${
                      item.isActive ? 'border-emerald-300 shadow-md' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-300 flex-shrink-0 bg-slate-100">
                        <img src={item.imageUrl} alt={item.label} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-optom-slate-heading">{item.label}</h4>
                        <p className="text-xs text-slate-500">{item.subtitle}</p>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                          Filter: #{item.targetTab || item.id}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleAppealActive(item.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                          item.isActive
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-optom-green border border-emerald-200'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{item.isActive ? 'Active' : 'Disabled'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditAppealForm(item)}
                        className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit Category"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmInfo({ id: item.id, type: 'appeal' })}
                        className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ALL OPTICAL PRODUCTS CRUD */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <Glasses className="w-5 h-5 text-emerald-600" />
                    <span>All Optical Products Catalogue ({products.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Manage spectacle frames, anti-glare lenses, and eye-care solutions in the main product showcase.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddProductForm}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {products.map((product) => {
                  const hImg = product.hoverImageUrl || product.secondaryImageUrl || product.hoverImage;
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
                    >
                      <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            hImg ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
                          }`} 
                        />
                        {hImg && (
                          <img 
                            src={hImg} 
                            alt={`${product.name} 2nd Photo`} 
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                          />
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-optom-green border border-slate-200 shadow-2xs">
                          {product.categoryLabel || product.category}
                        </span>
                        {hImg && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-slate-900/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-2xs">
                            2 Photos
                          </span>
                        )}
                      </div>

                      <div className="p-3 space-y-1">
                        <h5 className="text-xs font-bold text-optom-slate-heading line-clamp-1">{product.name}</h5>
                        <p className="text-[10px] text-slate-500 line-clamp-1">{product.shortDescription}</p>
                      </div>

                      <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">#{product.id}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditProductForm(product)}
                            className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                            title="Edit Product"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmInfo({ id: product.id, type: 'product' })}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: OUR FRAMES COLLECTION MARQUEE CRUD */}
          {activeTab === 'frames' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <Scan className="w-5 h-5 text-blue-600" />
                    <span>Our Frames Marquee Collection ({framesCollection.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Manage the 3D staggered marquee frame collection showcased on the About page.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddFrameForm}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Frame</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {framesCollection.map((frame) => (
                  <div
                    key={frame.id}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all p-4 flex flex-col justify-between space-y-4 ${
                      frame.isActive !== false ? 'border-blue-200 shadow-md' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img src={frame.imageUrl} alt={frame.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-white/95 text-blue-700 shadow-2xs border border-blue-200">
                        {frame.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-optom-slate-heading line-clamp-1">{frame.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">#{frame.id}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleFrameActive(frame.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                          frame.isActive !== false
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{frame.isActive !== false ? 'Active' : 'Disabled'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditFrameForm(frame)}
                        className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Edit Frame"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmInfo({ id: frame.id, type: 'frame' })}
                        className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Frame"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CORE PURPOSE ITEMS CRUD */}
          {activeTab === 'purpose' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span>Core Purpose Focus Areas ({corePurposeItems.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Manage Vision, Style, Comfort, and health focus features in the Core Purpose section.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddPurposeForm}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-purple-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Focus Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {corePurposeItems.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all p-5 flex flex-col justify-between space-y-4 ${
                      item.isActive !== false ? 'border-purple-200 shadow-md' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                          {item.label}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">#{item.id}</span>
                      </div>
                      <h4 className="text-sm font-serif font-extrabold text-optom-slate-heading">{item.tagline}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">{item.description}</p>
                    </div>

                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img src={item.bgImage} alt={item.label} className="w-full h-full object-cover" />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleCorePurposeActive(item.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                          item.isActive !== false
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{item.isActive !== false ? 'Active' : 'Disabled'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditPurposeForm(item)}
                        className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
                        title="Edit Purpose Item"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmInfo({ id: item.id, type: 'purpose' })}
                        className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Purpose Focus Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: LENSES COLLECTION CRUD */}
          {activeTab === 'lenses' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <Eye className="w-5 h-5 text-cyan-600" />
                    <span>Lenses Technology Collection ({lensesCollection.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Manage high-index anti-glare, blue-cut, progressive, photochromic, and custom optical lenses.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddLensForm}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-cyan-700 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Lens</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {lensesCollection.map((lens) => (
                  <div
                    key={lens.id}
                    className={`bg-white rounded-3xl overflow-hidden border transition-all p-5 flex flex-col justify-between space-y-4 ${
                      lens.isActive !== false ? 'border-cyan-200 shadow-md' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative">
                        <img src={lens.imageUrl} alt={lens.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-cyan-700 border border-cyan-200 shadow-2xs">
                          {lens.lensType}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-optom-slate-heading line-clamp-1">{lens.name}</h4>
                        <p className="text-xs font-semibold text-emerald-600 mt-0.5 line-clamp-1">{lens.coating}</p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{lens.description}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleToggleLensActive(lens.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                          lens.isActive !== false
                            ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{lens.isActive !== false ? 'Active' : 'Disabled'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditLensForm(lens)}
                        className="p-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors"
                        title="Edit Lens Item"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmInfo({ id: lens.id, type: 'lens' })}
                        className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                        title="Delete Lens Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: HERO BACKGROUND IMAGES MANAGER */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              
              {/* Action Header Strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-optom-green" />
                    <span>Hero Section Background Slideshow ({heroSlides.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Manage full-width background images that automatically rotate every 3 seconds in the main Hero section.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddHeroForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider hover:bg-optom-green-hover transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Hero Background Image</span>
                </button>
              </div>

              {/* Hero Slides Grid Cards */}
              {heroSlides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6">
                  {heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id}
                      className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                        slide.isActive 
                          ? 'border-emerald-300 shadow-md hover:shadow-xl' 
                          : 'border-slate-200 opacity-60 hover:opacity-100 shadow-xs'
                      }`}
                    >
                      {/* Thumbnail Image Viewport */}
                      <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden group">
                        <img
                          src={slide.url}
                          alt={slide.title || `Hero Slide ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-2 left-3 text-white text-xs font-bold truncate pr-12">
                          #{idx + 1} {slide.title || 'Hero Background'}
                        </div>

                        {/* Status Switch */}
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => handleToggleHeroActive(slide.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-transform active:scale-95 ${
                              slide.isActive 
                                ? 'bg-optom-green text-white ring-2 ring-emerald-300' 
                                : 'bg-white text-slate-600 border border-slate-200'
                            }`}
                          >
                            <Power className="w-3 h-3" />
                            <span>{slide.isActive ? 'Active' : 'Hidden'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Actions Footer */}
                      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleToggleHeroActive(slide.id)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                            slide.isActive 
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' 
                              : 'bg-emerald-50 text-optom-green hover:bg-optom-green hover:text-white border border-emerald-200'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{slide.isActive ? 'Hide' : 'Activate'}</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditHeroForm(slide)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-optom-green hover:border-emerald-300 transition-colors shadow-2xs"
                          title="Edit Image"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmInfo({ id: slide.id, type: 'hero' })}
                          className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors shadow-2xs"
                          title="Delete Hero Slide"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <Sparkles className="w-8 h-8 text-optom-green mx-auto" />
                  <h4 className="text-base font-serif font-extrabold text-optom-slate-heading">No Hero Background Images</h4>
                  <button
                    onClick={handleOpenAddHeroForm}
                    className="px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase"
                  >
                    Add First Hero Background
                  </button>
                </div>
              )}

            </div>
          )}

          {/* TAB 4: OPEN POSTERS MANAGER */}
          {activeTab === 'posters' && (
            <div className="space-y-6">
              
              {/* Action Header Strip */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <div>
                  <h3 className="text-lg font-serif font-extrabold text-optom-slate-heading flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-optom-green" />
                    <span>Open Poster Management (Image Only)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Upload image posters that pop up when visitors open the site. No text required.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddPosterForm}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider hover:bg-optom-green-hover transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Image Poster</span>
                </button>
              </div>

              {/* Posters Grid Cards */}
              {posters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-6">
                  {posters.map((poster) => (
                    <div
                      key={poster.id}
                      className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
                        poster.isActive 
                          ? 'border-emerald-300 shadow-md hover:shadow-xl' 
                          : 'border-slate-200 opacity-60 hover:opacity-100 shadow-xs'
                      }`}
                    >
                      {/* Poster Image Viewport */}
                      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden group">
                        <img
                          src={poster.imageUrl}
                          alt="Vision Care Open Poster"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Status Pill */}
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => handleTogglePosterActive(poster.id)}
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-transform active:scale-95 ${
                              poster.isActive 
                                ? 'bg-optom-green text-white ring-2 ring-emerald-300' 
                                : 'bg-white text-slate-600 border border-slate-200'
                            }`}
                          >
                            <Power className="w-3 h-3" />
                            <span>{poster.isActive ? 'Active (Live)' : 'Inactive'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Poster Metadata Strip */}
                      <div className="p-4 bg-white flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          Valid: <strong className="text-slate-800 font-bold">{poster.validUntil || 'Always'}</strong>
                        </span>
                        <span>{poster.createdAt || 'Recent'}</span>
                      </div>

                      {/* Actions Footer */}
                      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleTogglePosterActive(poster.id)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-2xs ${
                            poster.isActive 
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200' 
                              : 'bg-emerald-50 text-optom-green hover:bg-optom-green hover:text-white border border-emerald-200'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{poster.isActive ? 'Deactivate' : 'Activate'}</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditPosterForm(poster)}
                          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-optom-green hover:border-emerald-300 transition-colors shadow-2xs"
                          title="Edit Image / Date"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmInfo({ id: poster.id, type: 'poster' })}
                          className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors shadow-2xs"
                          title="Delete Poster"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <Sparkles className="w-8 h-8 text-optom-green mx-auto" />
                  <h4 className="text-base font-serif font-extrabold text-optom-slate-heading">No Image Posters Created</h4>
                  <button
                    onClick={handleOpenAddPosterForm}
                    className="px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider"
                  >
                    Upload Image Poster
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* CREATE / EDIT FORM MODAL FOR ALL SECTIONS */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white text-slate-800 rounded-3xl overflow-hidden shadow-modal border border-slate-200 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xl font-serif font-extrabold text-optom-slate-heading">
                {editingItem ? `Edit ${formType.toUpperCase()} Item` : `Add New ${formType.toUpperCase()} Item`}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. HERO SLIDE FORM */}
            {formType === 'hero' && (
              <form onSubmit={handleSaveHeroSlide} className="space-y-5">
                <ImageUploaderInput
                  label="Hero Background Image"
                  value={heroFormData.url}
                  onChange={(newUrl) => setHeroFormData({ ...heroFormData, url: newUrl })}
                  required
                  presetImages={HERO_PRESET_IMAGES}
                  accentColor="emerald"
                />

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                    Slide Description / Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={heroFormData.title}
                    onChange={(e) => setHeroFormData({ ...heroFormData, title: e.target.value })}
                    placeholder="e.g. Handcrafted Acetate Frames Showcase"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-optom-green-hover"
                  >
                    {editingItem ? 'Save Hero Slide' : 'Add Hero Slide'}
                  </button>
                </div>
              </form>
            )}

            {/* 2. OPEN POSTER FORM */}
            {formType === 'poster' && (
              <form onSubmit={handleSavePoster} className="space-y-5">
                <ImageUploaderInput
                  label="Poster Image"
                  value={posterFormData.imageUrl}
                  onChange={(newUrl) => setPosterFormData({ ...posterFormData, imageUrl: newUrl })}
                  required
                  presetImages={POSTER_PRESET_IMAGES}
                  accentColor="emerald"
                />

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">
                    Offer Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={posterFormData.validUntil}
                    onChange={(e) => setPosterFormData({ ...posterFormData, validUntil: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-optom-green/50 focus:border-optom-green"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-optom-green text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-optom-green-hover"
                  >
                    {editingItem ? 'Save Poster Image' : 'Publish Image Poster'}
                  </button>
                </div>
              </form>
            )}

            {/* 3. MASS APPEAL CATEGORY FORM */}
            {formType === 'appeal' && (
              <form onSubmit={handleSaveAppealForm} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Category Title *</label>
                  <input
                    type="text"
                    required
                    value={appealFormData.label || appealFormData.title}
                    onChange={(e) => setAppealFormData({ ...appealFormData, label: e.target.value, title: e.target.value })}
                    placeholder="e.g. Eyeglasses, Lenses, Sunglasses"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Subtext Tagline *</label>
                  <input
                    type="text"
                    required
                    value={appealFormData.subtitle}
                    onChange={(e) => setAppealFormData({ ...appealFormData, subtitle: e.target.value })}
                    placeholder="e.g. Trendy, Durable & Lightweight"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <ImageUploaderInput
                  label="Category Image"
                  value={appealFormData.imageUrl}
                  onChange={(newUrl) => setAppealFormData({ ...appealFormData, imageUrl: newUrl })}
                  required
                  accentColor="amber"
                />

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-2xl bg-amber-500 text-white text-xs font-extrabold uppercase shadow-md hover:bg-amber-600">Save Category</button>
                </div>
              </form>
            )}

            {/* 4. OPTICAL PRODUCT FORM */}
            {formType === 'product' && (
              <form onSubmit={handleSaveProductForm} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                    placeholder="e.g. Zeiss Anti-Reflective Blue-Cut Lens"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Category Key</label>
                    <select
                      value={productFormData.category}
                      onChange={(e) => setProductFormData({ 
                        ...productFormData, 
                        category: e.target.value,
                        categoryLabel: e.target.options[e.target.selectedIndex].text 
                      })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="spectacles">Spectacles</option>
                      <option value="lenses">Lenses</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Category Label</label>
                    <input
                      type="text"
                      value={productFormData.categoryLabel || productFormData.category}
                      onChange={(e) => setProductFormData({ ...productFormData, categoryLabel: e.target.value })}
                      placeholder="e.g. Lenses"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Short Feature Description</label>
                  <input
                    type="text"
                    value={productFormData.shortDescription}
                    onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                    placeholder="e.g. Hydrophobic & Anti-Scratch Coating"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-emerald-600" />
                      <span>Product Photos (2 Photo Support - Device, Camera or URL)</span>
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      Hover Effect Ready
                    </span>
                  </div>

                  <ImageUploaderInput
                    label="Photo 1: Primary Product Image"
                    value={productFormData.imageUrl}
                    onChange={(newUrl) => setProductFormData({ ...productFormData, imageUrl: newUrl })}
                    required
                    accentColor="emerald"
                  />

                  <ImageUploaderInput
                    label="Photo 2: Secondary Image (Shown on Hover)"
                    value={productFormData.hoverImageUrl || ''}
                    onChange={(newUrl) => setProductFormData({ ...productFormData, hoverImageUrl: newUrl })}
                    accentColor="emerald"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold uppercase shadow-md hover:bg-emerald-700">Save Product (2 Photos)</button>
                </div>
              </form>
            )}

            {/* 5. MARQUEE FRAME FORM */}
            {formType === 'frame' && (
              <form onSubmit={handleSaveFrameForm} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Frame Name *</label>
                  <input
                    type="text"
                    required
                    value={frameFormData.name}
                    onChange={(e) => setFrameFormData({ ...frameFormData, name: e.target.value })}
                    placeholder="e.g. Titanium Executive Rectangular"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Category Badge Text *</label>
                  <input
                    type="text"
                    required
                    value={frameFormData.category}
                    onChange={(e) => setFrameFormData({ ...frameFormData, category: e.target.value })}
                    placeholder="e.g. PREMIUM TITANIUM, ACETATE LUXE"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <ImageUploaderInput
                  label="Frame Image"
                  value={frameFormData.imageUrl}
                  onChange={(newUrl) => setFrameFormData({ ...frameFormData, imageUrl: newUrl })}
                  required
                  accentColor="blue"
                />

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-2xl bg-blue-600 text-white text-xs font-extrabold uppercase shadow-md hover:bg-blue-700">Save Frame</button>
                </div>
              </form>
            )}

            {/* 6. CORE PURPOSE FORM */}
            {formType === 'purpose' && (
              <form onSubmit={handleSavePurposeForm} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Focus Area Label *</label>
                  <input
                    type="text"
                    required
                    value={purposeFormData.label}
                    onChange={(e) => setPurposeFormData({ ...purposeFormData, label: e.target.value })}
                    placeholder="e.g. VISION PRECISION"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Headline Tagline *</label>
                  <input
                    type="text"
                    required
                    value={purposeFormData.tagline}
                    onChange={(e) => setPurposeFormData({ ...purposeFormData, tagline: e.target.value })}
                    placeholder="e.g. Computer Eyestrain Protection"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-serif font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Paragraph Description *</label>
                  <textarea
                    rows="3"
                    required
                    value={purposeFormData.description}
                    onChange={(e) => setPurposeFormData({ ...purposeFormData, description: e.target.value })}
                    placeholder="Detailed overview of feature..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <ImageUploaderInput
                  label="Background Image"
                  value={purposeFormData.bgImage}
                  onChange={(newUrl) => setPurposeFormData({ ...purposeFormData, bgImage: newUrl })}
                  required
                  accentColor="purple"
                />

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-2xl bg-purple-600 text-white text-xs font-extrabold uppercase shadow-md hover:bg-purple-700">Save Focus Item</button>
                </div>
              </form>
            )}

            {/* 7. LENSES COLLECTION FORM */}
            {formType === 'lens' && (
              <form onSubmit={handleSaveLensForm} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Lens Model Name *</label>
                  <input
                    type="text"
                    required
                    value={lensFormData.name}
                    onChange={(e) => setLensFormData({ ...lensFormData, name: e.target.value })}
                    placeholder="e.g. Crizal Sapphire HR Anti-Reflective"
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Lens Type</label>
                    <input
                      type="text"
                      required
                      value={lensFormData.lensType}
                      onChange={(e) => setLensFormData({ ...lensFormData, lensType: e.target.value })}
                      placeholder="e.g. SINGLE VISION, PROGRESSIVE"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Coating</label>
                    <input
                      type="text"
                      required
                      value={lensFormData.coating}
                      onChange={(e) => setLensFormData({ ...lensFormData, coating: e.target.value })}
                      placeholder="e.g. Blue-Cut + Anti-Glare"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-optom-slate-heading uppercase tracking-wider block">Lens Description</label>
                  <textarea
                    rows="3"
                    value={lensFormData.description}
                    onChange={(e) => setLensFormData({ ...lensFormData, description: e.target.value })}
                    placeholder="Provide optical benefits..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <ImageUploaderInput
                  label="Lens Image"
                  value={lensFormData.imageUrl}
                  onChange={(newUrl) => setLensFormData({ ...lensFormData, imageUrl: newUrl })}
                  required
                  accentColor="cyan"
                />

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold">Cancel</button>
                  <button type="submit" className="px-6 py-3 rounded-2xl bg-cyan-600 text-white text-xs font-extrabold uppercase shadow-md hover:bg-cyan-700">Save Lens Item</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center text-slate-800 shadow-modal border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-serif font-extrabold text-optom-slate-heading">
                Delete {deleteConfirmInfo.type === 'hero' ? 'Hero Background' : 'Poster'}?
              </h4>
              <p className="text-xs text-slate-500 font-medium">This action cannot be undone. Are you sure you want to delete this item?</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmInfo(null)}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirmInfo.type === 'hero') {
                    handleDeleteHeroSlide(deleteConfirmInfo.id);
                  } else if (deleteConfirmInfo.type === 'poster') {
                    handleDeletePoster(deleteConfirmInfo.id);
                  } else if (deleteConfirmInfo.type === 'appeal') {
                    handleDeleteAppealCategory(deleteConfirmInfo.id);
                  } else if (deleteConfirmInfo.type === 'product') {
                    handleDeleteProduct(deleteConfirmInfo.id);
                  } else if (deleteConfirmInfo.type === 'frame') {
                    handleDeleteFrame(deleteConfirmInfo.id);
                  } else if (deleteConfirmInfo.type === 'purpose') {
                    handleDeleteCorePurpose(deleteConfirmInfo.id);
                  } else if (deleteConfirmInfo.type === 'lens') {
                    handleDeleteLens(deleteConfirmInfo.id);
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-rose-700 transition-colors shadow-xs"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
