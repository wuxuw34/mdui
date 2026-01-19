import { useEffect, useMemo, useRef, useState } from "react";
import { MTabsContext } from "./context";
import "./tabs.scss";
import { EasingFunction } from "../../contants/easing";
import { handleTabsStyle } from "./tabs-custom";

export interface MTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  variant?: "primary" | "secondary";
}

export function MTabs(props: MTabsProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const [indicator, setIndicator] = useState<{
    left: number;
    right: number | string;
    direction: "next" | "prev";
  }>({
    left: 0,
    right: "100%",
    direction: "next",
  });
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(props.value || "");
  const tabsStyle = useMemo(() => {
    return handleTabsStyle({
      variant,
      className,
    });
  }, [variant, className]);
  const isInitRef = useRef(false); // 是否注册了

  function handleToggle(
    value: string,
    _width: number,
    el: HTMLElement,
    init?: boolean,
  ) {
    if (init && isInitRef.current) return;

    const width = _width - 4;
    // 计算指示器的位置
    const rect = el.getBoundingClientRect(); // tab的尺寸数据
    // 容器的尺寸
    const tabsWidth = tabsRef.current?.offsetWidth || 0;
    const left = rect.left + rect.width / 2 - width / 2; // left的偏移量
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
      right,
      left,
      direction,
    });
    setActive(value);
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
      }}
    >
      <div
        className={tabsStyle.className}
        style={
          {
            "--easing": EasingFunction.StandardDefaultSpatial,
          } as React.CSSProperties
        }
        ref={tabsRef}
      >
        {children}
        <div
          className="mdui-tabs-indicator"
          style={{
            right: indicator.right,
            left: indicator.left,
          }}
          ref={indicatorRef}
        ></div>
      </div>
    </MTabsContext.Provider>
  );
}
