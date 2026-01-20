import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import type { MCarouselProps } from "./interface";
import {
  handleCarouselContentClassName,
  updateMultiBrowseItemWidth,
  updateUncontainedOffset,
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
  if (variant === "hero") {
    variant = "multi-browse";
    showNumber = 2;
  }
  const contentClassName = useMemo(() => {
    return handleCarouselContentClassName({
      variant,
      size: 0,
    });
  }, [variant]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState<
    "left" | "right" | undefined
  >();

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
    if (contentRef.current) {
      if (variant === "multi-browse") {
        updateMultiBrowseItemWidth(contentRef.current, active, showNumber);
      } else if (variant === "uncontained" && carouselRef.current) {
        updateUncontainedOffset(
          carouselRef.current,
          contentRef.current,
          active,
        );
      }
    }
  }, [active, showNumber, variant]);

  function toPrev() {
    if (active === 0) {
      return;
    }
    setIsScrolling("left");
    setActive(active - 1);
  }

  function toNext() {
    const limit =
      variant === "multi-browse"
        ? React.Children.count(children) - showNumber
        : React.Children.count(children);
    if (active + 1 >= limit) {
      return;
    }
    setIsScrolling("right");
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
        scroll: isScrolling,
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
