# Artwork Storage and Display Strategy

## Overview
This document outlines the comprehensive strategy for storing, organizing, and displaying artwork for the ION Give A Fuq brand, optimized for e-commerce, CMS integration, and multi-platform delivery.

---

## Storage Architecture

### Directory Structure
```
/artwork/
├── ai-generated/           # AI-generated character art
│   ├── dumbo/
│   │   ├── raw/            # Unedited AI outputs
│   │   ├── final/          # Production-ready images
│   │   ├── variations/     # Alternative versions
│   │   └── metadata.json   # Image metadata
│   ├── scrapz/
│   ├── patty/
│   ├── buzz/
│   └── rizzo/
├── merchandise/            # Product mockups and designs
│   ├── tshirts/
│   ├── posters/
│   ├── stickers/
│   └── digital-goods/
├── videos/                 # Character animations
│   ├── intros/
│   ├── loops/
│   └── shorts/
├── backgrounds/            # Environment art
├── logos/                  # Brand assets
└── user-uploads/           # Customer content
    └── [user-id]/
        ├── avatars/
        └── reviews/
```

### Cloud Storage Integration

#### Primary: AWS S3 (Recommended)
```javascript
// Configuration
const storageConfig = {
  provider: 'aws-s3',
  bucket: 'iongiveafuq-media',
  region: 'us-east-1',
  cdn: 'cloudfront.net',
  publicAccess: {
    artwork: true,      // Public CDN delivery
    merchandise: true,
    userUploads: false  // Authenticated access only
  }
}
```

**Benefits:**
- Scalable storage
- CDN integration via CloudFront
- Image optimization with Lambda@Edge
- Cost-effective for high traffic

#### Alternative: Cloudflare R2
```javascript
const storageConfig = {
  provider: 'cloudflare-r2',
  bucket: 'iongiveafuq',
  publicDomain: 'media.iongiveafuq.com',
  zeroEgressFees: true  // No egress charges
}
```

**Benefits:**
- Zero egress fees
- Cloudflare CDN included
- Simple integration
- Better for high-bandwidth media

### Database Schema

```sql
-- Artwork metadata table
CREATE TABLE artwork (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(500) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  file_type VARCHAR(50),
  file_size INTEGER,
  dimensions JSONB, -- {width: 1920, height: 1080}
  tags TEXT[],
  ai_prompt TEXT,
  ai_model VARCHAR(100),
  generation_date TIMESTAMP,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB -- Flexible additional data
);

-- Merchandise products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100),
  base_price DECIMAL(10,2) NOT NULL,
  artwork_id UUID REFERENCES artwork(id),
  images JSONB, -- Array of image URLs
  variants JSONB, -- Sizes, colors, etc.
  stock_status VARCHAR(50) DEFAULT 'in_stock',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Media library for CMS
CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  mime_type VARCHAR(100),
  file_size INTEGER,
  alt_text VARCHAR(255),
  caption TEXT,
  uploaded_by UUID REFERENCES users(id),
  folder VARCHAR(255) DEFAULT 'general',
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User uploaded content
CREATE TABLE user_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  upload_purpose VARCHAR(100), -- 'avatar', 'review', etc.
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_artwork_character ON artwork(character_id);
CREATE INDEX idx_artwork_published ON artwork(is_published);
CREATE INDEX idx_artwork_featured ON artwork(is_featured);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_media_library_type ON media_library(file_type);
CREATE INDEX idx_media_library_folder ON media_library(folder);
```

---

## Image Processing Pipeline

### Automatic Optimization

```javascript
// Image processing on upload
const imageProcessor = {
  formats: {
    original: { quality: 100, format: 'png' },
    display: { quality: 85, format: 'webp', width: 1920 },
    thumbnail: { quality: 80, format: 'webp', width: 400 },
    mobile: { quality: 75, format: 'webp', width: 800 }
  },
  
  process: async (file) => {
    const processed = {}
    
    // Generate multiple formats
    for (const [key, config] of Object.entries(formats)) {
      processed[key] = await sharp(file)
        .resize(config.width, null, { fit: 'inside' })
        .toFormat(config.format, { quality: config.quality })
        .toBuffer()
    }
    
    // Upload to storage
    const urls = await uploadToStorage(processed)
    
    // Save metadata to database
    await saveArtworkMetadata({
      ...urls,
      originalName: file.originalname,
      processedFormats: Object.keys(formats)
    })
    
    return urls
  }
}
```

### CDN Configuration

```javascript
// Cloudflare/CloudFront settings
const cdnConfig = {
  caching: {
    artwork: {
      ttl: 86400 * 30, // 30 days
      browserCache: 86400 * 7, // 7 days
    },
    merchandise: {
      ttl: 86400 * 7,
      browserCache: 86400,
    },
    userContent: {
      ttl: 86400,
      browserCache: 3600,
    }
  },
  
  imageOptimization: {
    enabled: true,
    formats: ['webp', 'avif'], // Modern formats
    quality: 85,
    responsive: true
  }
}
```

---

## Display Components

### Artwork Viewer Component

```typescript
// components/artwork/ArtworkViewer.tsx
import Image from 'next/image'
import { useState } from 'react'

interface ArtworkViewerProps {
  artwork: {
    id: string
    title: string
    imageUrl: string
    thumbnailUrl: string
    character: string
    tags: string[]
  }
  showDetails?: boolean
  enableZoom?: boolean
}

export default function ArtworkViewer({ 
  artwork, 
  showDetails = true,
  enableZoom = false 
}: ArtworkViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  
  return (
    <div className="artwork-viewer">
      <div 
        className="relative aspect-square overflow-hidden rounded-lg"
        onClick={() => enableZoom && setIsZoomed(!isZoomed)}
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          className={`object-cover transition-transform ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      
      {showDetails && (
        <div className="mt-4">
          <h3 className="text-neon-green font-bold">{artwork.title}</h3>
          <p className="text-gray-400">{artwork.character}</p>
          <div className="flex gap-2 mt-2">
            {artwork.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs bg-gray-800 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### Gallery Grid Component

```typescript
// components/gallery/GalleryGrid.tsx
import { ArtworkViewer } from '@/components/artwork/ArtworkViewer'
import { motion } from 'framer-motion'

export default function GalleryGrid({ artworks, columns = 3 }) {
  return (
    <div 
      className={`grid gap-6 
        grid-cols-1 
        md:grid-cols-${Math.min(columns, 2)} 
        lg:grid-cols-${columns}`
      }
    >
      {artworks.map((artwork, index) => (
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ArtworkViewer artwork={artwork} />
        </motion.div>
      ))}
    </div>
  )
}
```

### Video Player Component

```typescript
// components/media/VideoPlayer.tsx
import { useRef, useState } from 'react'

export default function VideoPlayer({ 
  src, 
  poster, 
  title,
  autoplay = false,
  loop = true 
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }
  
  return (
    <div className="relative video-player rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        autoPlay={autoplay}
        muted={autoplay}
        className="w-full h-auto"
        onClick={togglePlay}
      />
      
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center
                     bg-black bg-opacity-50 hover:bg-opacity-30 transition"
        >
          <div className="w-20 h-20 bg-neon-pink rounded-full 
                          flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  )
}
```

---

## API Endpoints

### Artwork API

```typescript
// app/api/artwork/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getArtwork, searchArtwork } from '@/lib/db/artwork'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const character = searchParams.get('character')
  const tags = searchParams.get('tags')?.split(',')
  const featured = searchParams.get('featured') === 'true'
  
  const artwork = await searchArtwork({
    character,
    tags,
    featured,
    published: true
  })
  
  return NextResponse.json(artwork)
}

// app/api/artwork/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const artwork = await getArtwork(params.id)
  
  if (!artwork) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  
  return NextResponse.json(artwork)
}
```

### Upload API (Admin)

```typescript
// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { uploadToStorage } from '@/lib/storage'
import { processImage } from '@/lib/imageProcessor'

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const formData = await request.formData()
  const file = formData.get('file') as File
  const metadata = JSON.parse(formData.get('metadata') as string)
  
  // Process and optimize image
  const processed = await processImage(file)
  
  // Upload to cloud storage
  const urls = await uploadToStorage(processed, metadata)
  
  // Save to database
  const artwork = await createArtwork({
    ...metadata,
    ...urls
  })
  
  return NextResponse.json(artwork)
}
```

---

## Performance Optimization

### Image Loading Strategy

```typescript
// Use Next.js Image component with priority loading
const imageLoadingStrategy = {
  aboveFold: { priority: true, loading: 'eager' },
  belowFold: { priority: false, loading: 'lazy' },
  
  // Use blur placeholder for better UX
  placeholder: 'blur',
  blurDataURL: generateBlurDataURL(artwork.thumbnailUrl)
}
```

### Caching Strategy

```javascript
// Cache artwork data at multiple levels
const cachingLayers = {
  cdn: '30 days',           // CloudFront/Cloudflare
  nextCache: '7 days',      // Next.js cache
  browser: '1 day',         // Browser cache
  redis: '1 hour',          // API response cache
  database: 'source of truth'
}
```

---

## Admin CMS Interface

### Media Library Dashboard

Key features:
- **Upload interface** with drag-and-drop
- **Bulk operations** (tag, move, delete)
- **Preview panel** with metadata editing
- **Search and filter** by character, tags, date
- **Organization** into folders/collections
- **Usage tracking** (where image is used)

### Implementation using shadcn/ui components

```typescript
// app/admin/media/page.tsx
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MediaGrid } from '@/components/admin/MediaGrid'

export default function MediaLibraryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Media Library</h1>
        <Button>Upload New</Button>
      </div>
      
      <Card className="p-4 mb-6">
        <Input 
          placeholder="Search artwork..." 
          className="w-full"
        />
      </Card>
      
      <MediaGrid />
    </div>
  )
}
```

---

## Security Considerations

### File Upload Validation

```typescript
const uploadValidation = {
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'video/mp4'],
  maxFileSize: 50 * 1024 * 1024, // 50MB
  
  validate: (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type')
    }
    if (file.size > maxFileSize) {
      throw new Error('File too large')
    }
    return true
  }
}
```

### Access Control

```typescript
// Implement role-based access
const accessControl = {
  public: ['view published artwork'],
  user: ['upload avatar', 'save favorites'],
  admin: ['upload artwork', 'manage media library', 'publish'],
  superadmin: ['delete', 'manage users']
}
```

---

## Migration Plan

### Step 1: Setup Storage
1. Create S3/R2 bucket
2. Configure CDN
3. Set up access policies

### Step 2: Database Setup
1. Run migration scripts
2. Create indexes
3. Seed initial data

### Step 3: Upload Existing Assets
1. Migrate existing artwork
2. Process and optimize
3. Update references

### Step 4: Deploy Components
1. Install display components
2. Configure API routes
3. Test functionality

---

*Last Updated: 2025-10-26*
*ION Give A Fuq - Artwork Storage Strategy*
