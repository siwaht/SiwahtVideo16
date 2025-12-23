export async function onRequestGet() {
    const mediaData = [
        {
            "id": "gumlet-video-1",
            "title": "Custom AI Video Ad",
            "category": "AI Video Studio",
            "description": "High-quality AI generated video advertisement with cinematic visuals and professional dubbing.",
            "fileType": "video",
            "originalFilename": "gumlet-video",
            "compressedFilePath": "https://gumlet.tv/watch/694a95d0f1ad267a062e8b2d/",
            "duration": "15",
            "fileSize": "External",
            "createdAt": "2024-05-24T13:45:09.070Z",
            "updatedAt": "2024-05-24T13:45:09.070Z"
        },
        {
            "id": "df0da771-3931-4c7b-9802-9176e730fe8c",
            "title": "English Voice Ad",
            "category": "Professional Multilingual Voice Ads",
            "description": "Professional English voice ad showcasing premium brand messaging and clear articulation for global markets.",
            "fileType": "audio",
            "originalFilename": "dub-original-english-web.mp3",
            "compressedFilePath": "/audio/dub-original-english-web.mp3",
            "duration": "27",
            "fileSize": "432000",
            "createdAt": "2025-08-24T13:45:09.070Z",
            "updatedAt": "2025-08-24T13:45:09.071Z"
        },
        {
            "id": "ccac16e6-8981-43bc-862a-4f174d3edb0e",
            "title": "中文语音广告",
            "category": "Professional Multilingual Voice Ads",
            "description": "专业的中文语音广告，展现品牌优势和清晰表达，适合中国市场推广.",
            "fileType": "audio",
            "originalFilename": "dub-original-chinese-web.mp3",
            "compressedFilePath": "/audio/dub-original-chinese-web.mp3",
            "duration": "27",
            "fileSize": "432000",
            "createdAt": "2025-08-24T13:45:09.071Z",
            "updatedAt": "2025-08-24T13:45:09.071Z"
        },
        {
            "id": "a0d56ce2-b588-4104-851a-1a07667a3454",
            "title": "Japanese Market Vision",
            "category": "AI Video Studio",
            "fileType": "video",
            "originalFilename": "japenese market.mp4",
            "compressedFilePath": "/uploads/compressed/japenese market-1756063764778-cf09a141.mp4",
            "thumbnailPath": "/uploads/thumbnails/japenese market-1756063764778-cf09a141.jpg",
            "duration": "8",
            "fileSize": "2164029",
            "createdAt": "2025-08-24T19:29:31.454Z",
            "updatedAt": "2025-08-24T19:29:31.454Z"
        }
    ];

    return new Response(JSON.stringify(mediaData), {
        headers: { "Content-Type": "application/json" }
    });
}
