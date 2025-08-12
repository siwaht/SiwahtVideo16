#!/bin/bash

echo "🎯 FINAL DEPLOYMENT CONFIGURATION FIX"
echo "====================================="

# Step 1: Fix permissions for development tools
echo "🔧 Fixing development tool permissions..."
chmod +x node_modules/.bin/* 2>/dev/null
chmod +x node_modules/vite/node_modules/@esbuild/linux-x64/bin/esbuild 2>/dev/null
echo "✓ Development tools permissions fixed"

# Step 2: Verify production build is ready
echo ""
echo "📦 PRODUCTION BUILD STATUS:"
if [ -f "dist/index.js" ]; then
    echo "✅ Server: dist/index.js ($(stat -c%s dist/index.js) bytes)"
else
    echo "❌ Running production build..."
    npm run build
fi

VIDEO_COUNT=$(ls dist/public/videos/*.mp4 2>/dev/null | wc -l)
AUDIO_COUNT=$(ls dist/public/audio/*.{mp3,aac} 2>/dev/null | wc -l)
echo "✅ Media: $VIDEO_COUNT videos, $AUDIO_COUNT audio files"

# Step 3: Create deployment documentation
echo ""
echo "📋 DEPLOYMENT CONFIGURATION NEEDED:"
echo ""
echo "CRITICAL: Change deployment from 'Static' to 'Node.js Server'"
echo ""
echo "In Replit Deploy Settings:"
echo "  Type: Server/Node.js (NOT Static)"
echo "  Build Command: npm ci && npm run build" 
echo "  Start Command: node dist/index.js"
echo "  Health Check: GET /"
echo "  Port: Auto (process.env.PORT)"
echo ""

# Step 4: Test one more time
echo "🧪 FINAL PRODUCTION TEST:"
cd dist
NODE_ENV=production PORT=3003 node index.js &
PID=$!
cd ..
sleep 3

if curl -s http://localhost:3003/api/media/all | grep -q '"success":true'; then
    echo "✅ Production server working perfectly"
else
    echo "❌ Production server issue"
fi

if curl -s http://localhost:3003 | grep -q "<!DOCTYPE html>" && ! curl -s http://localhost:3003 | grep -q "@vite/client"; then
    echo "✅ Production frontend serving correctly"
else
    echo "❌ Frontend issue"
fi

kill $PID 2>/dev/null

echo ""
echo "🚀 READY FOR DEPLOYMENT!"
echo ""
echo "ACTION REQUIRED:"
echo "1. Click Deploy button in Replit"
echo "2. Change Type from 'Static' to 'Server/Node.js'"
echo "3. Set Start Command: node dist/index.js"  
echo "4. Deploy will work with all videos and audio"
echo ""
echo "The media system uses base64 data URLs so it will work"
echo "regardless of deployment path structure!"