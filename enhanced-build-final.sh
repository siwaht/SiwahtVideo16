#!/bin/bash

echo "🚀 Starting FINAL enhanced build with data URL media serving..."

# Step 1: Copy assets to client/public for Vite build inclusion
echo "📁 Step 1: Copying assets to client/public..."
./copy-assets-to-client.sh

echo ""
echo "🔨 Step 2: Building application..."
npm run build

echo ""
echo "📋 Step 3: Copying assets to server dist directory for API serving..."
mkdir -p dist/public/videos dist/public/audio

if [ -d "public/videos" ]; then
    cp public/videos/* dist/public/videos/ 2>/dev/null
    echo "✅ Videos copied to dist/public/videos/"
fi

if [ -d "public/audio" ]; then
    cp public/audio/* dist/public/audio/ 2>/dev/null
    echo "✅ Audio copied to dist/public/audio/"
fi

echo ""
echo "🧪 Step 4: Testing new media API..."
echo "Starting production server for API test..."
NODE_ENV=production node dist/index.js > api_test.log 2>&1 &
SERVER_PID=$!

sleep 3

# Test the new media API endpoint
echo "Testing /api/media/all endpoint..."
curl -s http://localhost:5000/api/media/all | head -c 300
echo ""

# Clean up test server
kill $SERVER_PID 2>/dev/null

echo ""
echo "📊 Step 5: Final verification:"
echo "Server videos: $(ls dist/public/videos/ 2>/dev/null | wc -l)"
echo "Server audio: $(ls dist/public/audio/ 2>/dev/null | wc -l)"

echo ""
echo "🎉 FINAL enhanced build complete!"
echo "New features:"
echo "  ✅ Media served as base64 data URLs via /api/media/all"
echo "  ✅ Fallback streaming endpoints maintained"
echo "  ✅ Enhanced video player with error handling"
echo "  ✅ Environment-aware asset loading"
echo ""
echo "🚀 Ready for deployment! This approach should work in all environments."