import { useEffect, useRef } from "react";

interface UseResizeObserverOptions<T> {
  ref: React.RefObject<T | null>;
  onResize?: (rect: DOMRectReadOnly) => void;
}

export default function useResizeObserver<T extends HTMLElement>(options: UseResizeObserverOptions<T>) {
  const { ref, onResize } = options;
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    observerRef.current = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const rect = entries[0].contentRect;
        onResize?.(rect);
      }
    })
    observerRef.current.observe(ref.current);
    return () => {
      observerRef.current?.disconnect();
    }
  }, [onResize, ref]);
}