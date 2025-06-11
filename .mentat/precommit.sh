#!/bin/bash

# Format and lint frontend code
cd frontend
npx prettier --write "src/**/*.{js,jsx}" 

# Format and lint backend code
cd ../backend
npx prettier --write "*.js"
