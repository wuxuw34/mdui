import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

interface Position {
  x: number;
  y: number;
}

export default function useDraggable<T = HTMLDivElement>(
  containerRef: RefObject<HTMLElement | null>,
  initPos?: Position = {
    x: 0,
    y: 0,
  },
) {
  const targetRef = useRef<T>(null);
  const isDragging = useRef(false); // 是否处于拖动状态
  const startPos = useRef<Position>({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState<Position>(initPos);
  const onPointerUpRef = useRef<(e: PointerEvent) => void>(null);

  const updatePosition = useCallback(
    (x: number, y: number) => {
      window.requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const newX = x - containerRect.left;
        const newY = y - containerRect.top;
        const _x = (newX / containerRect.width) * 100;
        const _y = (newY / containerRect.height) * 100;
        const resetValue = (v: number) => {
          return Math.max(0, Math.min(100, v));
        };
        setPosition({
          x: resetValue(_x),
          y: resetValue(_y),
        });
      });
    },
    [containerRef],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current || !targetRef.current) return;
      updatePosition(e.clientX, e.clientY);
    },
    [updatePosition],
  );

  const onPointerUp = useCallback(
    (e: PointerEvent) => {
      window.removeEventListener("pointermove", onPointerMove);
      if (onPointerUpRef.current) {
        window.removeEventListener("pointerup", onPointerUpRef.current);
      }
      if (targetRef.current) {
        (targetRef.current as unknown as HTMLElement).releasePointerCapture(
          e.pointerId,
        );
      }
    },
    [onPointerMove],
  );

  useEffect(() => {
    onPointerUpRef.current = onPointerUp;
  }, [onPointerUp]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const el = targetRef.current as HTMLElement;
      if (!el) return;
      isDragging.current = true;
      el.setPointerCapture(e.pointerId);
      // 记录初始位置
      startPos.current = {
        x: e.clientX,
        y: e.clientY,
      };
      window.addEventListener("pointermove", onPointerMove, {
        passive: false,
      });
      if (onPointerUpRef.current) {
        window.addEventListener("pointerup", onPointerUpRef.current);
      }
    },
    [onPointerMove],
  );

  const onContainerPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      updatePosition(e.clientX, e.clientY);
      // e.stopPropagation();
      // 按下后，可以继续拖动
      onPointerDown(e);
    },
    [onPointerDown, updatePosition],
  );

  return {
    targetRef,
    onPointerDown,
    position,
    onContainerPointerDown,
  };
}
