#!/bin/bash

echo "Copying all assets to client/public for Vite build inclusion..."

# Create directories if they don't exist
mkdir -p client/public/videos
mkdir -p client/public/audio

# Copy all video files
if [ -d "public/videos" ]; then
    cp public/videos/* client/public/videos/ 2>/dev/null || echo "No video files to copy"
    echo "✓ Videos copied to client/public/videos/"
else
    echo "⚠ No public/videos directory found"
fi

# Copy all audio files  
if [ -d "public/audio" ]; then
    cp public/audio/* client/public/audio/ 2>/dev/null || echo "No audio files to copy"
    echo "✓ Audio copied to client/public/audio/"
else
    echo "⚠ No public/audio directory found"
fi

echo "Asset copying to client complete!"
echo "Files will now be included in Vite build and served by frontend"

# List what was copied
echo ""
echo "Video files in client/public/videos:"
ls -la client/public/videos/ | grep -v "^d" | wc -l | xargs echo "Count:"

echo ""
echo "Audio files in client/public/audio:"
ls -la client/public/audio/ | grep -v "^d" | wc -l | xargs echo "Count:"