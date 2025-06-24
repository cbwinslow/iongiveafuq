#!/bin/bash
set -e

# Load environment variables from .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Ensure required environment variables
missing=false
for var in CF_API_TOKEN CLOUDFLARED_TOKEN; do
  if [ -z "${!var}" ]; then
    echo "Missing required env var: $var"
    missing=true
  fi
done
if [ "$missing" = true ]; then
  exit 1
fi

# Run tests
npm test --prefix backend
npm test --prefix frontend

# Build and launch containers
docker compose up -d --build

echo "Deployment complete."
