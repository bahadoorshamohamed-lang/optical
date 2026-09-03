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

    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      await ProductModel.insertMany([
        {
                "id": "drive-prod-01",
                "name": "HARZEL",
                "brand": "Harzel",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "harzel",
                        "eyeglasses",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Harzel HARZEL optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Harzel",
                        "Model": "HARZEL",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1hVRZeec_1ukj3nUTz5mFtWU69alGSYbr",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1hVRZeec_1ukj3nUTz5mFtWU69alGSYbr"
        },
        {
                "id": "drive-prod-02",
                "name": "LAURELDALE",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1tWF0Vd2QMiqn8TrbYcJ5F3N77mKbR0gO",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1tWF0Vd2QMiqn8TrbYcJ5F3N77mKbR0gO"
        },
        {
                "id": "drive-prod-03",
                "name": "LAURELDALE 1",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 1 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 1",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1a0j9jH8ukqthJz9XtWQ42GsRZH5KnhtI",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1a0j9jH8ukqthJz9XtWQ42GsRZH5KnhtI"
        },
        {
                "id": "drive-prod-04",
                "name": "LAURELDALE 2",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 2 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 2",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1_eQ-m9ku0ykXiAFMuEGH6EbVDXwiSwFY",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1_eQ-m9ku0ykXiAFMuEGH6EbVDXwiSwFY"
        },
        {
                "id": "drive-prod-05",
                "name": "LAURELDALE 3",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 3 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 3",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1mDX4eG7oNYv3n3fyhKLc5hBZUYjaW10K",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1mDX4eG7oNYv3n3fyhKLc5hBZUYjaW10K"
        },
        {
                "id": "drive-prod-06",
                "name": "LAURELDALE 4",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 4 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 4",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1GxAbd106jrD1bYxF8P8RcDttvqpVHgWx",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1GxAbd106jrD1bYxF8P8RcDttvqpVHgWx"
        },
        {
                "id": "drive-prod-07",
                "name": "LAURELDALE 5",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 5 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 5",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1KYNdqEx2Gml326yxj1-5D8FYKRpLn6Ws",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1KYNdqEx2Gml326yxj1-5D8FYKRpLn6Ws"
        },
        {
                "id": "drive-prod-08",
                "name": "LAURELDALE 6",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 6 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 6",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1o1yRuV4bB4fQXFuy8SNuxikzZiyGsXR0",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1o1yRuV4bB4fQXFuy8SNuxikzZiyGsXR0"
        },
        {
                "id": "drive-prod-09",
                "name": "LAURELDALE 7",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 7 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 7",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1b76xtiZYgmWZMJa-0gJjsYMXvEQJYgWL",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1b76xtiZYgmWZMJa-0gJjsYMXvEQJYgWL"
        },
        {
                "id": "drive-prod-10",
                "name": "LAURELDALE 8",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 8 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 8",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1A7no95SiqjRDj_ceYzjmNeJe8sey8hq1",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1A7no95SiqjRDj_ceYzjmNeJe8sey8hq1"
        },
        {
                "id": "drive-prod-11",
                "name": "LAURELDALE 9",
                "brand": "Laureldale",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "laureldale",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Laureldale LAURELDALE 9 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Laureldale",
                        "Model": "LAURELDALE 9",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1XwYnnQdTEjp1zkAyE-t4fpHjfgCUedTu",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1XwYnnQdTEjp1zkAyE-t4fpHjfgCUedTu"
        },
        {
                "id": "drive-prod-12",
                "name": "OSIRIS",
                "brand": "Osiris",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "osiris",
                        "women",
                        "eyeglasses",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Osiris OSIRIS optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Osiris",
                        "Model": "OSIRIS",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/10OjNyhMergXLbdq-UY61m3e7yJnr5kuk",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/10OjNyhMergXLbdq-UY61m3e7yJnr5kuk"
        },
        {
                "id": "drive-prod-13",
                "name": "Ray-Ban RAY BAN",
                "brand": "Ray-Ban",
                "category": "sunglasses",
                "categoryLabel": "Sunglasses",
                "tags": [
                        "sunglasses",
                        "women",
                        "ray-ban",
                        "polarized",
                        "unisex",
                        "uv400",
                        "men"
                ],
                "shortDescription": "Premium optical sunglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Ray-Ban RAY BAN optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Ray-Ban",
                        "Model": "RAY BAN",
                        "Type": "Sunglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1M3DG7b-iuThziA0VyIwsvksLQ6ocbpfV",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1M3DG7b-iuThziA0VyIwsvksLQ6ocbpfV"
        },
        {
                "id": "drive-prod-14",
                "name": "Ray-Ban RAY BAN 2",
                "brand": "Ray-Ban",
                "category": "sunglasses",
                "categoryLabel": "Sunglasses",
                "tags": [
                        "sunglasses",
                        "women",
                        "ray-ban",
                        "polarized",
                        "unisex",
                        "uv400",
                        "men"
                ],
                "shortDescription": "Premium optical sunglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Ray-Ban RAY BAN 2 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Ray-Ban",
                        "Model": "RAY BAN 2",
                        "Type": "Sunglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1Xanb6ZMnO1hfqLO5r550d9z2tFvV2ES1",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1Xanb6ZMnO1hfqLO5r550d9z2tFvV2ES1"
        },
        {
                "id": "drive-prod-15",
                "name": "Ray-Ban RAY BAN 3",
                "brand": "Ray-Ban",
                "category": "sunglasses",
                "categoryLabel": "Sunglasses",
                "tags": [
                        "sunglasses",
                        "women",
                        "ray-ban",
                        "polarized",
                        "unisex",
                        "uv400",
                        "men"
                ],
                "shortDescription": "Premium optical sunglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Ray-Ban RAY BAN 3 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Ray-Ban",
                        "Model": "RAY BAN 3",
                        "Type": "Sunglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/173KWUbBE6QReVMLcA8xLK8zFKWIgLhQ5",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/173KWUbBE6QReVMLcA8xLK8zFKWIgLhQ5"
        },
        {
                "id": "drive-prod-16",
                "name": "Ray-Ban RAY BAN 4",
                "brand": "Ray-Ban",
                "category": "sunglasses",
                "categoryLabel": "Sunglasses",
                "tags": [
                        "sunglasses",
                        "women",
                        "ray-ban",
                        "polarized",
                        "unisex",
                        "uv400",
                        "men"
                ],
                "shortDescription": "Premium optical sunglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Ray-Ban RAY BAN 4 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Ray-Ban",
                        "Model": "RAY BAN 4",
                        "Type": "Sunglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1hzv0HcFP4X3usiWct6SKYd868CK9scAh",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1hzv0HcFP4X3usiWct6SKYd868CK9scAh"
        },
        {
                "id": "drive-prod-17",
                "name": "SALVADOR",
                "brand": "Salvador",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "frames",
                        "unisex",
                        "salvador",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Salvador SALVADOR optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Salvador",
                        "Model": "SALVADOR",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1SyOJnZ7GoqV7KpMrh2tNms6qtFq7E2Z4",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1SyOJnZ7GoqV7KpMrh2tNms6qtFq7E2Z4"
        },
        {
                "id": "drive-prod-18",
                "name": "SALVADOR 1",
                "brand": "Salvador",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "frames",
                        "unisex",
                        "salvador",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Salvador SALVADOR 1 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Salvador",
                        "Model": "SALVADOR 1",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1VWjBWLLTPsrWYYNNveB9gPuM_tZCgWMW",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1VWjBWLLTPsrWYYNNveB9gPuM_tZCgWMW"
        },
        {
                "id": "drive-prod-19",
                "name": "SALVADOR 2",
                "brand": "Salvador",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "frames",
                        "unisex",
                        "salvador",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Salvador SALVADOR 2 optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Salvador",
                        "Model": "SALVADOR 2",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1pUJ9tLIw_DZ8bigZqjpEMzZ09j-vEJE7",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1pUJ9tLIw_DZ8bigZqjpEMzZ09j-vEJE7"
        },
        {
                "id": "drive-prod-20",
                "name": "SPARTAN",
                "brand": "Spartan",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "spartan",
                        "eyeglasses",
                        "frames",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Spartan SPARTAN optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Spartan",
                        "Model": "SPARTAN",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1ESBl7ojScg3J-GKxK5hW7eNbCVTjhe8r",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1ESBl7ojScg3J-GKxK5hW7eNbCVTjhe8r"
        },
        {
                "id": "drive-prod-21",
                "name": "VELOCITY",
                "brand": "Velocity",
                "category": "frames",
                "categoryLabel": "Eyeglasses",
                "tags": [
                        "spectacles",
                        "women",
                        "eyeglasses",
                        "frames",
                        "velocity",
                        "unisex",
                        "men"
                ],
                "shortDescription": "Premium optical eyeglasses crafted for comfort and clarity.",
                "fullDescription": "Authentic Velocity VELOCITY optical spectacle frame featuring high-grade alloy construction, precision ergonomics, and ophthalmic lens compatibility.",
                "features": [
                        "Lightweight Fit",
                        "Anti-Scratch Finish",
                        "Precision Ergonomics",
                        "Ophthalmic Ready"
                ],
                "specifications": {
                        "Brand": "Velocity",
                        "Model": "VELOCITY",
                        "Type": "Eyeglasses",
                        "Suitability": "Unisex / Men / Women"
                },
                "imageUrl": "https://lh3.googleusercontent.com/d/1_U2g3dzPERTTb4OZieUdItwhdfCX5I36",
                "hoverImageUrl": "https://lh3.googleusercontent.com/d/1_U2g3dzPERTTb4OZieUdItwhdfCX5I36"
        }
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
