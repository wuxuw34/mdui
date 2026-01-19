import { useEffect } from "react";

export default function useKey(options?: {
  keys?: string[];
  callback?: (key: string) => void;
  preventDefault?: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (options?.preventDefault) {
        e.preventDefault();
      }
      const { key } = e;
      if (options?.keys?.includes(key) || !options?.keys) {
        options?.callback?.(key);
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [options]);
}
