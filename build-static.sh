#!/bin/bash

echo "Building static site with media assets..."

# Clean previous build
rm -rf dist/

# Set environment variable for static build
export VITE_STATIC_BUILD=true

# Build the client (Vite)
echo "Building client with static media support..."
npm run build

# Copy media files from both possible locations
echo "Copying media files..."

# Copy from root public directory
if [ -d "public/videos" ]; then
    echo "Copying videos from root public directory..."
    cp -r public/videos dist/public/
fi

if [ -d "public/audio" ]; then
    echo "Copying audio from root public directory..."
    cp -r public/audio dist/public/
fi

# Copy from client public directory (if exists)
if [ -d "client/public/videos" ]; then
    echo "Copying videos from client public directory..."
    mkdir -p dist/public/videos
    cp client/public/videos/* dist/public/videos/ 2>/dev/null || true
fi

if [ -d "client/public/audio" ]; then
    echo "Copying audio from client public directory..."
    mkdir -p dist/public/audio
    cp client/public/audio/* dist/public/audio/ 2>/dev/null || true
fi

# Create a simple index redirect if needed
if [ ! -f "dist/public/index.html" ]; then
    echo "<!DOCTYPE html><html><head><meta http-equiv='refresh' content='0; url=./index.html'></head></html>" > dist/index.html
fi

echo "Static build complete!"
echo "Build output in: dist/public/"

# List built files for verification
echo ""
echo "Built files:"
ls -la dist/public/ | head -10
echo ""
if [ -d "dist/public/videos" ]; then
    echo "Videos ($(ls dist/public/videos | wc -l) files):"
    ls -la dist/public/videos/ | head -5
else
    echo "No videos directory found"
fi
echo ""
if [ -d "dist/public/audio" ]; then
    echo "Audio ($(ls dist/public/audio | wc -l) files):"
    ls -la dist/public/audio/ | head -5
else
    echo "No audio directory found"
fi

echo ""
echo "To test locally: cd dist/public && python3 -m http.server 8000"
echo "Then visit: http://localhost:8000"