#!/bin/bash

# Enhanced Asset Copy Script with Auto-Optimization
# Automatically optimizes and copies media files for deployment

echo "🚀 Starting asset optimization and copying process..."

# Step 1: Run media optimization for any new files
echo "🔄 Running media optimization..."
./optimize-media.sh

# Step 2: Create directories
mkdir -p client/public/videos client/public/audio

# Step 3: Copy web-optimized video files
echo "📁 Copying optimized videos..."
if ls public/videos/optimized/*-web.mp4 1> /dev/null 2>&1; then
    cp public/videos/optimized/*-web.mp4 client/public/videos/
    echo "✅ Videos copied successfully"
else
    echo "⚠️  No optimized videos found"
fi

# Step 4: Copy web-optimized audio files
echo "📁 Copying optimized audio..."
if ls public/audio/optimized/*-web.mp3 1> /dev/null 2>&1; then
    cp public/audio/optimized/*-web.mp3 client/public/audio/
    echo "✅ Audio files copied successfully"
else
    echo "⚠️  No optimized audio found"
fi

# Step 5: Also copy optimized files to replace originals in public/
cp public/videos/optimized/*-web.mp4 public/videos/ 2>/dev/null
cp public/audio/optimized/*-web.mp3 public/audio/ 2>/dev/null

echo ""
echo "🎉 Asset optimization and copying complete!"
echo "💡 All media files are now web-optimized and ready for deployment"
