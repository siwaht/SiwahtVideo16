#!/usr/bin/env node

/**
 * Deployment Preparation Script for Siwaht
 * Automatically optimizes media files and prepares assets for deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Siwaht for deployment...\n');

// Step 1: Check if FFmpeg is available
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  console.log('✅ FFmpeg is available');
} catch (error) {
  console.log('❌ FFmpeg not found. Installing...');
  try {
    execSync('npm run install-deps', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (installError) {
    console.error('❌ Failed to install dependencies:', installError.message);
    process.exit(1);
  }
}

// Step 2: Run media optimization
console.log('\n📹 Optimizing media files...');
try {
  execSync('./optimize-media.sh', { stdio: 'inherit' });
  console.log('✅ Media optimization complete');
} catch (error) {
  console.error('❌ Media optimization failed:', error.message);
  process.exit(1);
}

// Step 3: Verify all web-optimized files exist
console.log('\n🔍 Verifying optimized files...');
const requiredVideos = [
  'ikea-demo-new-web.mp4',
  'artisan-baker-avatar-web.mp4',
  'dairy-farmer-new-web.mp4'
];

const requiredAudio = [
  'context-is-king-web.mp3',
  'fasten-your-nightmares-web.mp3',
  'dub-original-english-web.mp3',
  'dub-original-chinese-web.mp3',
  'dub-arabic-web.mp3'
];

let allFilesReady = true;

// Check videos
requiredVideos.forEach(video => {
  const videoPath = path.join('client/public/videos', video);
  if (fs.existsSync(videoPath)) {
    console.log(`✅ ${video}`);
  } else {
    console.log(`❌ Missing: ${video}`);
    allFilesReady = false;
  }
});

// Check audio
requiredAudio.forEach(audio => {
  const audioPath = path.join('client/public/audio', audio);
  if (fs.existsSync(audioPath)) {
    console.log(`✅ ${audio}`);
  } else {
    console.log(`❌ Missing: ${audio}`);
    allFilesReady = false;
  }
});

if (allFilesReady) {
  console.log('\n🎉 All media files are web-optimized and ready for deployment!');
  console.log('💡 Your Siwaht website will now play all multimedia content flawlessly.');
} else {
  console.log('\n⚠️  Some media files are missing. Please check the optimization process.');
  process.exit(1);
}