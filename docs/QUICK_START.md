# Quick Start Guide

Get the ION Give A Fuq platform up and running in 15 minutes.

---

## Prerequisites

Before you begin, make sure you have:

- [ ] Node.js 20+ installed
- [ ] PostgreSQL database running
- [ ] Stripe account (free test mode)
- [ ] Code editor (VS Code recommended)

---

## Step 1: Clone and Install (2 minutes)

```bash
# Navigate to the Next.js app
cd /path/to/iongiveafuq/nextjs-app

# Install dependencies
npm install
```

---

## Step 2: Configure Environment (3 minutes)

```bash
# Copy environment example
cp .env.example .env.local

# Edit .env.local with your values
```

**Minimum required for local development:**

```env
# Database (create empty PostgreSQL database first)
DATABASE_URL="postgresql://user:password@localhost:5432/iongiveafuq"

# NextAuth (generate secret: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..." # Can skip for now
```

**Optional (can add later):**
- AWS S3 credentials
- MCP server URL
- Email SMTP settings

---

## Step 3: Setup Database (2 minutes)

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

---

## Step 4: Start Development Server (1 minute)

```bash
npm run dev
```

Visit: **http://localhost:3000**

You should see the Next.js welcome page!

---

## Step 5: Install UI Components (3 minutes)

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Answer the prompts:
# - Style: Default
# - Base color: Slate  
# - CSS variables: Yes

# Install essential components
npx shadcn@latest add button card input label form
```

---

## Step 6: Create First Admin User (2 minutes)

**Option A: Via Prisma Studio**

```bash
npx prisma studio
```

1. Navigate to `User` table
2. Add new record:
   - email: your@email.com
   - password: (run `bcrypt.hash('your-password', 10)` to generate)
   - role: ADMIN
   - name: Your Name

**Option B: Via API (after auth setup)**

Create registration endpoint or use direct database insert.

---

## Step 7: Verify Setup (2 minutes)

Check these work:

- [ ] Homepage loads
- [ ] Database connection working (check Prisma Studio)
- [ ] No console errors
- [ ] Hot reload working (edit a file and see changes)

---

## What's Next?

### Follow the Implementation Roadmap

Open `docs/implementation-roadmap.md` and start with **Phase 2: Authentication**

### Key Files to Edit First

1. **Authentication**:
   - Create `lib/auth.ts`
   - Create `middleware.ts`
   - Create `app/api/auth/[...nextauth]/route.ts`

2. **Layout**:
   - Edit `app/layout.tsx`
   - Create `components/layout/Navbar.tsx`

3. **Pages**:
   - Create `app/(auth)/login/page.tsx`
   - Create `app/store/page.tsx`

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build

# Database
npx prisma studio        # Visual database editor
npx prisma db push       # Push schema changes
npx prisma generate      # Regenerate client

# UI Components
npx shadcn@latest add [component-name]

# Linting
npm run lint            # Run ESLint
```

---

## Troubleshooting

### Database Connection Error

```bash
# Check PostgreSQL is running
psql -U postgres -l

# Create database if needed
createdb iongiveafuq

# Verify DATABASE_URL in .env.local
```

### Prisma Client Not Found

```bash
npx prisma generate
```

### Module Not Found Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## Development Workflow

### 1. Make Changes

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make your changes
# Files auto-reload in browser
```

### 2. Test Locally

```bash
# Run linter
npm run lint

# Build to check for errors
npm run build
```

### 3. Database Changes

```bash
# Edit prisma/schema.prisma
# Push changes
npx prisma db push

# Regenerate client
npx prisma generate
```

### 4. Commit

```bash
git add .
git commit -m "Your descriptive message"
git push origin feature/your-feature
```

---

## Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- Error Lens
- GitLens

---

## Quick Reference

### File Structure
```
nextjs-app/
├── app/           # Pages and routes
├── components/    # React components
├── lib/           # Utilities
├── prisma/        # Database schema
├── public/        # Static files
└── .env.local     # Environment variables
```

### Important URLs
- **Development**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555
- **Stripe Dashboard**: https://dashboard.stripe.com/test

### Documentation
- `docs/implementation-roadmap.md` - Step-by-step guide
- `docs/nextjs-setup-guide.md` - Complete setup
- `docs/theme-components.md` - UI components
- `docs/cms-backend.md` - Content management

---

## Getting Help

1. **Check Documentation**: Look in `/docs` directory
2. **Check Logs**: Look in terminal for errors
3. **Prisma Studio**: Visual database inspection
4. **Console**: Browser DevTools for frontend issues

---

## You're Ready! 🚀

Your development environment is set up. Now follow the implementation roadmap to build out the features:

1. Start with Phase 2 (Authentication)
2. Add UI components as needed
3. Build feature by feature
4. Test thoroughly
5. Deploy when ready

Good luck building ION Give A Fuq! 🚫🦊

---

*Time to give some fuqs about this code!*
