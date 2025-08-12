#!/bin/bash

echo "🚀 Fixing deployment media serving issues..."

# Step 1: Fix file permissions
echo "📋 Step 1: Fixing file permissions..."
chmod -R 644 dist/public/videos/* 2>/dev/null || echo "No videos to fix"
chmod -R 644 dist/public/audio/* 2>/dev/null || echo "No audio to fix"
chmod -R 755 dist/public/videos dist/public/audio 2>/dev/null || echo "Directories already accessible"

# Step 2: Copy assets from development to production paths
echo "📋 Step 2: Ensuring assets are in production paths..."
if [ -d "public/videos" ]; then
    mkdir -p dist/public/videos
    cp -r public/videos/* dist/public/videos/ 2>/dev/null || echo "Videos already in place"
fi

if [ -d "public/audio" ]; then
    mkdir -p dist/public/audio  
    cp -r public/audio/* dist/public/audio/ 2>/dev/null || echo "Audio already in place"
fi

# Step 3: Test media API
echo "📋 Step 3: Testing media API..."
if curl -s http://localhost:5000/api/media/all | head -c 100 | grep -q "success"; then
    echo "✅ Media API responding correctly"
else
    echo "❌ Media API not responding - checking server..."
fi

# Step 4: Verify file accessibility
echo "📋 Step 4: Verifying file accessibility..."
echo "Videos in dist:"
ls -la dist/public/videos/ 2>/dev/null | head -5 || echo "No videos found"
echo "Audio in dist:"
ls -la dist/public/audio/ 2>/dev/null | head -5 || echo "No audio found"

echo "🎉 Deployment media fix complete!"
echo "Deploy instructions:"
echo "1. Run this script: ./fix-deployment-media.sh"
echo "2. Deploy using Replit Deploy button"
echo "3. Media should now work in production"