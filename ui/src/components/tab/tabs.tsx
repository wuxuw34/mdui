import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MTabsContext } from "./context";
import "./tabs.scss";
import { EasingFunction } from "../../contants/easing";
import { handleTabsStyle } from "./tabs-custom";
import usePointerMove from "../../hooks/usePointerMove";
import useKey from "../../hooks/useKey";

export interface MTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  variant?: "primary" | "secondary";
  onValueChange?: (value: string) => void;
}

export function MTabs(props: MTabsProps) {
  const {
    children,
    variant = "primary",
    className,
    onValueChange,
    ...rest
  } = props;
  const [indicator, setIndicator] = useState<{
    left: number;
    right: number | string;
    direction: "next" | "prev";
  }>({
    left: 0,
    right: "100%",
    direction: "next",
  });
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(props.value || "");
  const tabsStyle = useMemo(() => {
    return handleTabsStyle({
      variant,
      className,
    });
  }, [variant, className]);
  const isInitRef = useRef(false); // 是否注册了
  const [springOffset, setSpringOffset] = useState(0); // 弹簧偏移量
  const [isScrolling, setIsScrolling] = useState(false); // 是否正在滚动
  const [tabsWidth, setTabsWidth] = useState(0); // 标签栏宽度
  const cacheTabRef = useRef<
    {
      value: string;
      el: HTMLElement;
      width: number;
    }[]
  >([]);
  const { onPointerDown, ref: tabsRef } = usePointerMove({
    callback: (pos) => {
      // 横向拖动
      const RESISTANCE = 0.4;
      if (!tabsRef.current) return;
      setIsScrolling(true);
      const maxScroll =
        tabsRef.current?.scrollWidth - tabsRef.current.clientWidth;
      if (tabsRef.current?.scrollLeft <= 0 && pos.x > 0) {
        const offset = pos.x * RESISTANCE;
        setSpringOffset((prev) => prev + offset);
      } else if (tabsRef.current.scrollLeft >= maxScroll && pos.x < 0) {
        const offset = pos.x * RESISTANCE;
        setSpringOffset((prev) => prev + offset);
      } else {
        setSpringOffset(0);
        tabsRef.current?.scrollTo({
          left: tabsRef.current.scrollLeft - pos.x,
        });
      }
    },
    onPointerUp: () => {
      setSpringOffset(0);
      setIsScrolling(false);
    },
  });
  const springTimerRef = useRef<number>(0);
  useKey({
    keys: ["ArrowLeft", "ArrowRight"],
    preventDefault: false,
    callback: (key) => {
      if (key === "ArrowLeft") {
        toPrev();
      } else if (key === "ArrowRight") {
        toNext();
      }
    },
  });
  const handleKeyDown = useCallback((remove: boolean) => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
      }
    };
    if (remove) {
      window.removeEventListener("keydown", handler);
    } else {
      window.addEventListener("keydown", handler);
    }
  }, []);

  useEffect(() => {
    if (!tabsRef.current) return;
    // 监听容器宽度
    const observer = new ResizeObserver(() => {
      setTabsWidth(tabsRef.current?.scrollWidth || 0);
    });
    observer.observe(tabsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  function handleToggle(
    value: string,
    _width: number,
    el: HTMLElement,
    init?: boolean,
  ) {
    // 记录
    const index = cacheTabRef.current.findIndex((item) => item.value === value);
    const tabData = cacheTabRef.current?.[index];
    if (!tabData) {
      cacheTabRef.current.push({
        value,
        el,
        width: _width,
      });
    } else {
      tabData.width = _width;
      tabData.el = el;
    }
    if (init && isInitRef.current && value !== active) return;
    updateIndicator(value);
  }

  function toPrev() {
    const index = cacheTabRef.current.findIndex(
      (item) => item.value === active,
    );
    if (index <= 0) {
      updateSpringOffset(12);
      return;
    }
    const prev = cacheTabRef.current[index - 1];
    updateIndicator(prev.value);
  }

  function toNext() {
    const index = cacheTabRef.current.findIndex(
      (item) => item.value === active,
    );
    if (index >= cacheTabRef.current.length - 1) {
      updateSpringOffset(-12);
      return;
    }
    const next = cacheTabRef.current[index + 1];
    updateIndicator(next.value);
  }

  function updateSpringOffset(offset: number) {
    setSpringOffset((prev) => prev + offset);
    if (springTimerRef.current) {
      clearTimeout(springTimerRef.current);
      springTimerRef.current = 0;
    }
    springTimerRef.current = window.setTimeout(() => {
      setSpringOffset(0);
    }, 300);
  }

  function updateIndicator(value: string) {
    if (!tabsRef.current) return;
    const { width, el } =
      cacheTabRef.current.find((item) => item.value === value) || {};
    if (!el || !width) return;
    // 计算指示器的位置
    const rect = el.getBoundingClientRect(); // tab的尺寸数据
    // 容器的尺寸
    const tabsWidth = tabsRef.current?.offsetWidth || 0;
    const left =
      rect.left +
      rect.width / 2 -
      width / 2 -
      (tabsRef.current?.offsetLeft || 0) +
      tabsRef.current.scrollLeft; // left的偏移量
    const right = tabsWidth - left - width;
    let direction: "next" | "prev";
    if (indicator.left > left) {
      direction = "prev";
    } else {
      direction = "next";
    }
    // 设置样式
    if (isInitRef.current) {
      updateIndicatorStyle(direction);
    }
    isInitRef.current = true;
    setIndicator({
      right: right + 2,
      left: left + 2,
      direction,
    });
    setActive(value);
    onValueChange?.(value);
    // 最好滚动一下子
    tabsRef.current.scrollTo({
      left: left - rect.width,
      behavior: "smooth",
    });
  }

  function updateIndicatorStyle(direction: "next" | "prev") {
    if (!indicatorRef.current) return;
    indicatorRef.current.style.transition = `${EasingFunction.StandardDefaultSpatial}`;
    indicatorRef.current.style.transitionProperty = "left,right";
    if (direction === "next") {
      indicatorRef.current.style.transitionDelay = "80ms,0ms";
    } else {
      indicatorRef.current.style.transitionDelay = "0ms,80ms";
    }
  }

  return (
    <MTabsContext.Provider
      value={{
        toggle: handleToggle,
        active,
        variant,
      }}
    >
      <div
        className={tabsStyle.className}
        style={
          {
            "--easing": EasingFunction.StandardDefaultSpatial,
          } as React.CSSProperties
        }
        onPointerEnter={() => {
          handleKeyDown(false);
        }}
        onPointerLeave={() => handleKeyDown(true)}
        ref={tabsRef}
        onPointerDown={onPointerDown}
        {...rest}
      >
        <div
          className={`container ${isScrolling ? "is-scrolling" : ""}`}
          style={{
            transform: `translateX(${springOffset}px)`,
          }}
        >
          {children}
        </div>
        <div
          className="mdui-tabs-indicator bg"
          style={{
            width: tabsWidth,
          }}
        ></div>
        <div
          className="mdui-tabs-indicator active"
          style={{
            right: indicator.right,
            left: indicator.left,
            transform: `translateX(${springOffset}px)`,
          }}
          ref={indicatorRef}
        ></div>
      </div>
    </MTabsContext.Provider>
  );
}
