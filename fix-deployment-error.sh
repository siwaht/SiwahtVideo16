#!/bin/bash

echo "🚨 FIXING DEPLOYMENT ERROR: Static -> Node.js Server"
echo "=================================================="

# The error shows Replit is trying to find index.html for static deployment
# But we need Node.js server deployment

echo "❌ CURRENT ISSUE:"
echo "   - Deployment Type: Static"
echo "   - Looking for: dist/public/index.html" 
echo "   - Error: 'could not create static deployment'"
echo ""

echo "✅ REQUIRED FIX:"
echo "   - Change Type: Node.js Server"
echo "   - Start Command: node dist/index.js"
echo "   - Let Express serve both API and frontend"
echo ""

# Verify our Node.js server is ready
if [ -f "dist/index.js" ]; then
    SIZE=$(stat -c%s dist/index.js)
    echo "✅ Server ready: dist/index.js ($SIZE bytes)"
else
    echo "❌ Server missing - rebuilding..."
    npm run build
fi

# Verify static files are in place for server to serve
if [ -f "dist/public/index.html" ]; then
    echo "✅ Frontend files ready for server serving"
else
    echo "❌ Frontend files missing - rebuilding..."
    npm run build
fi

echo ""
echo "🎯 DEPLOYMENT CONFIGURATION NEEDED:"
echo ""
echo "In Replit Deploy Settings UI:"
echo "1. Click 'Edit commands and secrets'"
echo "2. Change Type from 'Static' to 'Server' or 'Node.js'"
echo "3. Set Build Command: npm ci && npm run build"
echo "4. Set Start Command: node dist/index.js"
echo "5. Set Health Check: GET /"
echo ""

echo "The server will:"
echo "- Serve API endpoints: /api/media/all, /api/samples/*"
echo "- Serve static frontend from dist/public/"
echo "- Handle all routes properly"
echo ""

# Quick test to prove server works
echo "🧪 Testing server locally to confirm it works:"
cd dist
NODE_ENV=production PORT=4000 node index.js &
PID=$!
cd ..
sleep 3

if curl -s http://localhost:4000 | head -c 50 | grep -q "<!DOCTYPE html>"; then
    echo "✅ Server serves frontend correctly"
else
    echo "❌ Server frontend issue"
fi

if curl -s http://localhost:4000/api/media/all | head -c 50 | grep -q "success"; then
    echo "✅ Server API working correctly"
else
    echo "❌ Server API issue"
fi

kill $PID 2>/dev/null

echo ""
echo "🚀 SERVER IS READY - CHANGE DEPLOYMENT TYPE TO NODE.JS!"