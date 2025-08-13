# How to Update Media Files in the Future

## For Any New Video or Audio Files:

### Step 1: Add Your Files
- Place new videos (`.mp4`) in `public/videos/`
- Place new audio (`.mp3`, `.aac`) in `public/audio/`

### Step 2: Run Optimization (Automatic)
```bash
./optimize-media.sh
```
This automatically:
- Converts videos to web-compatible H.264 format
- Converts audio to web-compatible MP3 format
- Creates optimized versions with "-web" suffix
- Copies files to deployment directories

### Step 3: Update Code References
If you're adding completely new media files:
1. Edit `server/storage.ts` to reference your new files
2. Use the "-web" versions in the file paths (e.g., `"my-new-video-web.mp4"`)

### Step 4: Deploy Preparation
```bash
./copy-assets.sh
```

## That's it! 
Your new media files will now play perfectly when deployed.

---

## Quick Reference Commands:

```bash
# Full optimization and deployment prep
./optimize-media.sh && ./copy-assets.sh

# Check what files are optimized
ls public/videos/optimized/
ls public/audio/optimized/
```

The system ensures all multimedia content will be web-optimized and play flawlessly across all browsers and devices when deployed.