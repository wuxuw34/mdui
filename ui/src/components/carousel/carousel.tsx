import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import type { MCarouselProps } from "./interface";
import {
  handleCarouselContentClassName,
  updateMultiBrowseItemWidth,
} from "./utils";
import { useMouseWheel } from "../../hooks/useMouseWheel";
import { MCarouselContext } from "./context";

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
  const carouselRef = useRef<HTMLDivElement>(null);

  useMouseWheel({
    el: carouselRef,
    callback: (x, y, e) => {
      if (y > 0) {
        toNext();
      } else if (y < 0) {
        toPrev();
      }
      e.preventDefault();
    },
  });

  useEffect(() => {
    if (contentRef.current && variant === "multi-browse") {
      updateMultiBrowseItemWidth(
        variant,
        contentRef.current,
        active,
        showNumber,
      );
    }
  }, [active, showNumber, variant]);

  function toPrev() {
    if (active === 0) {
      return;
    }
    setActive(active - 1);
  }

  function toNext() {
    if (active === React.Children.count(children) - showNumber) {
      return;
    }
    setActive(active + 1);
  }

  useEffect(() => {
    if (value !== active) {
      const set = (v: number) => {
        setActive(v);
      };
      set(value);
    }
  }, [value]);

  return (
    <MCarouselContext.Provider
      value={{
        variant,
      }}
    >
      <div
        className="mdui-carousel"
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        ref={carouselRef}
      >
        <div
          className={contentClassName}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    </MCarouselContext.Provider>
  );
}
