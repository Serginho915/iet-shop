import { useRef, useState, useEffect } from 'react';

interface ScrollOptions {
  cardHeight: number;
  gap: number;
}

export const useVerticalScroll = (options: ScrollOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        setIsScrollable(containerRef.current.scrollHeight > containerRef.current.clientHeight);
      }
    };

    checkScrollable();

    // Also re-check on window resize
    window.addEventListener('resize', checkScrollable);

    // Re-check after a brief delay to ensure content is rendered
    const timer = setTimeout(checkScrollable, 100);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      clearTimeout(timer);
    };
  }, []);

  const scrollNext = () => {
    if (containerRef.current) {
      const { cardHeight, gap } = options;
      const container = containerRef.current;
      const scrollAmount = cardHeight + gap;

      const isAtBottom =
        container.scrollTop + container.clientHeight >= container.scrollHeight - 20;

      if (isAtBottom) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return { containerRef, scrollNext, isScrollable };
};