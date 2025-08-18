# 📹 How to Replace Audio & Video Demos

This guide explains how to easily replace the media files (videos and audio) displayed on your Siwaht website directly within Replit.

## 🚀 Quick Steps

### 1. Upload Your Media Files
1. Open the **Files** panel in Replit (left sidebar)
2. Navigate to the appropriate folder:
   - **Videos**: `public/videos/`
   - **Audio**: `public/audio/`
3. Click the **three dots** menu in the folder and select **Upload file**
4. Upload your new media files

### 2. Update the Configuration
1. Open the file `public/media-config.json`
2. Find the section for the media you want to replace:
   - `videoAds` - for AI Video Ads section
   - `avatars` - for AI Avatars section
   - `voiceSamples` - for Voice Synthesis section
   - `editedVideos` - for Video Editing section
   - `podcasts` - for Podcast Production section
3. Update the relevant fields (see examples below)
4. Save the file

### 3. Restart the Application
1. Click the **Stop** button in the console
2. Click **Run** again
3. Your new media will now be displayed!

## 📝 Configuration Examples

### Replacing a Video Ad
```json
{
  "videoAds": [
    {
      "id": "keep-the-same-id",
      "title": "Your New Video Title",
      "description": "Description of your video",
      "videoUrl": "/videos/your-new-video.mp4",
      "category": "commercial"
    }
  ]
}
```

### Replacing a Voice Sample
```json
{
  "voiceSamples": [
    {
      "id": "keep-the-same-id",
      "name": "Your Voice Sample Name",
      "description": "Description of the voice sample",
      "audioUrl": "/audio/your-new-audio.mp3",
      "language": "English",
      "gender": "professional",
      "accent": "native",
      "ageRange": "adult"
    }
  ]
}
```

### Replacing an Avatar Video
```json
{
  "avatars": [
    {
      "id": "keep-the-same-id",
      "name": "Your Avatar Name",
      "description": "Avatar description",
      "videoUrl": "/videos/your-avatar-video.mp4",
      "gender": "male",
      "ethnicity": "diverse",
      "ageRange": "25-35"
    }
  ]
}
```

## ⚠️ Important Notes

1. **Keep the IDs**: Don't change the `id` field values - these are used internally
2. **File Paths**: Always start paths with `/videos/` or `/audio/`
3. **File Formats**: 
   - Videos: Use `.mp4` format for best compatibility
   - Audio: Use `.mp3` format for best compatibility
4. **File Names**: Avoid spaces in filenames (use hyphens instead)
5. **File Size**: Keep files under 10MB for optimal loading speed

## 💡 Tips for Best Results

- **Video Optimization**: Use H.264 codec for videos for best browser compatibility
- **Audio Quality**: Use 128kbps bitrate for audio files to balance quality and file size
- **Thumbnails**: Videos will auto-play as previews, so make sure the first frame looks good
- **Descriptions**: Keep descriptions concise but informative

## 🔄 Multiple Items

You can have multiple items in each section. Just add more objects to the arrays:

```json
{
  "videoAds": [
    {
      "id": "item-1",
      "title": "First Video",
      "videoUrl": "/videos/first.mp4"
    },
    {
      "id": "item-2", 
      "title": "Second Video",
      "videoUrl": "/videos/second.mp4"
    }
  ]
}
```

## ❓ Need Help?

If you encounter any issues:
1. Check that your file paths are correct
2. Ensure JSON syntax is valid (no missing commas or brackets)
3. Verify media files are in the correct folders
4. Check the console for any error messages

That's it! You can now easily update your site's media content without touching any code.