#!/bin/bash
echo "Copying web-optimized video and audio assets to client/public..."

# Create directories
mkdir -p client/public/videos client/public/audio

# Copy web-optimized video files
echo "Copying videos..."
cp public/videos/optimized/*-web.mp4 client/public/videos/ 2>/dev/null || echo "No optimized videos found"

# Copy web-optimized audio files
echo "Copying audio..."
cp public/audio/optimized/*-web.mp3 client/public/audio/ 2>/dev/null || echo "No optimized audio found"

# Also copy the optimized files to replace originals in public/
cp public/videos/optimized/*-web.mp4 public/videos/ 2>/dev/null
cp public/audio/optimized/*-web.mp3 public/audio/ 2>/dev/null

echo "Asset copying complete!"
