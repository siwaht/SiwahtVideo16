# Static Deployment Guide

This document explains how to deploy the Siwaht multimedia platform as a static site.

## Overview

The application has been configured to support both dynamic (API-based) and static deployment modes:

- **Dynamic Mode**: Uses Express server with API endpoints and data URLs for media
- **Static Mode**: Uses relative paths to serve media files directly from the filesystem

## Static Build Process

### 1. Build Command
```bash
./build-static.sh
```

This script:
- Sets `VITE_STATIC_BUILD=true` environment variable
- Builds the client using Vite
- Copies all media files from `public/videos/` and `public/audio/` to `dist/public/`
- Creates a complete static site in `dist/public/`

### 2. Output Structure
```
dist/public/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── logo.png
├── videos/
│   ├── artisan-baker-avatar.mp4
│   ├── coach-avatar.mp4
│   ├── dairy-farmer-edited.mp4
│   ├── ikea-demo-new.mp4
│   └── [other video files]
├── audio/
│   ├── context-is-king.mp3
│   ├── dub-arabic.aac
│   ├── dub-original-english.mp3
│   └── [other audio files]
```

## Media Handling

### Static Mode Detection
The app automatically detects static mode using:
```javascript
const isStaticMode = () => {
  return import.meta.env.VITE_STATIC_BUILD === 'true' || 
         typeof window !== 'undefined' && !window.location.origin.includes('5000');
};
```

### Video URLs
- **Dynamic mode**: `/videos/filename.mp4` (served by Express)
- **Static mode**: `./videos/filename.mp4` (relative paths)

### Available Media Files
The static build includes:

**Videos:**
- artisan-baker-avatar.mp4
- coach-avatar.mp4  
- dairy-farmer-edited.mp4
- dairy-farmer-new.mp4
- ikea-demo-new.mp4
- ikea-demo-updated.mp4
- ikea-demo.mp4

**Audio:**
- context-is-king.mp3
- dub-arabic.aac
- dub-original-chinese.mp3
- dub-original-english.mp3
- fasten-your-nightmares.mp3

## Deployment Options

### 1. Static Hosting Services
Upload the `dist/public/` directory to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages

### 2. Local Testing
```bash
cd dist/public
python3 -m http.server 8000
# Visit http://localhost:8000
```

### 3. Docker Static Serve
```dockerfile
FROM nginx:alpine
COPY dist/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Key Features

### Automatic Mode Switching
- No code changes needed between development and static deployment
- Automatically uses appropriate media serving method
- Graceful fallback handling

### Media Optimization
- Direct file serving in static mode (better performance)
- No API calls or data URL conversion needed
- Cached static assets

### SEO Friendly
- All content is pre-rendered
- Media files accessible to crawlers
- Proper meta tags and Open Graph data

## Troubleshooting

### Videos Not Loading
1. Check that video files exist in `dist/public/videos/`
2. Verify MIME types are correct
3. Ensure relative paths are working

### Build Issues
1. Ensure both `public/videos/` and `client/public/videos/` exist
2. Check that `VITE_STATIC_BUILD=true` is set during build
3. Verify all media files are copied to output directory

### Performance
- Videos are served directly as files (not base64)
- No server-side processing required
- Better caching behavior with static hosting