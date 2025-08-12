#!/bin/bash

echo "🔍 COMPREHENSIVE DEPLOYMENT VERIFICATION"
echo "========================================"

# Check build status
echo "📦 BUILD STATUS:"
if [ -f "dist/index.js" ]; then
    SIZE=$(stat -c%s dist/index.js)
    echo "✅ Server bundle: dist/index.js ($SIZE bytes)"
else
    echo "❌ Server bundle MISSING!"
    exit 1
fi

# Check media assets
VIDEO_COUNT=$(ls dist/public/videos/*.mp4 2>/dev/null | wc -l)
AUDIO_COUNT=$(ls dist/public/audio/*.{mp3,aac} 2>/dev/null | wc -l)

echo "✅ Videos in production: $VIDEO_COUNT files"
echo "✅ Audio in production: $AUDIO_COUNT files"

# Test production server
echo ""
echo "🧪 PRODUCTION SERVER TEST:"
cd dist
NODE_ENV=production PORT=3002 node index.js &
SERVER_PID=$!
cd ..

sleep 4

# Test media API
echo "Testing /api/media/all..."
MEDIA_RESPONSE=$(curl -s http://localhost:3002/api/media/all)
if echo "$MEDIA_RESPONSE" | grep -q '"success":true'; then
    VIDEO_COUNT_API=$(echo "$MEDIA_RESPONSE" | grep -o '"videos":{[^}]*}' | grep -o '":"' | wc -l)
    AUDIO_COUNT_API=$(echo "$MEDIA_RESPONSE" | grep -o '"audio":{[^}]*}' | grep -o '":"' | wc -l)
    echo "✅ Media API: $VIDEO_COUNT_API videos, $AUDIO_COUNT_API audio files"
else
    echo "❌ Media API failed"
fi

# Test frontend
echo "Testing frontend..."
FRONTEND_RESPONSE=$(curl -s http://localhost:3002)
if echo "$FRONTEND_RESPONSE" | grep -q "<!DOCTYPE html>"; then
    if echo "$FRONTEND_RESPONSE" | grep -q "Siwaht"; then
        echo "✅ Frontend: Serving production HTML"
    else
        echo "⚠️  Frontend: HTML but no Siwaht branding"
    fi
    
    # Check for Vite dev client (should NOT be present)
    if echo "$FRONTEND_RESPONSE" | grep -q "@vite/client"; then
        echo "❌ Frontend: Still serving Vite development version!"
    else
        echo "✅ Frontend: Production build (no Vite dev client)"
    fi
else
    echo "❌ Frontend: Not serving HTML"
fi

# Cleanup
kill $SERVER_PID 2>/dev/null

echo ""
echo "🎯 DEPLOYMENT REQUIREMENTS:"
echo "- Type: Node.js Server (NOT Static)"
echo "- Build: npm ci && npm run build"
echo "- Start: node dist/index.js"
echo "- Port: process.env.PORT (fallback 5000)"
echo "- Health: GET /"

if [ "$VIDEO_COUNT" -ge 7 ] && [ "$AUDIO_COUNT" -ge 5 ]; then
    echo ""
    echo "🎉 READY FOR NODE.JS DEPLOYMENT!"
    echo "All media assets and server bundle prepared."
else
    echo ""
    echo "⚠️  INCOMPLETE DEPLOYMENT"
    echo "Missing media assets. Expected 7+ videos, 5+ audio files."
fi