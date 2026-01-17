import {
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
  callback?: (p: Position) => void,
) {
  const targetRef = useRef<T>(null);
  const isDragging = useRef(false); // 是否处于拖动状态
  const startPos = useRef<Position>({
    x: 0,
    y: 0,
  });
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const pos = useRef<Position>({
    x: 0,
    y: 0,
  });
  const onPointerUpRef = useRef<(e: PointerEvent) => void>(null);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current || !targetRef.current) return;
      window.requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const newX = e.clientX - containerRect.left;
        const newY = e.clientY - containerRect.top;
        const _x = (newX / containerRect.width) * 100;
        const _y = (newY / containerRect.height) * 100;
        setPosition({
          x: _x,
          y: _y,
        });
      });
    },
    [containerRef],
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
      window.addEventListener("pointermove", onPointerMove);
      if (onPointerUpRef.current) {
        window.addEventListener("pointerup", onPointerUpRef.current);
      }
    },
    [onPointerMove],
  );

  return {
    targetRef,
    onPointerDown,
    position,
  };
}
