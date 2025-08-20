#!/bin/bash
set -e

echo "Starting API build process..."

# Railway should auto-install Python dependencies from requirements.txt
# This script is just for any additional setup

echo "Python build completed successfully!"
echo "Running in API-only mode - frontend will be deployed separately"