#!/bin/bash

# Script to copy video and audio assets to client public directory for production build
# This ensures static files are included in the Vite build for deployment

echo "Copying video and audio assets to client public directory..."

# Create directories if they don't exist
mkdir -p client/public/videos
mkdir -p client/public/audio

# Copy video files
cp -r public/videos/* client/public/videos/
echo "✓ Videos copied to client/public/videos/"

# Copy audio files  
cp -r public/audio/* client/public/audio/
echo "✓ Audio files copied to client/public/audio/"

echo "Asset copying complete! Ready for production build."