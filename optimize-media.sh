#!/bin/bash

# Media Optimization Script for Siwaht
# Automatically converts audio and video files to web-optimized formats

echo "🎬 Starting media optimization process..."

# Function to optimize a single video file
optimize_video() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file" .mp4)
    local output_file="$output_dir/${filename}-web.mp4"
    
    echo "🎥 Optimizing video: $filename"
    
    # Convert to web-optimized H.264 with faststart flag
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset fast \
        -crf 23 \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -pix_fmt yuv420p \
        "$output_file" \
        -y -loglevel warning
    
    if [ $? -eq 0 ]; then
        echo "✅ Video optimized: ${filename}-web.mp4"
        return 0
    else
        echo "❌ Failed to optimize video: $filename"
        return 1
    fi
}

# Function to optimize a single audio file
optimize_audio() {
    local input_file="$1"
    local output_dir="$2"
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local output_file="$output_dir/${name}-web.mp3"
    
    echo "🎵 Optimizing audio: $name"
    
    # Convert to web-optimized MP3 with consistent bitrate
    ffmpeg -i "$input_file" \
        -c:a libmp3lame \
        -b:a 128k \
        "$output_file" \
        -y -loglevel warning
    
    if [ $? -eq 0 ]; then
        echo "✅ Audio optimized: ${name}-web.mp3"
        return 0
    else
        echo "❌ Failed to optimize audio: $name"
        return 1
    fi
}

# Create optimized directories
mkdir -p public/videos/optimized public/audio/optimized client/public/videos client/public/audio

# Process all video files
echo "📁 Processing video files..."
video_count=0
for video_file in public/videos/*.mp4; do
    if [ -f "$video_file" ] && [[ ! "$video_file" == *"-web.mp4" ]]; then
        optimize_video "$video_file" "public/videos/optimized"
        ((video_count++))
    fi
done

# Process all audio files
echo "📁 Processing audio files..."
audio_count=0
for audio_file in public/audio/*.mp3 public/audio/*.aac; do
    if [ -f "$audio_file" ] && [[ ! "$audio_file" == *"-web.mp3" ]]; then
        optimize_audio "$audio_file" "public/audio/optimized"
        ((audio_count++))
    fi
done

# Copy optimized files to main directories and client
echo "📂 Copying optimized files..."
cp public/videos/optimized/*-web.mp4 public/videos/ 2>/dev/null
cp public/audio/optimized/*-web.mp3 public/audio/ 2>/dev/null
cp public/videos/optimized/*-web.mp4 client/public/videos/ 2>/dev/null
cp public/audio/optimized/*-web.mp3 client/public/audio/ 2>/dev/null

echo ""
echo "🎉 Media optimization complete!"
echo "   📊 Videos processed: $video_count"
echo "   📊 Audio files processed: $audio_count"
echo ""
echo "💡 All media files are now web-optimized with:"
echo "   🎥 Videos: H.264 codec, yuv420p format, faststart flag"
echo "   🎵 Audio: MP3 format, 128kbps bitrate"
echo ""
echo "🚀 Files are ready for deployment!"