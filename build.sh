#!/bin/bash
set -e

echo "Starting build process..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Check if frontend directory exists
if [ -d "cv-builder-frontend" ]; then
    echo "Frontend directory found, building React app..."
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
        exit 1
    fi
    
    cd ..
else
    echo "Frontend directory not found!"
    exit 1
fi

echo "Build completed successfully!"