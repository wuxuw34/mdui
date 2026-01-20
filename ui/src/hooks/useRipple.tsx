import { useEffect, useState, type RefObject } from "react";
import "./ripple.css";

interface Ripple {
  x: number;
  y: number;
  size: number;
}

interface RippleOptions {
  auto?: boolean;
  className?: string;
  callback?: (ripple: Ripple) => void;
  container?: RefObject<HTMLElement | null>;
  color?: string;
}

export default function useRipple(
  ref: RefObject<HTMLElement | null>,
  options: RippleOptions,
) {
  const [enabled, setEnabled] = useState(true); // 是否启用
  const { auto = true, className, callback, container } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    // 监听点击事件
    const clickHandler = (e: MouseEvent) => {
      if (!enabled) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - rippleSize / 2;
      const y = e.clientY - rect.top - rippleSize / 2;
      const ripple: Ripple = {
        x,
        y,
        size: rippleSize,
      };
      if (callback) {
        callback(ripple);
      }
      if (auto) {
        const rippleElement = document.createElement("div");
        rippleElement.classList.add("ripple");
        rippleElement.style.left = `${x}px`;
        rippleElement.style.top = `${y}px`;
        rippleElement.style.width = `${rippleSize}px`;
        rippleElement.style.height = `${rippleSize}px`;
        rippleElement.classList.add(...(className?.split(" ") || []));
        rippleElement.style.backgroundColor =
          options.color || "rgb(0, 0, 0, 0.12)";
        const c = container?.current || el;
        c.insertBefore(rippleElement, c.firstChild);
        rippleElement.addEventListener("animationend", () => {
          rippleElement.remove();
        });
      }
    };

    // 点击事件绑定
    el.addEventListener("click", clickHandler);

    // 组件卸载时移除事件监听
    return () => {
      el.removeEventListener("click", clickHandler);
    };
  }, [ref, callback, className, auto, enabled]);

  return {
    enabled,
    setEnabled,
  };
}
