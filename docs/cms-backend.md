# CMS Backend System

## Overview
Headless CMS backend for managing blogs, stories, images, videos, and other content for the ION Give A Fuq platform.

---

## Architecture

### Tech Stack
- **Next.js API Routes** - Backend API
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **AWS S3 / Cloudflare R2** - Media storage
- **Tiptap** - Rich text editor
- **React Admin** - Admin dashboard (optional)

### Content Types

1. **Blog Posts** - Articles and updates
2. **Stories** - Character storylines and narratives
3. **Media Library** - Images and videos
4. **Products** - Merchandise items
5. **Pages** - Static pages (About, Terms, etc.)
6. **Comments** - User engagement (optional)

---

## Database Schema

### Content Tables

```prisma
// prisma/schema.prisma

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text  // Rich text HTML
  excerpt     String?
  coverImage  String?
  author      String
  authorId    String?
  category    String
  tags        String[]
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  // Status
  status      PostStatus @default(DRAFT)
  isPublished Boolean    @default(false)
  isFeatured  Boolean    @default(false)
  
  // Timestamps
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  // Relations
  comments    Comment[]
  
  @@index([slug])
  @@index([status])
  @@index([category])
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Story {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String?
  coverImage  String?
  
  // Character association
  characters  String[] // Array of character IDs
  
  // Story metadata
  episode     Int?
  season      Int?
  arc         String?  // Story arc name
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  // Status
  status      PostStatus @default(DRAFT)
  isPublished Boolean    @default(false)
  
  // Timestamps
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@index([slug])
  @@index([status])
}

model Page {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  template    String?  // Page template name
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  // Status
  isPublished Boolean  @default(false)
  
  // Timestamps
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([slug])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  author    String
  authorId  String?
  postId    String
  post      BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  // Moderation
  isApproved Boolean  @default(false)
  
  // Timestamps
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  @@index([postId])
}

// Media Library already defined in previous schema
```

---

## API Endpoints

### Blog Posts API

```typescript
// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const blogQuerySchema = z.object({
  category: z.string().optional(),
  tags: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = blogQuerySchema.parse({
    category: searchParams.get('category') || undefined,
    tags: searchParams.get('tags') || undefined,
    status: searchParams.get('status') || 'PUBLISHED',
    page: searchParams.get('page') || '1',
    limit: searchParams.get('limit') || '10',
  })
  
  const page = parseInt(query.page!)
  const limit = parseInt(query.limit!)
  const skip = (page - 1) * limit
  
  const where = {
    status: query.status,
    ...(query.category && { category: query.category }),
    ...(query.tags && { tags: { has: query.tags } }),
  }
  
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        author: true,
        category: true,
        tags: true,
        publishedAt: true,
      },
    }),
    prisma.blogPost.count({ where }),
  ])
  
  return NextResponse.json({
    posts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}

// Admin only - Create new post
export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getServerSession()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const data = await request.json()
  
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      authorId: session.user.id,
    },
  })
  
  return NextResponse.json(post)
}
```

```typescript
// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      comments: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
  
  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  
  return NextResponse.json(post)
}

// Admin only - Update post
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const data = await request.json()
  
  const post = await prisma.blogPost.update({
    where: { slug: params.slug },
    data,
  })
  
  return NextResponse.json(post)
}

// Admin only - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  await prisma.blogPost.delete({
    where: { slug: params.slug },
  })
  
  return NextResponse.json({ success: true })
}
```

### Stories API

```typescript
// app/api/stories/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const character = searchParams.get('character')
  const arc = searchParams.get('arc')
  
  const stories = await prisma.story.findMany({
    where: {
      status: 'PUBLISHED',
      ...(character && { characters: { has: character } }),
      ...(arc && { arc }),
    },
    orderBy: [
      { season: 'asc' },
      { episode: 'asc' },
    ],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      characters: true,
      episode: true,
      season: true,
      arc: true,
      publishedAt: true,
    },
  })
  
  return NextResponse.json(stories)
}
```

### Media Library API

```typescript
// app/api/admin/media/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { uploadToStorage, processImage } from '@/lib/storage'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get('folder') || 'general'
  const type = searchParams.get('type')
  
  const media = await prisma.mediaLibrary.findMany({
    where: {
      ...(folder && { folder }),
      ...(type && { fileType: type }),
    },
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json(media)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const formData = await request.formData()
  const file = formData.get('file') as File
  const metadata = JSON.parse(formData.get('metadata') as string || '{}')
  
  // Process and upload
  const processed = await processImage(file)
  const { url, thumbnailUrl } = await uploadToStorage(processed)
  
  // Save to database
  const media = await prisma.mediaLibrary.create({
    data: {
      title: metadata.title || file.name,
      fileUrl: url,
      fileType: file.type.startsWith('image') ? 'image' : 'video',
      mimeType: file.type,
      fileSize: file.size,
      folder: metadata.folder || 'general',
      tags: metadata.tags || [],
      metadata: {
        thumbnailUrl,
        ...metadata,
      },
    },
  })
  
  return NextResponse.json(media)
}
```

---

## Admin Dashboard

### Layout

```tsx
// app/admin/layout.tsx
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { AdminSidebar } from '@/components/admin/Sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  if (!session?.user?.isAdmin) {
    redirect('/login')
  }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-charcoal-900">
        {children}
      </main>
    </div>
  )
}
```

### Blog Management

```tsx
// app/admin/blog/page.tsx
import { prisma } from '@/lib/db'
import { BlogTable } from '@/components/admin/BlogTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 50,
  })
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button variant="neon">Create New Post</Button>
        </Link>
      </div>
      
      <BlogTable posts={posts} />
    </div>
  )
}
```

### Rich Text Editor

```tsx
// components/admin/RichEditor.tsx
"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Image as ImageIcon,
  Link as LinkIcon 
} from 'lucide-react'

interface RichEditorProps {
  content: string
  onChange: (content: string) => void
}

export function RichEditor({ content, onChange }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })
  
  if (!editor) {
    return null
  }
  
  return (
    <div className="border border-charcoal-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-charcoal-800 border-b border-charcoal-700">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-charcoal-700' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-charcoal-700' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-charcoal-700 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-charcoal-700' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-charcoal-700' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-charcoal-700' : ''}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-charcoal-700 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none p-4 min-h-[400px]"
      />
    </div>
  )
}
```

### Blog Post Editor

```tsx
// app/admin/blog/[id]/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RichEditor } from '@/components/admin/RichEditor'
import { Select } from '@/components/ui/select'

export default function BlogEditorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'general',
    tags: [],
    status: 'DRAFT',
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (params.id !== 'new') {
      // Load existing post
      fetch(`/api/blog/${params.id}`)
        .then(res => res.json())
        .then(setPost)
    }
  }, [params.id])
  
  const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
    setIsLoading(true)
    
    const data = {
      ...post,
      status,
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    }
    
    const url = params.id === 'new' 
      ? '/api/blog' 
      : `/api/blog/${params.id}`
    
    const method = params.id === 'new' ? 'POST' : 'PUT'
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    setIsLoading(false)
    router.push('/admin/blog')
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {params.id === 'new' ? 'Create New Post' : 'Edit Post'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
            />
          </div>
          
          <div>
            <Label>Content</Label>
            <RichEditor
              content={post.content}
              onChange={(content) => setPost({ ...post, content })}
            />
          </div>
          
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => handleSave('DRAFT')}
              disabled={isLoading}
            >
              Save Draft
            </Button>
            <Button
              variant="neon"
              onClick={() => handleSave('PUBLISHED')}
              disabled={isLoading}
            >
              Publish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## Media Library Dashboard

```tsx
// app/admin/media/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import Image from 'next/image'

export default function MediaLibraryPage() {
  const [media, setMedia] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  
  useEffect(() => {
    fetch('/api/admin/media')
      .then(res => res.json())
      .then(setMedia)
  }, [])
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('metadata', JSON.stringify({
      title: file.name,
      folder: 'general',
    }))
    
    await fetch('/api/admin/media', {
      method: 'POST',
      body: formData,
    })
    
    // Reload media
    const updated = await fetch('/api/admin/media').then(r => r.json())
    setMedia(updated)
    setIsUploading(false)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold">Media Library</h1>
        <label>
          <Button variant="neon" disabled={isUploading} asChild>
            <span>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Uploading...' : 'Upload'}
            </span>
          </Button>
          <input
            type="file"
            className="hidden"
            accept="image/*,video/*"
            onChange={handleUpload}
          />
        </label>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item: any) => (
          <Card key={item.id} className="p-2">
            <div className="relative aspect-square">
              {item.fileType === 'image' ? (
                <Image
                  src={item.fileUrl}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              ) : (
                <video src={item.fileUrl} className="w-full h-full object-cover rounded" />
              )}
            </div>
            <p className="text-xs mt-2 truncate">{item.title}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## Frontend Blog Display

```tsx
// app/blog/page.tsx
import { prisma } from '@/lib/db'
import { BlogCard } from '@/components/blog/BlogCard'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 12,
  })
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

```tsx
// app/blog/[slug]/page.tsx
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  })
  
  if (!post) {
    notFound()
  }
  
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {post.coverImage && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <h1 className="text-5xl font-heading font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-4 text-gray-400 mb-8">
        <span>{post.author}</span>
        <span>•</span>
        <time>{new Date(post.publishedAt!).toLocaleDateString()}</time>
      </div>
      
      <div 
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
```

---

## SEO Optimization

```tsx
// app/blog/[slug]/page.tsx - Add metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  })
  
  if (!post) {
    return {}
  }
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
}
```

---

## Security & Permissions

### Role-Based Access Control

```typescript
// lib/permissions.ts
export const permissions = {
  blog: {
    create: ['admin', 'editor'],
    read: ['public'],
    update: ['admin', 'editor'],
    delete: ['admin'],
  },
  media: {
    upload: ['admin', 'editor'],
    view: ['public'],
    delete: ['admin'],
  },
  products: {
    create: ['admin'],
    read: ['public'],
    update: ['admin'],
    delete: ['admin'],
  },
}

export function canPerform(
  userRole: string,
  resource: string,
  action: string
): boolean {
  return permissions[resource]?.[action]?.includes(userRole) || false
}
```

---

*Last Updated: 2025-10-26*
*ION Give A Fuq - CMS Backend System*
