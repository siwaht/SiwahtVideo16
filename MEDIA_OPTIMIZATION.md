# Media Optimization System for Siwaht

This system automatically converts audio and video files to web-optimized formats for flawless deployment playback.

## Quick Commands

### Replace Media Files (Automatic Optimization)
```bash
# 1. Add your new video/audio files to public/videos/ or public/audio/
# 2. Run the optimization script
./optimize-media.sh

# 3. Copy optimized files for deployment
./copy-assets.sh
```

### Manual Steps for New Media Files

1. **Add your files**: Place new `.mp4` videos in `public/videos/` or `.mp3/.aac` audio in `public/audio/`

2. **Run optimization**: 
   ```bash
   ./optimize-media.sh
   ```

3. **Deploy preparation**:
   ```bash
   ./copy-assets.sh
   ```

## What the System Does

### Video Optimization
- Converts to H.264 codec with libx264 encoder
- Uses yuv420p pixel format for universal browser compatibility
- Adds faststart flag for instant streaming
- Optimizes with CRF 23 quality and AAC audio at 128kbps
- Creates `-web.mp4` versions in `/optimized/` directories

### Audio Optimization
- Converts all audio to MP3 format
- Standardizes bitrate to 128kbps for consistent streaming
- Creates `-web.mp3` versions in `/optimized/` directories

### File Structure
```
public/
├── videos/
│   ├── optimized/          # Web-optimized versions
│   │   ├── filename-web.mp4
│   └── filename.mp4        # Original files
├── audio/
│   ├── optimized/          # Web-optimized versions
│   │   ├── filename-web.mp3
│   └── filename.mp3        # Original files

client/public/              # Deployment-ready files
├── videos/
│   └── filename-web.mp4
├── audio/
│   └── filename-web.mp3
```

## Deployment Checklist

Before deploying, ensure:
- [ ] All media files have `-web` optimized versions
- [ ] Files are copied to `client/public/` directories
- [ ] Storage references use `-web` file paths
- [ ] Server MIME types are properly configured

## Troubleshooting

**Files not playing after deployment?**
1. Check that optimized versions exist in `client/public/`
2. Verify storage.ts references use `-web` file paths
3. Ensure server serves files with correct MIME types

**Need to add new media?**
1. Place original files in `public/videos/` or `public/audio/`
2. Run `./optimize-media.sh` to create optimized versions
3. Update `server/storage.ts` to reference the new `-web` files
4. Run `./copy-assets.sh` before deployment

This system ensures all multimedia content plays flawlessly across all browsers and devices when deployed.