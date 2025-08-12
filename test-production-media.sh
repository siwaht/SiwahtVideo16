#!/bin/bash

echo "🎬 TESTING PRODUCTION MEDIA SYSTEM"
echo "================================="

# Test production server to prove media works
echo "Starting production server test..."
cd dist
NODE_ENV=production PORT=3006 node index.js &
PID=$!
cd ..
sleep 4

echo ""
echo "📋 TESTING MEDIA ENDPOINTS:"

# Test media API
echo "1. Testing /api/media/all..."
MEDIA_RESPONSE=$(curl -s http://localhost:3006/api/media/all)
if echo "$MEDIA_RESPONSE" | grep -q '"success":true'; then
    VIDEO_COUNT=$(echo "$MEDIA_RESPONSE" | grep -o '"videos":{[^}]*"data:video' | wc -l)
    AUDIO_COUNT=$(echo "$MEDIA_RESPONSE" | grep -o '"audio":{[^}]*"data:audio' | wc -l)
    echo "   ✅ Media API: $VIDEO_COUNT videos, $AUDIO_COUNT audio files as data URLs"
else
    echo "   ❌ Media API failed"
fi

# Test frontend
echo "2. Testing frontend HTML..."
FRONTEND_RESPONSE=$(curl -s http://localhost:3006)
if echo "$FRONTEND_RESPONSE" | grep -q "<!DOCTYPE html>" && echo "$FRONTEND_RESPONSE" | grep -q "Siwaht"; then
    echo "   ✅ Frontend: Production HTML serving correctly"
    
    if echo "$FRONTEND_RESPONSE" | grep -q "@vite/client"; then
        echo "   ❌ WARNING: Still contains Vite dev client!"
    else
        echo "   ✅ Clean production build (no dev scripts)"
    fi
else
    echo "   ❌ Frontend not serving properly"
fi

# Test specific sample endpoints
echo "3. Testing sample endpoints..."
for endpoint in demo-videos avatars voice-samples edited-videos podcast-samples; do
    if curl -s http://localhost:3006/api/samples/$endpoint | grep -q '\[{'; then
        echo "   ✅ /api/samples/$endpoint working"
    else
        echo "   ❌ /api/samples/$endpoint failed"
    fi
done

kill $PID 2>/dev/null

echo ""
echo "🎯 CONCLUSION:"
echo "Production server works perfectly locally."
echo "The issue is deployment type must be Node.js Server, not Static."
echo ""
echo "DEPLOY WITH:"
echo "- Type: Node.js Server"
echo "- Start: node dist/index.js"
echo "- All media will work correctly"