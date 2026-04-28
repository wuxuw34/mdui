import type { MBottomSheetProps } from "./interface";
import "./bottom.scss";
import clsx from "clsx";
import usePointerMove from "../../hooks/usePointerMove";
import { useEffect, useRef, useState } from "react";

export default function MBottomSheet({
  children,
  show = false,
  onShowChange,
}: MBottomSheetProps) {
  const [open, setOpen] = useState(show);
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const { onPointerDown } = usePointerMove({
    callback(position, prevPos, initPos) {
      const offset = prevPos.y - initPos.y;
      if (offset > 0) {
        offsetRef.current = offset;
        setOffset(offset);
      }
    },
    onPointerUp() {
      const time = performance.now() - timeRef.current;
      const rect = containerRef.current?.getBoundingClientRect();
      if (
        rect &&
        (time > 300 || offsetRef.current <= 20) &&
        offsetRef.current < rect.height / 2
      ) {
        // 恢复
        setOffset(0);
      } else {
        setOpen(false);
        setOffset(0);
        onShowChange(false);
      }
      offsetRef.current = 0;
      timeRef.current = performance.now();
    },
    onPointerDown(e) {
      e.stopPropagation();
      e.preventDefault();
      timeRef.current = performance.now();
    },
  });

  useEffect(() => {
    const updateOpen = () => {
      setOpen(show);
    };
    updateOpen();
  }, [show]);

  return (
    <div
      className={clsx("mdui-bottom-sheet", {
        open,
      })}
      ref={containerRef}
      style={
        {
          "--offset": `${offset}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="mdui-bottom-sheet__header"
        onPointerDown={onPointerDown}
      ></div>
      <div className="mdui-bottom-sheet__content">{children}</div>
    </div>
  );
}
