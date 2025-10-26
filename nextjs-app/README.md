# ION Give A Fuq - Next.js E-Commerce Platform

Modern, mobile-friendly e-commerce platform for the ION Give A Fuq brand featuring dark humor merchandise, character artwork, and cyberpunk aesthetics.

## Features

- 🔐 **Authentication** - NextAuth v5 with secure login/register
- 🛒 **E-Commerce** - Full shopping cart and checkout with Stripe
- 💳 **Secure Payments** - PCI-compliant payment processing with MCP server
- 🎨 **Media Library** - Artwork storage and display with AWS S3/Cloudflare R2
- 📝 **CMS Backend** - Blog posts, stories, and content management
- 👤 **User Profiles** - Profile management and order history
- 📱 **Mobile-First** - Fully responsive design with Tailwind CSS
- ⚡ **Modern Stack** - Next.js 16, React 19, TypeScript, Prisma

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5
- **Payments**: Stripe
- **Media Storage**: AWS S3 or Cloudflare R2
- **Animations**: Framer Motion

## Prerequisites

- Node.js 20+
- PostgreSQL database
- Stripe account
- AWS S3 or Cloudflare R2 account
- MCP server (for secure payment data)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Database connection string
- NextAuth secret (generate with `openssl rand -base64 32`)
- Stripe API keys
- AWS/R2 credentials
- MCP server URL and API key

### 3. Setup Database

Initialize Prisma and create the database schema:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with initial data
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
nextjs-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (shop)/            # Store pages
│   ├── (profile)/         # User profile pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── gallery/           # Artwork gallery
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── shop/             # E-commerce components
│   ├── media/            # Media viewers
│   └── admin/            # Admin components
├── lib/                   # Utilities and helpers
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database utilities
│   ├── stripe.ts         # Stripe utilities
│   └── storage.ts        # S3/R2 utilities
├── prisma/               # Database schema
│   └── schema.prisma
└── public/               # Static assets
```

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[AI Character Prompts](../docs/ai-character-prompts.md)** - Text-to-image/video prompts for character artwork
- **[Artwork Storage Strategy](../docs/artwork-storage-strategy.md)** - Media storage and display architecture
- **[Next.js Setup Guide](../docs/nextjs-setup-guide.md)** - Complete setup and configuration guide
- **[Theme & Components](../docs/theme-components.md)** - Design system and UI components
- **[CMS Backend](../docs/cms-backend.md)** - Content management system documentation
- **[Implementation Roadmap](../docs/implementation-roadmap.md)** - Step-by-step implementation guide

## Key Features Setup

### Authentication

User authentication is handled by NextAuth v5. Protected routes automatically redirect to login:

```typescript
// middleware.ts enforces authentication
export { auth as middleware } from "@/lib/auth"
```

### E-Commerce

Complete shopping experience with:
- Product catalog with variants
- Shopping cart with persistence
- Stripe checkout integration
- Order tracking and history

### Admin Dashboard

Secure admin interface for:
- Product management
- Order processing
- Media library
- Blog/CMS editing
- User management

### Security

- **PCI Compliance**: Payment data handled by Stripe and MCP server
- **Data Protection**: GDPR/CCPA compliant
- **Input Validation**: Zod schemas for all user input
- **Rate Limiting**: API route protection
- **HTTPS Only**: Secure connections required

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio

# Linting
npm run lint         # Run ESLint
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | Yes |
| `AWS_ACCESS_KEY_ID` | AWS access key | Yes* |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Yes* |
| `MCP_SERVER_URL` | MCP server endpoint | Yes |

\* Required for AWS S3, or use Cloudflare R2 credentials

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
docker build -t iongiveafuq-nextjs .
docker run -p 3000:3000 iongiveafuq-nextjs
```

### Self-Hosted

```bash
npm run build
npm start
```

Use a reverse proxy (Nginx, Caddy) with SSL certificate.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Support

For issues, questions, or feature requests, please open an issue on GitHub.

## License

See LICENSE file for details.

---

**ION Give A Fuq** - Fresh outta fuqs since 2025 🚫🦊
