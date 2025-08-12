# Deployment Instructions for Siwaht

## Issue: Videos and Audio Files Not Showing in Deployed App

The videos and audio files need to be properly included in the production build. Follow these steps to ensure successful deployment:

### Step 1: Run the Build Script
Before deploying, run the build script that includes assets:

```bash
./build-with-assets.sh
```

This script will:
1. Copy all video and audio files to `client/public/`
2. Build the application with Vite
3. Verify that assets are included in the build output

### Step 2: Verify Assets in Build
After running the build script, verify the assets are included:

```bash
ls -la dist/public/videos/
ls -la dist/public/audio/
```

You should see all video and audio files in these directories.

### Step 3: Deploy
Click the Deploy button in Replit. The deployment will use the pre-built assets from the `dist/` directory.

### Troubleshooting

If videos/audio still don't show after deployment:

1. **Check if build was run**: Ensure `./build-with-assets.sh` was executed before deployment
2. **Check environment variables**: The production environment should automatically detect `NODE_ENV=production`
3. **Check console logs**: Look for `[ASSET SERVING]` debug messages in deployment logs

### How It Works

- **Development**: Serves assets from `public/videos/` and `public/audio/`
- **Production**: Serves assets from `dist/public/videos/` and `dist/public/audio/`
- **Environment Detection**: Uses `process.env.NODE_ENV` to determine the correct path
- **Debug Logging**: Console logs show which paths are being used

### Important Notes

- Always run `./build-with-assets.sh` before deploying
- The `copy-assets.sh` script ensures assets are copied to the client directory before build
- All video files (MP4) and audio files (MP3, AAC) are included with proper MIME types
- Byte-range support is enabled for smooth video playback