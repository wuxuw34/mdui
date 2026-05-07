import { useState } from "react";
import "./index.scss";
import clsx from "clsx";

export interface MBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  variant?: "small" | "large";
  show?: boolean;
}

export default function MBadge({
  value,
  className,
  children,
  variant = "small",
  show = true,
  style,
  ...rest
}: MBadgeProps) {
  const [marginRight, setMarginRight] = useState(0);

  return (
    <div
      className={clsx("mdui-badge", className, variant)}
      style={
        {
          marginRight: marginRight,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
      <div
        className={clsx("mdui-badge__count", variant)}
        ref={(ref) => {
          if (ref && variant === "large") {
            const rect = ref.getBoundingClientRect();
            setMarginRight(rect.width - 14);
          }
        }}
      >
        {value && show && (
          <div
            className="number"
            style={{
              display: variant === "small" ? "none" : "flex",
            }}
          >
            {value > 999 ? "999+" : value}
          </div>
        )}
      </div>
    </div>
  );
}
