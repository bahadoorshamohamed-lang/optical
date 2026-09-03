import { fetchFromAPI, saveToAPI } from '../services/api';

export const DEFAULT_PRODUCTS = [
  {
    "id": "drive-prod-01",
    "name": "HARZEL",
    "brand": "Harzel",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "harzel",
      "eyeglasses",
      "women",
      "men",
      "spectacles",
      "frames",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1hVRZeec_1ukj3nUTz5mFtWU69alGSYbr"
  },
  {
    "id": "drive-prod-02",
    "name": "LAURELDALE",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1tWF0Vd2QMiqn8TrbYcJ5F3N77mKbR0gO"
  },
  {
    "id": "drive-prod-03",
    "name": "LAURELDALE 1",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1a0j9jH8ukqthJz9XtWQ42GsRZH5KnhtI"
  },
  {
    "id": "drive-prod-04",
    "name": "LAURELDALE 2",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1_eQ-m9ku0ykXiAFMuEGH6EbVDXwiSwFY"
  },
  {
    "id": "drive-prod-05",
    "name": "LAURELDALE 3",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1mDX4eG7oNYv3n3fyhKLc5hBZUYjaW10K"
  },
  {
    "id": "drive-prod-06",
    "name": "LAURELDALE 4",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1GxAbd106jrD1bYxF8P8RcDttvqpVHgWx"
  },
  {
    "id": "drive-prod-07",
    "name": "LAURELDALE 5",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1KYNdqEx2Gml326yxj1-5D8FYKRpLn6Ws"
  },
  {
    "id": "drive-prod-08",
    "name": "LAURELDALE 6",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1o1yRuV4bB4fQXFuy8SNuxikzZiyGsXR0"
  },
  {
    "id": "drive-prod-09",
    "name": "LAURELDALE 7",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1b76xtiZYgmWZMJa-0gJjsYMXvEQJYgWL"
  },
  {
    "id": "drive-prod-10",
    "name": "LAURELDALE 8",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1A7no95SiqjRDj_ceYzjmNeJe8sey8hq1"
  },
  {
    "id": "drive-prod-11",
    "name": "LAURELDALE 9",
    "brand": "Laureldale",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "laureldale",
      "frames",
      "spectacles",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1XwYnnQdTEjp1zkAyE-t4fpHjfgCUedTu"
  },
  {
    "id": "drive-prod-12",
    "name": "OSIRIS",
    "brand": "Osiris",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "osiris",
      "women",
      "men",
      "spectacles",
      "frames",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/10OjNyhMergXLbdq-UY61m3e7yJnr5kuk"
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
      "men",
      "ray-ban",
      "polarized",
      "unisex",
      "uv400"
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
    "imageUrl": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1M3DG7b-iuThziA0VyIwsvksLQ6ocbpfV"
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
      "men",
      "ray-ban",
      "polarized",
      "unisex",
      "uv400"
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
    "imageUrl": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1Xanb6ZMnO1hfqLO5r550d9z2tFvV2ES1"
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
      "men",
      "ray-ban",
      "polarized",
      "unisex",
      "uv400"
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
    "imageUrl": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/173KWUbBE6QReVMLcA8xLK8zFKWIgLhQ5"
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
      "men",
      "ray-ban",
      "polarized",
      "unisex",
      "uv400"
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
    "imageUrl": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1hzv0HcFP4X3usiWct6SKYd868CK9scAh"
  },
  {
    "id": "drive-prod-17",
    "name": "SALVADOR",
    "brand": "Salvador",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "spectacles",
      "frames",
      "salvador",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1SyOJnZ7GoqV7KpMrh2tNms6qtFq7E2Z4"
  },
  {
    "id": "drive-prod-18",
    "name": "SALVADOR 1",
    "brand": "Salvador",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "spectacles",
      "frames",
      "salvador",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1VWjBWLLTPsrWYYNNveB9gPuM_tZCgWMW"
  },
  {
    "id": "drive-prod-19",
    "name": "SALVADOR 2",
    "brand": "Salvador",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "women",
      "men",
      "spectacles",
      "frames",
      "salvador",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1pUJ9tLIw_DZ8bigZqjpEMzZ09j-vEJE7"
  },
  {
    "id": "drive-prod-20",
    "name": "SPARTAN",
    "brand": "Spartan",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "spartan",
      "women",
      "men",
      "spectacles",
      "frames",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1ESBl7ojScg3J-GKxK5hW7eNbCVTjhe8r"
  },
  {
    "id": "drive-prod-21",
    "name": "VELOCITY",
    "brand": "Velocity",
    "category": "frames",
    "categoryLabel": "Eyeglasses",
    "tags": [
      "eyeglasses",
      "velocity",
      "women",
      "men",
      "spectacles",
      "frames",
      "unisex"
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
    "imageUrl": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    "hoverImageUrl": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    "driveUrl": "https://lh3.googleusercontent.com/d/1_U2g3dzPERTTb4OZieUdItwhdfCX5I36"
  }
];

export const PRODUCTS_DATA = DEFAULT_PRODUCTS;

export const BUSINESS_INFO = {
  name: "ABDUL WAHAB B.Sc. OPTOM.",
  profession: "Optometrist",
  tagline: "Clear Vision. Better Life.",
  subtitle: "Quality eye-care solutions, lenses and stylish frames for your everyday vision.",
  phone: "8110050501",
  email: "abdulwahaboptometrist@gmail.com",
  addressLine1: "No. 814 MIG, Neithal Street,",
  addressLine2: "New Housing Unit,",
  cityStatePincode: "Thanjavur - 613005",
  mapQuery: "No.+814+MIG,+Neithal+Street,+New+Housing+Unit,+Thanjavur+-+613005"
};

const PRODUCTS_KEY = 'vision_care_products_v10';

export const getStoredProducts = () => {
  try {
    const saved = localStorage.getItem(PRODUCTS_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
  
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_PRODUCTS;
};

export const syncProductsWithAPI = async () => {
  const remoteData = await fetchFromAPI('products');
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    const cleanList = remoteData.map(item => {
      if (!item || typeof item !== 'object') return item;
      const { _id, __v, ...rest } = item;
      return rest;
    });
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(cleanList));
      window.dispatchEvent(new CustomEvent('products-updated', { detail: cleanList }));
    } catch (e) {
      console.error('Error writing products to localStorage:', e);
    }
    return cleanList;
  }
  
  // If remote database is empty or offline, fallback to local stored products
  const stored = getStoredProducts();
  if (stored && stored.length > 0) {
    if (remoteData && Array.isArray(remoteData) && remoteData.length === 0) {
      saveToAPI('products', stored);
    }
    return stored;
  }
  
  return DEFAULT_PRODUCTS;
};

export const saveProducts = async (products) => {
  const rawList = Array.isArray(products) ? products : [];
  const cleanList = rawList.map(item => {
    if (!item || typeof item !== 'object') return item;
    const { _id, __v, ...rest } = item;
    return rest;
  });

  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(cleanList));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }

  window.dispatchEvent(new CustomEvent('products-updated', { detail: cleanList }));
  
  const cloudResult = await saveToAPI('products', cleanList);
  return cloudResult ? cleanList : cleanList;
};

export const resetProductsToDefault = async () => {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
  } catch (e) {
    console.error(e);
  }
  window.dispatchEvent(new CustomEvent('products-updated', { detail: DEFAULT_PRODUCTS }));
  await saveToAPI('products', DEFAULT_PRODUCTS);
  return DEFAULT_PRODUCTS;
};
