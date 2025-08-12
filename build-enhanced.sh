#!/bin/bash

echo "Starting enhanced build with dual asset serving..."

# Step 1: Copy assets to client/public for Vite build inclusion
echo "Step 1: Copying assets to client/public for Vite build..."
./copy-assets-to-client.sh

echo ""
echo "Step 2: Building application with Vite..."
npm run build

echo ""
echo "Step 3: Copying assets to server dist directory for API serving..."
mkdir -p dist/public/videos dist/public/audio

if [ -d "public/videos" ]; then
    cp public/videos/* dist/public/videos/ 2>/dev/null
    echo "✓ Videos copied to dist/public/videos/"
fi

if [ -d "public/audio" ]; then
    cp public/audio/* dist/public/audio/ 2>/dev/null
    echo "✓ Audio copied to dist/public/audio/"
fi

echo ""
echo "Step 4: Verification - Asset counts:"
echo "Server videos: $(ls dist/public/videos/ 2>/dev/null | wc -l)"
echo "Server audio: $(ls dist/public/audio/ 2>/dev/null | wc -l)"

echo ""
echo "✅ Enhanced build complete!"
echo "Assets now available via:"
echo "  - Vite static serving (frontend build)"
echo "  - Express API endpoints (backend serving)"