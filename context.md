# iongiveafuq Project – Transfer Context Page

> **Purpose**  
> Paste everything below into any LLM prompt (or share as a doc) and the model will have *full* context of the project goals, mascots, directory layout, and all code generated so far.

---

## 1  Elevator Pitch

*iongiveafuq.com* is a dark‑humor e‑commerce site that “sells” three novelty items:

| Tier | Mascot | Tag Line |
|------|--------|----------|
| **Fuqs**  | Dumbo (ugly dog) | “Fresh outta fuqs – check back later.” |
| **Shits** | Scrapz (ragged cat) | “I couldn’t give a 💩 if I tried.” |
| **Damns** | Buzz (drunk donkey) | “Ain’t got one damn left in the bottle.” |
| **Bonus** | Rizzo (sick rat)    | Represents what happens when you truly run out of everything. |

Visual style = cyberpunk neon on charcoal, saturated accent colors (`neon‑pink`, `neon‑green`, `neon‑blue`).  Animations via **Framer Motion** (React) or **Lottie**.

---

## 2  Tech Stack

* **Frontend** – React 18 (Vite), Tailwind CSS, Framer Motion  
* **Backend**  – Node 20 / Express (containerised)  
* **DB**  – PostgreSQL (Docker service)  
* **CI/CD**  – GitHub Actions → build & push images → SSH deploy to Dell R720  
* **Runtime**  – `docker‑compose` on the server; Caddy/Let’s Encrypt for HTTPS later

---

## 3  Directory Layout
```
iongiveafuq/
 ├─ .github/workflows/ci.yml
 ├─ .vscode/
 ├─ frontend/   (React app)
 ├─ backend/    (Express API)
 ├─ docker-compose.yml
 ├─ docs/
 └─ .directory  (source‑of‑truth spec for directory‑builder)
```

---

## 4  How to Run Locally
```bash
# pre‑req: Docker & Node 20
npm install              # (inside frontend) – optional for dev
npm run dev              # frontend dev server on :5173

# full stack with docker
docker compose up -d --build  # web on :80  |  api on :4000
```

---

## 5  Code Listing (current state)

Below are **all non‑placeholder files** generated so far.  Paths are commented above each block – copy/paste directly.

### 5.1  `.github/workflows/ci.yml`
```yaml
name: CI
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    env:
      REGISTRY: ghcr.io
      IMAGE: ${{ github.repository }}-web
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install & build frontend
        working-directory: frontend
        run: |
          npm ci
          npm run build

      - name: Build & push Docker image
        run: |
          docker build -t $REGISTRY/$IMAGE:${{ github.sha }} .
          echo ${{ secrets.GHCR_TOKEN }} | docker login $REGISTRY -u ${{ github.actor }} --password-stdin
          docker push $REGISTRY/$IMAGE:${{ github.sha }}

      - name: Deploy on DellR720
        uses: appleboy/ssh-action@v0.2.0
        with:
          host: ${{ secrets.R720_HOST }}
          username: ${{ secrets.R720_USER }}
          key: ${{ secrets.R720_SSH_KEY }}
          script: |
            cd /srv/iongiveafuq
            docker compose pull
            docker compose up -d --remove-orphans
```

### 5.2  `docker-compose.yml`
```yaml
version: "3.9"
services:
  web:
    build: ./frontend
    ports:
      - "80:80"
    networks: [fuqnet]

  api:
    build: ./backend
    ports:
      - "4000:4000"
    networks: [fuqnet]

networks:
  fuqnet:
```

### 5.3  **frontend/Dockerfile**
```Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 5.4  **frontend/package.json**
```json
{
  "name": "iongiveafuq-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.0",
    "vite": "^5.2.0"
  }
}
```

### 5.5  `frontend/vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
```

### 5.6  `frontend/tailwind.config.js`
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff4ecd',
        'neon-green': '#39ff14',
        'neon-blue':  '#3bf7ff',
      },
    },
  },
  plugins: [],
};
```

### 5.7  `frontend/postcss.config.js`
```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

### 5.8  `frontend/public/index.html`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>iongiveafuq.com</title>
  </head>
  <body class="bg-gray-900 text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 5.9  `frontend/src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5.10  `frontend/src/main.jsx`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 5.11  `frontend/src/App.jsx`
```jsx
/* App.jsx – main shell */
import Navbar from './components/Navbar';
import { motion } from 'framer-motion';
import Dumbo from './components/mascots/Dumbo';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-8 flex justify-center"
      >
        <Dumbo />
      </motion.main>
    </div>
  );
}
```

### 5.12  `frontend/src/components/Navbar.jsx`
```jsx
export default function Navbar() {
  return (
    <nav className="bg-black py-4 px-6 flex justify-between items-center shadow-md">
      <div className="text-neon-pink font-extrabold text-2xl">iongiveafuq.com</div>
      <ul className="flex space-x-4">
        <li><a href="#" className="hover:text-neon-green">Home</a></li>
        <li><a href="#" className="hover:text-neon-green">Store</a></li>
        <li><a href="#" className="hover:text-neon-green">About</a></li>
      </ul>
    </nav>
  );
}
```

### 5.13  `frontend/src/components/mascots/Dumbo.jsx`
```jsx
import { motion } from 'framer-motion';
import dumboImg from '../../assets/mascots/dog_placeholder.png'; // replace with real asset

export default function Dumbo() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="bg-gray-800 p-6 rounded-xl shadow-xl text-center max-w-sm"
    >
      <h2 className="text-3xl font-bold text-neon-blue mb-4">Meet Dumbo!</h2>
      <img src={dumboImg} alt="Dumbo the Dog" className="mx-auto mb-4 w-64 h-auto rounded-lg" />
      <p className="text-lg">“Fresh outta fuqs. Check back later!”</p>
    </motion.div>
  );
}
```

### 5.14  `backend/Dockerfile`
```Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
```

### 5.15  `backend/package.json`
```json
{
  "name": "iongiveafuq-backend",
  "version": "0.1.0",
  "main": "index.js",
  "scripts": { "start": "node index.js" },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.0"
  }
}
```

### 5.16  `backend/index.js`
```js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(4000, () => console.log('API listening on :4000'));
```

---

## 6  Next Steps
1. Fill placeholders (`Scrapz.jsx`, `PattyLaHam.jsx`, `Buzz.jsx`, DB code).  
2. Import real mascot artwork.  
3. Build Cart & Stripe checkout.  
4. Harden backend & add Postgres schema.  
5. Configure Caddy / Let’s Encrypt on Dell R720.

*End of context page.*

