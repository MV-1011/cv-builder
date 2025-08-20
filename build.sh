#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Install Node.js dependencies and build frontend
cd cv-builder-frontend
npm ci
npm run build
cd ..

echo "Build completed successfully!"