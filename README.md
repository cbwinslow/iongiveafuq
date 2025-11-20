# iongiveafuq

**iongiveafuq.com** is a dark-humor e-commerce experiment that "sells" three novelty items:
* **Fuqs** – represented by Dumbo the ugly dog
* **Shits** – represented by Scrapz the ragged cat
* **Damns** – represented by Buzz the drunken donkey

The site embraces a neon cyberpunk aesthetic and uses React, Tailwind CSS and Framer Motion for animations. The backend is a small Express API. Docker Compose ties everything together.

## 🆕 New Features - Complete Comic & Animation System

✨ **Now includes full comic development, character consistency, and e-commerce platform!**

- 🎨 **Character Reference Generator**: 50 consistent images per mascot (250 total)
- 📚 **Comic Illustration System**: 5 complete storylines with automated illustration
- 🎬 **Animation Production**: Convert comics to animated cartoons with Gemini Veo 3
- 🛒 **E-Commerce Shop**: Full t-shirt store with 8 products and shopping cart
- 🖼️ **Character Gallery**: Browse all 250 reference images with filtering

**Quick Start**: See [QUICK_START.md](QUICK_START.md) to get running in 5 minutes!

## Repository Layout

```
backend/      Express API service
frontend/     React + Vite web app
storyteller/  AI-powered content generation with Google Gemini
# Mascot Character Reference Guide.md  Lore and art prompts
context.md    In-depth context with code listing
```

See `docs/landing-page.md` for a curated entry point and `docs/site-index.md` to navigate all documentation.

## Running Locally

### Frontend dev server
```bash
cd frontend
npm install
npm run dev    # available on http://localhost:5173
```

### Backend API
```bash
cd backend
npm install
npm start      # listens on http://localhost:4000
```

### Full stack with Docker
```bash
docker compose up -d --build
# web:  http://localhost (port 80)
# api:  http://localhost:4000
```

### One-click deploy
Use the helper script to run tests and start all services in Docker:
```bash
./scripts/one_click_deploy.sh
```
Make sure to create a `.env` file first:
```bash
cp .env.example .env
# edit .env and provide your tokens:
# - Cloudflare tokens for deployment
# - GOOGLE_API_KEY for Gemini features (optional)
# - PORT and VITE_API_URL if needed
```

### Storytelling Agent with Google Gemini
```bash
cd storyteller
npm install

# Test Gemini integration
npm run gemini-demo test

# Generate character references with Imagen 3
npm run gemini-demo character-refs

# Create animated content with Veo 3
npm run gemini-demo character-package dumbo

# Start web interface
npm run web    # available on http://localhost:3000
```

See [`storyteller/README.md`](./storyteller/README.md) for complete documentation.

## Deployment

CI/CD is handled by GitHub Actions (see `.github/workflows/ci.yml`). On pushes to `main`, the workflow builds the frontend, builds a Docker image and pushes it to GHCR, then SSH deploys to a Dell R720 server running Docker Compose.

## Mascots and Assets

Each mascot has a text file in `frontend/src/components/mascots/` describing their appearance and attitude. These prompts can be used to create artwork. The current React components only implement **Dumbo** using a placeholder image. Future work should include the other mascots with real artwork.

See [`# Mascot Character Reference Guide.md`](#%20Mascot%20Character%20Reference%20Guide.md) for full descriptions.

## Features

### Content Generation
* **Character Consistency System** - 50 reference images per mascot
  * Full body poses, expressions, actions, lighting variations
  * Character turnarounds and detail shots
  * Total: 250 reference images across 5 characters
* **Comic Development** - 5 complete storylines
  * Automated panel illustration with Gemini Imagen 3
  * HTML viewers for each comic
  * Animation-ready scripts
* **Animation Production** - Gemini Veo 3 integration
  * Convert comics to animated cartoons
  * Professional quality (1920x1080, 24fps)
  * Configurable timing and transitions

### E-Commerce Platform
* **T-Shirt Shop** (`/shop`) - 8 products with shopping cart
  * Character-based filtering
  * Size selection (XS-3XL)
  * Tier-based pricing ($22.99-$29.99)
  * Responsive cyberpunk design
* **Character Gallery** (`/gallery`) - Browse all 250 references
  * Category filtering
  * Grid/list view modes
  * Image modal viewer

### Original Features
* Animated landing page showcasing Dumbo
* Navbar with placeholder links
* Express API health endpoint at `/api/health`
* **Google Gemini Integration** - AI-powered content generation
  * Imagen 3 for character artwork and scene illustrations
  * Veo 3 for video animation and content generation
  * Complete character asset packages
  * Episode and comic animation
* Dockerfiles for production builds of both frontend and backend
* Example GitHub workflow for building and deploying automatically
* Comprehensive storytelling agent with dark humor content generation

## Further Information

The `context.md` file contains a full copy of the current directory layout and code for use with LLMs. Consult that document for a deeper dive into the project goals and next steps.

## Contributing

We welcome pull requests! To contribute:

1. Fork the repository and create a feature branch.
2. Install dependencies in both `frontend` and `backend`:
   ```bash
   npm install --prefix frontend
   npm install --prefix backend
   ```
3. Run the tests before opening a PR:
   ```bash
   npm test --prefix frontend
   npm test --prefix backend
   ```
4. Keep `DIFF_*.md` and `RECOMMENDATIONS_*.md` logs intact and append new versions when documenting changes.
