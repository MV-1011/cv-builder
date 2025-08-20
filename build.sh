#!/bin/bash
set -e

echo "Starting build process..."

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "Node.js found: $(node --version)"
else
    echo "Node.js not found in PATH"
fi

if command -v npm &> /dev/null; then
    echo "npm found: $(npm --version)"
else
    echo "npm not found in PATH - skipping frontend build"
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Only build frontend if npm is available
if command -v npm &> /dev/null && [ -d "cv-builder-frontend" ]; then
    echo "Frontend directory found and npm available, building React app..."
    cd cv-builder-frontend
    
    # Install Node.js dependencies
    echo "Installing Node.js dependencies..."
    npm ci
    
    # Build the React application
    echo "Building React application..."
    npm run build
    
    # Check if build was successful
    if [ -d "build" ]; then
        echo "React build successful - build directory created"
        ls -la build/
    else
        echo "React build failed - no build directory found"
    fi
    
    cd ..
else
    echo "Skipping frontend build - npm not available or directory not found"
    echo "Running in API-only mode"
fi

echo "Build completed!"