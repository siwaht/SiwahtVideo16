#!/bin/bash

echo "🔧 Building production deployment with all assets..."

# Step 1: Clean and build
echo "📦 Building application..."
npm ci && npm run build

# Step 2: Copy media assets with proper permissions
echo "📁 Copying media assets to production paths..."
mkdir -p dist/public/videos dist/public/audio

# Copy from source directories
if [ -d "public/videos" ]; then
    cp public/videos/* dist/public/videos/ 2>/dev/null
    echo "✓ Videos copied to dist/public/videos/"
fi

if [ -d "public/audio" ]; then
    cp public/audio/* dist/public/audio/ 2>/dev/null  
    echo "✓ Audio copied to dist/public/audio/"
fi

# Step 3: Set proper permissions
echo "🔧 Setting file permissions..."
find dist -type d -exec chmod 755 {} \;
find dist -type f -exec chmod 644 {} \;

# Step 4: Verify build
echo "✅ Verifying production build..."
if [ -f "dist/index.js" ]; then
    echo "✓ Server bundle: dist/index.js ($(stat -c%s dist/index.js) bytes)"
else
    echo "❌ Server bundle missing!"
    exit 1
fi

VIDEO_COUNT=$(ls dist/public/videos/*.mp4 2>/dev/null | wc -l)
AUDIO_COUNT=$(ls dist/public/audio/*.{mp3,aac} 2>/dev/null | wc -l)

echo "✓ Videos in dist: $VIDEO_COUNT files"
echo "✓ Audio in dist: $AUDIO_COUNT files"

# Step 5: Test production server
echo "🧪 Testing production server..."
cd dist
NODE_ENV=production PORT=3001 node index.js &
SERVER_PID=$!
cd ..

sleep 3

# Test media API
if curl -s http://localhost:3001/api/media/all | head -c 100 | grep -q "success"; then
    echo "✓ Media API working in production"
else
    echo "❌ Media API failed in production"
fi

# Test frontend
if curl -s http://localhost:3001 | head -c 100 | grep -q "<!DOCTYPE html>"; then
    echo "✓ Frontend serving in production"
else
    echo "❌ Frontend not serving"
fi

# Cleanup
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎯 Production build ready for Node.js deployment!"
echo "Start command: node dist/index.js"
echo "Health check: GET /"
echo "Port: process.env.PORT (fallback 5000)"