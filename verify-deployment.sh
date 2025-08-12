#!/bin/bash

echo "🔍 Verifying deployment media functionality..."

DOMAIN=$(echo $REPLIT_DOMAINS | cut -d',' -f1)
if [ -z "$DOMAIN" ]; then
    echo "❌ No deployment domain found"
    exit 1
fi

echo "📡 Testing deployment at: https://$DOMAIN"

# Test 1: Media API availability
echo "🧪 Test 1: Media API endpoint..."
MEDIA_RESPONSE=$(curl -s "https://$DOMAIN/api/media/all")
if echo "$MEDIA_RESPONSE" | grep -q '"success":true'; then
    VIDEO_COUNT=$(echo "$MEDIA_RESPONSE" | grep -o '"[^"]*\.mp4"' | wc -l)
    AUDIO_COUNT=$(echo "$MEDIA_RESPONSE" | grep -o '"[^"]*\.\(mp3\|aac\)"' | wc -l)
    echo "✅ Media API working: $VIDEO_COUNT videos, $AUDIO_COUNT audio files"
else
    echo "❌ Media API failed"
    echo "Response: $(echo "$MEDIA_RESPONSE" | head -c 200)"
    exit 1
fi

# Test 2: Specific video data URLs
echo "🧪 Test 2: IKEA demo video data URL..."
if echo "$MEDIA_RESPONSE" | grep -q '"ikea-demo-new.mp4":"data:video/mp4;base64,'; then
    echo "✅ IKEA demo video data URL present"
else
    echo "❌ IKEA demo video data URL missing"
fi

# Test 3: Frontend loading
echo "🧪 Test 3: Frontend accessibility..."
FRONTEND_RESPONSE=$(curl -s "https://$DOMAIN" | head -c 1000)
if echo "$FRONTEND_RESPONSE" | grep -q "<!DOCTYPE html>"; then
    echo "✅ Frontend loading correctly"
else
    echo "❌ Frontend not loading"
fi

# Test 4: Sample API endpoints
echo "🧪 Test 4: Sample endpoints..."
for endpoint in "demo-videos" "avatars" "voice-samples" "edited-videos" "podcast-samples"; do
    RESP=$(curl -s "https://$DOMAIN/api/samples/$endpoint")
    if echo "$RESP" | grep -q '\['; then
        COUNT=$(echo "$RESP" | grep -o '"id"' | wc -l)
        echo "✅ $endpoint: $COUNT items"
    else
        echo "❌ $endpoint: failed"
    fi
done

echo ""
echo "🎉 Deployment verification complete!"
echo "📋 Next steps:"
echo "1. If all tests pass, videos should work in production"
echo "2. Clear browser cache if needed"
echo "3. Check browser console for any client-side errors"