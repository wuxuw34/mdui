import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import type { MCarouselProps } from "./interface";
import {
  handleCarouselContentClassName,
  updateMultiBrowseItemWidth,
} from "./utils";

export default function MCarousel({
  variant = "multi-browse",
  children,
  showNumber = 3,
  value = 0,
}: MCarouselProps) {
  const [active, setActive] = useState(value); // 当前激活的索引
  const contentRef = useRef<HTMLDivElement>(null);
  const contentClassName = useMemo(() => {
    return handleCarouselContentClassName({
      variant,
      size: 0,
    });
  }, [variant]);

  useEffect(() => {
    if (contentRef.current) {
      updateMultiBrowseItemWidth(contentRef.current, active, showNumber);
    }
  }, [active, showNumber]);

  useEffect(() => {
    if (value !== active) {
      const set = (v: number) => {
        setActive(v);
      };
      set(value);
    }
  }, [value]);

  return (
    <div
      className="mdui-carousel"
      onPointerDown={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={contentClassName}
        ref={contentRef}
      >
        {React.Children.map(children, (child) => (
          <div className={"mdui-carousel-item "}>
            <div className="container">{child}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
