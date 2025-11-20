# ION Give A Fuq - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will get you up and running with the complete comic, animation, and e-commerce system.

---

## Prerequisites

- Node.js 20+
- Git
- (Optional) Google Gemini API key for real content generation

---

## Step 1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/cbwinslow/iongiveafuq.git
cd iongiveafuq

# Install storyteller dependencies
cd storyteller
npm install

# Install Next.js app dependencies
cd ../nextjs-app
npm install
```

---

## Step 2: Generate Character References (Mock Mode)

```bash
cd ../storyteller

# Generate 50 references for one character (takes ~30 seconds)
npm run generate-character-refs dumbo

# Or generate all 250 references (takes ~3 minutes)
npm run generate-character-refs-all
```

**Output:** `generated/character-references/`
- 50 images per character
- manifest.json with metadata

---

## Step 3: Generate Comic Illustrations

```bash
# Still in storyteller directory

# Generate all 5 comics with illustrations
npm run generate-comic-illustrations
```

**Output:** `generated/comic-illustrations/`
- 5 comic directories
- Panel images for each comic
- HTML viewer for each comic
- comic.json metadata

---

## Step 4: View Comics in Browser

```bash
# Open any comic HTML viewer
# Example: open generated/comic-illustrations/dumbos-job-interview/index.html

# On Mac:
open generated/comic-illustrations/dumbos-job-interview/index.html

# On Linux:
xdg-open generated/comic-illustrations/dumbos-job-interview/index.html

# On Windows:
start generated/comic-illustrations/dumbos-job-interview/index.html
```

---

## Step 5: Launch E-Commerce Platform

```bash
cd ../nextjs-app

# Start development server
npm run dev
```

Visit:
- **Shop**: http://localhost:3000/shop
- **Gallery**: http://localhost:3000/gallery
- **Home**: http://localhost:3000

---

## 🎨 What You Can Do Now

### Browse Character References
1. Go to http://localhost:3000/gallery
2. Select a character
3. Filter by category
4. Click any image to view details

### Shop for T-Shirts
1. Go to http://localhost:3000/shop
2. Filter by character
3. Select size
4. Add to cart
5. View cart summary at bottom

### View Comics
1. Navigate to `storyteller/generated/comic-illustrations/`
2. Open any `index.html` file
3. See illustrated panels with dialogue

---

## 🔥 Enable Real Content Generation

### Get Google Gemini API Key

1. Visit https://aistudio.google.com/app/apikey
2. Create new API key
3. Copy the key

### Configure API Key

```bash
# Add to environment
export GOOGLE_API_KEY=your_api_key_here

# Or add to .env file in project root
cd /path/to/iongiveafuq
echo "GOOGLE_API_KEY=your_api_key_here" > .env
```

### Generate Real Content

```bash
cd storyteller

# Now generates real images with Gemini Imagen 3
npm run generate-character-refs-all

# Generates real comic illustrations
npm run generate-comic-illustrations

# Generates animations with Gemini Veo 3
npm run generate-comic-animations
```

---

## 📂 Understanding the Structure

```
iongiveafuq/
├── storyteller/                  # Content generation
│   ├── generate_character_consistency.js
│   ├── generate_comic_illustrations.js
│   └── generated/
│       ├── character-references/ # 250 images
│       └── comic-illustrations/  # 5 comics
├── nextjs-app/                   # E-commerce platform
│   └── app/
│       ├── shop/                 # T-shirt store
│       └── gallery/              # Reference browser
└── docs/                         # Documentation
    └── COMICS_AND_ANIMATION_GUIDE.md
```

---

## 🎯 Common Commands

### Content Generation

```bash
cd storyteller

# Character references
npm run generate-character-refs dumbo        # One character
npm run generate-character-refs-all          # All characters

# Comics
npm run generate-comic-illustrations         # All comics
npm run generate-comic-animations            # With animations

# View available comics
node generate_comic_illustrations.js
```

### E-Commerce

```bash
cd nextjs-app

# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Check code quality
```

---

## 💡 Tips

### Mock Mode
- All generators work without API key
- Creates placeholder files for testing
- Perfect for development and workflow testing
- Switch to real mode by adding API key

### Generated Content
- Character references: `storyteller/generated/character-references/`
- Comics: `storyteller/generated/comic-illustrations/`
- Each has metadata JSON files
- HTML viewers for easy browsing

### Next.js Pages
- Shop includes 8 products
- Gallery shows all 250 character references
- Both are fully responsive
- Cyberpunk neon aesthetic

---

## 🐛 Troubleshooting

### "Cannot find module"
```bash
# Reinstall dependencies
cd storyteller && npm install
cd ../nextjs-app && npm install
```

### "Port already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### "API key not working"
```bash
# Verify API key is set
echo $GOOGLE_API_KEY

# Test with Gemini demo
cd storyteller
npm run gemini-demo test
```

### Next.js build errors
```bash
cd nextjs-app
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📚 Learn More

- **Full Documentation**: `docs/COMICS_AND_ANIMATION_GUIDE.md`
- **System Overview**: `IMPLEMENTATION_SUMMARY.md`
- **Project Context**: `context.md`
- **Mascot Details**: `# Mascot Character Reference Guide.md`

---

## 🎉 What's Next?

1. **Generate Content**: Create all 250 character references
2. **View Comics**: Browse the 5 illustrated storylines
3. **Test Shop**: Try the e-commerce experience
4. **Customize**: Modify comics and products
5. **Deploy**: Take it to production!

---

## 🆘 Need Help?

- Check the troubleshooting section above
- Review documentation in `docs/`
- Run generators in mock mode first
- Test incrementally (one character, one comic)

---

**You're all set! Start generating content and building your ION Give A Fuq universe! 🎨🎬👕**

*Fresh outta fuqs since 2025*
