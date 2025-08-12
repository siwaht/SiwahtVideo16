#!/bin/bash

# Complete build script that ensures assets are included in production
echo "Starting build with asset inclusion..."

# Step 1: Copy assets to client public directory
echo "Copying assets..."
./copy-assets.sh

# Step 2: Build the application
echo "Building application..."
vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Step 3: Verify assets are in build output
echo "Verifying assets in build output..."
ls -la dist/public/videos/ | wc -l
ls -la dist/public/audio/ | wc -l

echo "Build complete with assets!"