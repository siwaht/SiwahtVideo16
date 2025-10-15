/**
 * Utility to automatically pause all media elements (video and audio) when they scroll out of view
 * This provides a global solution for auto-pause functionality across the entire application
 */

let globalObserver: IntersectionObserver | null = null;
const observedElements = new Set<HTMLMediaElement>();

interface MediaState {
  wasPlaying: boolean;
  shouldAutoResume: boolean;
}

const mediaStates = new WeakMap<HTMLMediaElement, MediaState>();

export function initializeAutoPauseMedia() {
  if (globalObserver) return; // Already initialized

  // Wait for custom elements to be defined before initializing
  const initAfterDelay = () => {
    globalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const media = entry.target as HTMLMediaElement;
          const isVisible = entry.isIntersecting;

          if (!media || !(media instanceof HTMLVideoElement || media instanceof HTMLAudioElement)) {
            return;
          }

          const state = mediaStates.get(media) || { wasPlaying: false, shouldAutoResume: false };

          if (isVisible) {
            // Media is visible
            if (state.shouldAutoResume && media.paused) {
              media.play().catch((error) => {
                console.log('Auto-resume failed:', error);
              });
              state.shouldAutoResume = false;
            }
          } else {
            // Media is not visible
            if (!media.paused) {
              state.wasPlaying = true;
              state.shouldAutoResume = true;
              media.pause();
              console.log('Auto-paused media:', media.src || media.currentSrc);
            }
          }

          mediaStates.set(media, state);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all existing media elements
    startObservingAllMedia();

  // Set up mutation observer to catch dynamically added media
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;

          // Skip if this is a custom element that might contain widget audio
          if (element.tagName?.toLowerCase() === 'elevenlabs-convai') {
            console.log('Skipping mutation observer for elevenlabs-convai custom element');
            return;
          }

          // Check if the added node is a media element
          if (element.tagName === 'VIDEO' || element.tagName === 'AUDIO') {
            observeMediaElement(element as HTMLMediaElement);
          }
          // Also check for media elements within the added node
          // But don't traverse into custom elements that might be widgets
          if (!element.tagName?.toLowerCase().includes('-')) {
            const mediaElements = element.querySelectorAll('video, audio');
            mediaElements.forEach((media) => {
              observeMediaElement(media as HTMLMediaElement);
            });
          }
        }
      });
    });
  });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  };

  // Check if elevenlabs-convai is already defined, otherwise wait
  if (customElements.get('elevenlabs-convai')) {
    console.log('ElevenLabs widget already defined, initializing auto-pause immediately');
    initAfterDelay();
  } else {
    console.log('Waiting for ElevenLabs widget to be defined before initializing auto-pause');
    // Wait a bit for the widget script to load, then initialize
    setTimeout(() => {
      initAfterDelay();
    }, 1000);
  }
}

function startObservingAllMedia() {
  const allMedia = document.querySelectorAll('video, audio');
  allMedia.forEach((media) => {
    observeMediaElement(media as HTMLMediaElement);
  });
}

function isWidgetElement(element: HTMLElement): boolean {
  let current: HTMLElement | null = element;

  while (current) {
    if (current.tagName?.toLowerCase() === 'elevenlabs-convai') {
      return true;
    }

    if (current.hasAttribute('data-exclude-autopause')) {
      return true;
    }

    if (current.classList?.contains('widget-audio-container')) {
      return true;
    }

    current = current.parentElement;
  }

  const rootNode = element.getRootNode();
  if (rootNode !== document && rootNode instanceof ShadowRoot) {
    const host = rootNode.host;
    if (host && host.tagName?.toLowerCase() === 'elevenlabs-convai') {
      return true;
    }

    if (host && host.closest('[data-exclude-autopause]')) {
      return true;
    }

    if (host && host.closest('.widget-audio-container')) {
      return true;
    }
  }

  if (element instanceof HTMLMediaElement) {
    const src = element.src || element.currentSrc;
    if (src && (src.includes('elevenlabs.io') || src.includes('elevenlabs.ai'))) {
      return true;
    }
  }

  return false;
}

function observeMediaElement(media: HTMLMediaElement) {
  if (observedElements.has(media) || !globalObserver) return;

  if (isWidgetElement(media)) {
    console.log('Skipping auto-pause for widget audio element:', media.src || media.currentSrc || 'unknown source');
    return;
  }

  console.log('Observing media element:', media.tagName, media.src || media.currentSrc || 'unknown source');
  observedElements.add(media);
  globalObserver.observe(media);

  // Initialize state
  mediaStates.set(media, { wasPlaying: false, shouldAutoResume: false });
}

export function cleanupAutoPauseMedia() {
  if (globalObserver) {
    globalObserver.disconnect();
    globalObserver = null;
  }
  observedElements.clear();
}