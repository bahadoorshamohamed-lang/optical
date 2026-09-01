import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Atlas URI Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://suriya1252004_db_user:blYx9eckhdKCBWX7@cluster0.fl5gxjr.mongodb.net/vision_care_opticals?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB Schemas
const TopBarSchema = new mongoose.Schema({
  phone: { type: String, default: '9047320092' },
  address: { type: String, default: 'Opposite to Government Hospital, Main Road, Omalur' },
  cityPincode: { type: String, default: 'Salem, Tamil Nadu - 636455' },
  tagline: { type: String, default: 'Complete Ophthalmic Lens Fitting & Eye Care' },
  workingHours: { type: String, default: 'Mon - Sat: 9:30 AM - 9:00 PM' },
  email: { type: String, default: 'visioncareomalur@gmail.com' },
  isTopBarVisible: { type: Boolean, default: true }
}, { timestamps: true });

const FooterSchema = new mongoose.Schema({
  aboutText: { type: String, default: 'Providing precision eye care, high-grade anti-glare & blue cut lenses, and curated spectacle frames.' },
  copyrightText: { type: String, default: '© 2026 Vision Care Opticals. All Rights Reserved.' },
  tagline: { type: String, default: 'Designed for Clear Vision & Optical Excellence' },
  addressLine: { type: String, default: 'Opposite to Government Hospital, Main Road, Omalur, Salem - 636455' },
  phone: { type: String, default: '9047320092' },
  email: { type: String, default: 'visioncareomalur@gmail.com' }
}, { timestamps: true });

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: String,
  title: String,
  name: String,
  subtitle: String,
  category: String,
  categoryLabel: String,
  shortDescription: String,
  description: String,
  fullDescription: String,
  tagline: String,
  lensType: String,
  coating: String,
  indexRate: String,
  imageUrl: String,
  hoverImageUrl: String,
  secondaryImageUrl: String,
  bgImage: String,
  targetTab: String,
  validUntil: String,
  createdAt: String,
  url: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true, strict: false });

const TopBarModel = mongoose.model('TopBar', TopBarSchema);
const FooterModel = mongoose.model('Footer', FooterSchema);
const AppealModel = mongoose.model('AppealCategory', ItemSchema);
const ProductModel = mongoose.model('Product', ItemSchema);
const FrameModel = mongoose.model('Frame', ItemSchema);
const PurposeModel = mongoose.model('PurposeItem', ItemSchema);
const LensModel = mongoose.model('LensItem', ItemSchema);
const HeroModel = mongoose.model('HeroSlide', ItemSchema);
const PosterModel = mongoose.model('Poster', ItemSchema);

// Initial Seed Function
const seedDatabase = async () => {
  try {
    const topBarCount = await TopBarModel.countDocuments();
    if (topBarCount === 0) {
      await TopBarModel.create({
        phone: '9047320092',
        address: 'Opposite to Government Hospital, Main Road, Omalur',
        cityPincode: 'Salem, Tamil Nadu - 636455',
        tagline: 'Complete Ophthalmic Lens Fitting & Eye Care',
        workingHours: 'Mon - Sat: 9:30 AM - 9:00 PM',
        email: 'visioncareomalur@gmail.com',
        isTopBarVisible: true
      });
    }

    const footerCount = await FooterModel.countDocuments();
    if (footerCount === 0) {
      await FooterModel.create({
        aboutText: 'Providing precision eye care, high-grade anti-glare & blue cut lenses, and curated spectacle frames for clear vision and everyday comfort.',
        copyrightText: '© 2026 Vision Care Opticals. All Rights Reserved.',
        tagline: 'Designed for Clear Vision & Optical Excellence',
        addressLine: 'Opposite to Government Hospital, Main Road, Omalur, Salem - 636455',
        phone: '9047320092',
        email: 'visioncareomalur@gmail.com'
      });
    }

    const appealCount = await AppealModel.countDocuments();
    if (appealCount === 0) {
      await AppealModel.insertMany([
        { id: 'cat-eyeglasses', label: 'Eyeglasses', title: 'Eyeglasses', subtitle: 'Trendy, Durable & Lightweight', imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80', targetTab: 'eyeglasses', isActive: true },
        { id: 'cat-lenses', label: 'Lenses', title: 'Lenses', subtitle: 'Anti-Glare & Blue Light Protection', imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80', targetTab: 'lenses', isActive: true },
        { id: 'cat-sunglasses', label: 'Sunglasses', title: 'Sunglasses', subtitle: 'UV Protection & Polarization', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80', targetTab: 'sunglasses', isActive: true },
        { id: 'cat-kids', label: 'Kids', title: 'Kids', subtitle: 'Flexible, Safe & Scratch Resistant', imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80', targetTab: 'kids', isActive: true }
      ]);
    }

    console.log('✅ MongoDB Database seeded successfully!');
  } catch (err) {
    console.error('Seed Error:', err.message);
  }
};

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    seedDatabase();
  })
  .catch((err) => console.error('❌ MongoDB Atlas Connection Error:', err.message));

// Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// TopBar API
app.get('/api/topbar', async (req, res) => {
  try {
    const data = await TopBarModel.findOne();
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/topbar', async (req, res) => {
  try {
    const data = await TopBarModel.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Footer API
app.get('/api/footer', async (req, res) => {
  try {
    const data = await FooterModel.findOne();
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/footer', async (req, res) => {
  try {
    const data = await FooterModel.findOneAndUpdate({}, req.body, { upsert: true, new: true });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Collection Handler Creator
const createMongoRoutes = (path, Model) => {
  app.get(`/api/${path}`, async (req, res) => {
    try {
      const list = await Model.find().sort({ createdAt: -1 });
      res.json(list);
    } catch (err) {
      console.error(`Error fetching ${path}:`, err.message);
      res.status(500).json({ error: err.message });
    }
  });
  app.post(`/api/${path}`, async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const cleanItems = req.body.map(item => {
          if (!item || typeof item !== 'object') return item;
          const { _id, __v, ...rest } = item;
          return rest;
        });
        await Model.deleteMany({});
        const list = await Model.insertMany(cleanItems);
        return res.json({ success: true, count: list.length, data: list });
      }
      const { _id, __v, ...rest } = req.body;
      const item = await Model.findOneAndUpdate({ id: req.body.id }, rest, { upsert: true, new: true });
      res.json({ success: true, data: item });
    } catch (err) {
      console.error(`Error saving ${path}:`, err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });
};

const CategoryCardModel = mongoose.model('CategoryCard', ItemSchema);

createMongoRoutes('appeal', AppealModel);
createMongoRoutes('products', ProductModel);
createMongoRoutes('frames', FrameModel);
createMongoRoutes('purpose', PurposeModel);
createMongoRoutes('lenses', LensModel);
createMongoRoutes('hero', HeroModel);
createMongoRoutes('posters', PosterModel);
createMongoRoutes('category-cards', CategoryCardModel);

app.listen(PORT, () => {
  console.log(`🚀 Vision Care Opticals API running on port ${PORT}`);
});
