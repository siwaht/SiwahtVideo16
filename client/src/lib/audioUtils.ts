// Audio URL processing utilities for multiple hosting platforms

export interface ProcessedAudioUrl {
  embedUrl: string;
  platform: 'soundcloud' | 'spotify' | 'apple' | 'direct' | 'unknown';
  canEmbed: boolean;
  originalUrl: string;
}

/**
 * Process audio URLs from various platforms and convert them to embeddable formats
 */
export function processAudioUrl(url: string): ProcessedAudioUrl {
  if (!url) {
    return {
      embedUrl: '',
      platform: 'unknown',
      canEmbed: false,
      originalUrl: url
    };
  }

  const normalizedUrl = url.trim();

  // SoundCloud processing
  if (normalizedUrl.includes('soundcloud.com')) {
    return {
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(normalizedUrl)}&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`,
      platform: 'soundcloud',
      canEmbed: true,
      originalUrl: normalizedUrl
    };
  }

  // Spotify processing
  if (normalizedUrl.includes('spotify.com')) {
    let spotifyId = '';
    let spotifyType = 'track';

    if (normalizedUrl.includes('/track/')) {
      spotifyId = normalizedUrl.split('/track/')[1]?.split('?')[0];
      spotifyType = 'track';
    } else if (normalizedUrl.includes('/episode/')) {
      spotifyId = normalizedUrl.split('/episode/')[1]?.split('?')[0];
      spotifyType = 'episode';
    } else if (normalizedUrl.includes('/show/')) {
      spotifyId = normalizedUrl.split('/show/')[1]?.split('?')[0];
      spotifyType = 'show';
    }

    if (spotifyId) {
      return {
        embedUrl: `https://open.spotify.com/embed/${spotifyType}/${spotifyId}?utm_source=generator&theme=0`,
        platform: 'spotify',
        canEmbed: true,
        originalUrl: normalizedUrl
      };
    }
  }

  // Apple Podcasts/Music processing
  if (normalizedUrl.includes('podcasts.apple.com') || normalizedUrl.includes('music.apple.com')) {
    // Apple embeds use the same URL with /embed added
    const embedUrl = normalizedUrl.replace('podcasts.apple.com', 'embed.podcasts.apple.com')
                                   .replace('music.apple.com', 'embed.music.apple.com');
    return {
      embedUrl: embedUrl,
      platform: 'apple',
      canEmbed: true,
      originalUrl: normalizedUrl
    };
  }

  // Direct audio file URLs (mp3, wav, ogg, aac, m4a)
  if (normalizedUrl.match(/\.(mp3|wav|ogg|aac|m4a|flac|webm)(\?.*)?$/i)) {
    return {
      embedUrl: normalizedUrl,
      platform: 'direct',
      canEmbed: true,
      originalUrl: normalizedUrl
    };
  }

  // Unknown or unsupported platform - try as direct audio
  return {
    embedUrl: normalizedUrl,
    platform: 'direct',
    canEmbed: true,
    originalUrl: normalizedUrl
  };
}

/**
 * Get a human-readable platform name
 */
export function getAudioPlatformName(platform: ProcessedAudioUrl['platform']): string {
  switch (platform) {
    case 'soundcloud':
      return 'SoundCloud';
    case 'spotify':
      return 'Spotify';
    case 'apple':
      return 'Apple';
    case 'direct':
      return 'Audio';
    default:
      return 'Unknown';
  }
}

/**
 * Check if a URL is a supported audio platform
 */
export function isSupportedAudioPlatform(url: string): boolean {
  const processed = processAudioUrl(url);
  return processed.canEmbed;
}
