import { useMemo, useState } from "react";
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
  const [indicator, setIndicator] = useState({
    width: 0,
    left: 0,
  });
  const [active, setActive] = useState(props.value || "");
  const tabsStyle = useMemo(() => {
    return handleTabsStyle({
      variant,
      className,
    });
  }, [variant, className]);

  function handleToggle(value: string, _width: number, el: HTMLElement) {
    const width = _width - 4;
    // 计算指示器的位置
    const rect = el.getBoundingClientRect(); // tab的尺寸数据
    const left = rect.left + rect.width / 2 - width / 2; // left的偏移量
    setIndicator({
      width,
      left,
    });
    setActive(value);
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
            "--easing": EasingFunction.ExpressiveFastSpatial,
          } as React.CSSProperties
        }
      >
        {children}
        <div
          className="mdui-tabs-indicator"
          style={{
            width: indicator.width,
            left: indicator.left,
          }}
        ></div>
      </div>
    </MTabsContext.Provider>
  );
}
