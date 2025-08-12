#!/bin/bash

echo "🚀 Creating production-ready deployment..."

# Step 1: Clean previous build
echo "📋 Step 1: Cleaning previous build..."
rm -rf dist
npm run build

# Step 2: Copy media assets to production paths
echo "📋 Step 2: Copying media assets to production paths..."
mkdir -p dist/public/videos dist/public/audio

# Copy from source directories with proper permissions
if [ -d "public/videos" ]; then
    cp public/videos/* dist/public/videos/ 2>/dev/null
    chmod 644 dist/public/videos/*
    echo "✅ Videos copied and permissions set"
fi

if [ -d "public/audio" ]; then
    cp public/audio/* dist/public/audio/ 2>/dev/null  
    chmod 644 dist/public/audio/*
    echo "✅ Audio copied and permissions set"
fi

# Ensure directories are accessible
chmod 755 dist/public/videos dist/public/audio 2>/dev/null

# Step 3: Test production build locally
echo "📋 Step 3: Testing production build..."
node dist/index.js &
SERVER_PID=$!
sleep 3

# Test media API
if curl -s http://localhost:5000/api/media/all | head -c 100 | grep -q "success"; then
    echo "✅ Production media API working"
    MEDIA_TEST="PASS"
else
    echo "❌ Production media API failed"
    MEDIA_TEST="FAIL"
fi

# Stop test server
kill $SERVER_PID 2>/dev/null

# Step 4: Verify all files are in place
echo "📋 Step 4: Final verification..."
VIDEO_COUNT=$(ls dist/public/videos/*.mp4 2>/dev/null | wc -l)
AUDIO_COUNT=$(ls dist/public/audio/*.{mp3,aac} 2>/dev/null | wc -l)

echo "Production build summary:"
echo "📊 Videos: $VIDEO_COUNT files"
echo "📊 Audio: $AUDIO_COUNT files"
echo "📊 Media API: $MEDIA_TEST"
echo "📊 Build size: $(du -sh dist | cut -f1)"

if [ "$VIDEO_COUNT" -gt 0 ] && [ "$AUDIO_COUNT" -gt 0 ] && [ "$MEDIA_TEST" = "PASS" ]; then
    echo "🎉 Production build ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Click Deploy button in Replit"
    echo "2. Videos and audio will work in production"
    echo "3. All media served as base64 data URLs"
else
    echo "❌ Production build has issues - check the errors above"
fi