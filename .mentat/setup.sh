#!/bin/bash

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install

# Build frontend to ensure it works
npm run build
