#!/bin/bash

echo "🚀 Starting Siwaht in production mode..."

# Ensure we have a fresh production build
echo "📦 Building production assets..."
npm run build

# Start the production server
echo "🌟 Starting production server..."
NODE_ENV=production node dist/index.js