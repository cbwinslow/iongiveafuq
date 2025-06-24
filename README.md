# iongiveafuq

**iongiveafuq.com** is a dark-humor e-commerce experiment that "sells" three novelty items:
* **Fuqs** – represented by Dumbo the ugly dog
* **Shits** – represented by Scrapz the ragged cat
* **Damns** – represented by Buzz the drunken donkey

The site embraces a neon cyberpunk aesthetic and uses React, Tailwind CSS and Framer Motion for animations. The backend is a small Express API. Docker Compose ties everything together.

## Repository Layout

```
backend/    Express API service
frontend/   React + Vite web app
# Mascot Character Reference Guide.md  Lore and art prompts
context.md  In-depth context with code listing
```

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

## Deployment

CI/CD is handled by GitHub Actions (see `.github/workflows/ci.yml`). On pushes to `main`, the workflow builds the frontend, builds a Docker image and pushes it to GHCR, then SSH deploys to a Dell R720 server running Docker Compose.

## Mascots and Assets

Each mascot has a text file in `frontend/src/components/mascots/` describing their appearance and attitude. These prompts can be used to create artwork. The current React components only implement **Dumbo** using a placeholder image. Future work should include the other mascots with real artwork.

See [`# Mascot Character Reference Guide.md`](#%20Mascot%20Character%20Reference%20Guide.md) for full descriptions.

## Features

* Animated landing page showcasing Dumbo
* Navbar with placeholder links
* Express API health endpoint at `/api/health`
* Dockerfiles for production builds of both frontend and backend
* Example GitHub workflow for building and deploying automatically

## Further Information

The `context.md` file contains a full copy of the current directory layout and code for use with LLMs. Consult that document for a deeper dive into the project goals and next steps.
