import { useEffect, useState } from 'react';

interface UseIframeVisibilityOptions {
  threshold?: number;
  hideWhenNotVisible?: boolean;
}

/**
 * Hook to manage iframe visibility and optionally hide iframes when not in view
 * This effectively "pauses" external media players by hiding them
 */
export function useIframeVisibility(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  options: UseIframeVisibilityOptions = {}
) {
  const {
    threshold = 0.3,
    hideWhenNotVisible = true
  } = options;
  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const iframeElement = iframeRef.current;
    if (!iframeElement || !hideWhenNotVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting;
          setIsVisible(visible);
          
          if (visible) {
            // Show iframe when visible
            iframeElement.style.display = 'block';
          } else {
            // Hide iframe when not visible (effectively pauses external players)
            iframeElement.style.display = 'none';
          }
        });
      },
      { threshold }
    );

    observer.observe(iframeElement);

    return () => {
      observer.disconnect();
      // Restore visibility on cleanup
      iframeElement.style.display = 'block';
    };
  }, [iframeRef, threshold, hideWhenNotVisible]);

  return { isVisible };
}