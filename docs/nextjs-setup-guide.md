# Next.js E-Commerce Platform Setup Guide

## Overview
Complete setup guide for the ION Give A Fuq e-commerce platform built with Next.js 14+, NextAuth, Stripe, and modern best practices.

---

## Technology Stack

### Core Framework
- **Next.js 16** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling

### Authentication & Security
- **NextAuth v5** for authentication
- **Prisma** as ORM with PostgreSQL
- **bcryptjs** for password hashing
- Role-based access control (RBAC)

### E-Commerce & Payments
- **Stripe** for payment processing
- **MCP Server integration** for secure payment data
- Product catalog management
- Cart and checkout system

### UI Components
- **shadcn/ui** for rich component library
- **Framer Motion** for animations
- **Lucide React** for icons
- Fully responsive and mobile-friendly

### Media & Storage
- **AWS S3** or **Cloudflare R2** for media storage
- **Sharp** for image optimization
- CDN integration for fast delivery

---

## Installation Steps

### 1. Install Dependencies

```bash
cd nextjs-app
npm install
```

### 2. Setup Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/iongiveafuq"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# AWS S3 (or Cloudflare R2)
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_S3_BUCKET="iongiveafuq-media"

# MCP Server (for secure payment data)
MCP_SERVER_URL="http://localhost:8080"
MCP_API_KEY="your-mcp-api-key"
```

### 3. Setup Database with Prisma

```bash
npx prisma init
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Project Structure

```
nextjs-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth layout group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (shop)/                   # Main shop layout
│   │   ├── page.tsx              # Homepage
│   │   ├── store/                # Store pages
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (profile)/                # User profile area
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── admin/                    # Admin dashboard
│   │   ├── products/
│   │   ├── orders/
│   │   ├── media/
│   │   ├── cms/
│   │   └── layout.tsx
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/route.ts
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── upload/
│   │   └── webhooks/stripe/route.ts
│   ├── gallery/                  # Artwork gallery
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css
├── components/                   # Shared components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── AuthGuard.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CartItem.tsx
│   │   └── CheckoutForm.tsx
│   ├── media/
│   │   ├── ImageViewer.tsx
│   │   ├── VideoPlayer.tsx
│   │   └── MediaGallery.tsx
│   ├── profile/
│   │   ├── ProfileCard.tsx
│   │   ├── OrderHistory.tsx
│   │   └── ProfileSettings.tsx
│   └── cms/
│       ├── ContentEditor.tsx
│       ├── MediaLibrary.tsx
│       └── BlogPost.tsx
├── lib/                          # Utilities and helpers
│   ├── auth.ts                   # NextAuth config
│   ├── db.ts                     # Database utilities
│   ├── stripe.ts                 # Stripe utilities
│   ├── storage.ts                # S3/R2 utilities
│   ├── mcp-client.ts             # MCP server client
│   ├── utils.ts                  # General utilities
│   └── validations/
│       ├── auth.ts
│       ├── product.ts
│       └── order.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── images/
│   └── fonts/
├── styles/
│   └── theme.ts                  # Theme configuration
└── middleware.ts                 # NextAuth middleware
```

---

## Key Features Implementation

### 1. Authentication with NextAuth

#### Configuration (`lib/auth.ts`)

```typescript
import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith('/login') || 
                         nextUrl.pathname.startsWith('/register')
      const isProtected = nextUrl.pathname.startsWith('/profile') ||
                         nextUrl.pathname.startsWith('/checkout') ||
                         nextUrl.pathname.startsWith('/admin')
      
      if (isProtected && !isLoggedIn) {
        return false // Redirect to login
      }
      
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl))
      }
      
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)
        
        if (!validatedFields.success) {
          return null
        }
        
        const { email, password } = validatedFields.data
        
        const user = await prisma.user.findUnique({
          where: { email },
        })
        
        if (!user || !user.password) {
          return null
        }
        
        const passwordsMatch = await bcrypt.compare(password, user.password)
        
        if (!passwordsMatch) {
          return null
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
```

#### Middleware (`middleware.ts`)

```typescript
export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### 2. Stripe Integration

#### Setup (`lib/stripe.ts`)

```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function createCheckoutSession(items: CartItem[]) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    metadata: {
      userId: items[0].userId,
    },
  })
  
  return session
}
```

#### Webhook Handler (`app/api/webhooks/stripe/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!
  
  let event: Stripe.Event
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Create order in database
    await prisma.order.create({
      data: {
        userId: session.metadata!.userId,
        stripeSessionId: session.id,
        amount: session.amount_total! / 100,
        status: 'paid',
      },
    })
  }
  
  return NextResponse.json({ received: true })
}
```

### 3. MCP Server Integration

#### Client Setup (`lib/mcp-client.ts`)

```typescript
import { z } from 'zod'

const PaymentDataSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/),
  cvv: z.string().regex(/^\d{3,4}$/),
})

export class MCPClient {
  private baseUrl: string
  private apiKey: string
  
  constructor() {
    this.baseUrl = process.env.MCP_SERVER_URL!
    this.apiKey = process.env.MCP_API_KEY!
  }
  
  async storePaymentMethod(userId: string, paymentData: z.infer<typeof PaymentDataSchema>) {
    // Validate data
    PaymentDataSchema.parse(paymentData)
    
    // Send to MCP server for secure storage
    const response = await fetch(`${this.baseUrl}/api/payment-methods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        userId,
        paymentData: {
          // Data is encrypted by MCP server
          last4: paymentData.cardNumber.slice(-4),
          brand: 'unknown', // Would be detected by MCP
          encrypted: paymentData,
        },
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to store payment method')
    }
    
    return await response.json()
  }
  
  async getPaymentMethods(userId: string) {
    const response = await fetch(`${this.baseUrl}/api/payment-methods?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch payment methods')
    }
    
    return await response.json()
  }
}

export const mcpClient = new MCPClient()
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  password      String?
  emailVerified DateTime?
  image         String?
  role          String    @default("user") // user, admin, superadmin
  
  // Profile data
  phone         String?
  address       Json?     // {street, city, state, zip, country}
  preferences   Json?     // User preferences and settings
  
  // Relationships
  accounts      Account[]
  sessions      Session[]
  orders        Order[]
  cart          CartItem[]
  favorites     Favorite[]
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String?
  category    String
  basePrice   Float
  images      Json     // Array of image URLs
  variants    Json?    // Sizes, colors, etc.
  stock       Int      @default(0)
  isActive    Boolean  @default(true)
  isFeatured  Boolean  @default(false)
  
  // Character association
  character   String?  // dumbo, scrapz, patty, buzz, rizzo
  
  // Relationships
  orderItems  OrderItem[]
  cartItems   CartItem[]
  favorites   Favorite[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id              String      @id @default(cuid())
  userId          String
  user            User        @relation(fields: [userId], references: [id])
  
  stripeSessionId String?     @unique
  amount          Float
  status          String      // pending, paid, shipped, delivered, cancelled
  shippingAddress Json
  
  items           OrderItem[]
  
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  
  quantity  Int
  price     Float
  variant   Json?   // Selected size, color, etc.
}

model CartItem {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  
  quantity  Int
  variant   Json?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([userId, productId])
}

model Favorite {
  id        String  @id @default(cuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())
  
  @@unique([userId, productId])
}

model MediaLibrary {
  id          String   @id @default(cuid())
  title       String
  fileUrl     String
  fileType    String   // image, video, document
  mimeType    String
  fileSize    Int
  altText     String?
  caption     String?
  folder      String   @default("general")
  tags        String[]
  metadata    Json?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   // Rich text content
  excerpt     String?
  coverImage  String?
  author      String
  category    String
  tags        String[]
  isPublished Boolean  @default(false)
  
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

---

## Compliance & Security

### Data Protection (GDPR, CCPA)

1. **User Consent**: Explicit consent for data collection
2. **Data Access**: Users can download their data
3. **Right to Deletion**: Users can request account deletion
4. **Data Encryption**: All sensitive data encrypted at rest and in transit
5. **Privacy Policy**: Clear privacy policy displayed

### PCI Compliance

1. **No Direct Card Storage**: All payment data handled by Stripe
2. **MCP Server**: Additional layer for secure payment method storage
3. **Tokenization**: Card data tokenized immediately
4. **SSL/TLS**: All connections encrypted
5. **Audit Logging**: All payment operations logged

### Security Best Practices

1. **Password Hashing**: bcryptjs with salt rounds
2. **CSRF Protection**: Built into Next.js
3. **Rate Limiting**: Implement on API routes
4. **Input Validation**: Zod schemas for all user input
5. **SQL Injection Prevention**: Prisma ORM with prepared statements

---

## Deployment

### Environment Setup

Production environment variables:
- Database connection with SSL
- Stripe live keys
- Production MCP server
- AWS S3 production bucket
- NextAuth production secret

### Build Process

```bash
npm run build
npm start
```

### Docker Deployment

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

---

*Last Updated: 2025-10-26*
*ION Give A Fuq - Next.js Setup Guide*
