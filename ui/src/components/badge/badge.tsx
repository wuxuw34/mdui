import "./index.scss";
import { MRipple } from "../ripple";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export interface MBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  variant?: "small" | "large";
  showValue?: boolean;
}

export default function MBadge({
  value,
  className,
  children,
  variant = "small",
  showValue = true,
  style,
  ...rest
}: MBadgeProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const [countWidth, setCountWidth] = useState(0);

  useEffect(() => {
    const updateCountWidth = () => {
      if (countRef.current) {
        setCountWidth(countRef.current.offsetWidth);
      }
    };
    updateCountWidth();
  }, []);

  return (
    <MRipple>
      <div
        className={clsx("mdui-badge", className, variant)}
        style={
          {
            "--width": countWidth / 2 + "px",
            ...style,
          } as React.CSSProperties
        }
        {...rest}
      >
        <div className={clsx("mdui-badge__content")}>
          {children}
          <div className={clsx("mdui-badge__count", variant)}>
            {value && showValue && (
              <div
                className="number"
                style={{
                  display: variant === "small" ? "none" : "flex",
                }}
                ref={countRef}
              >
                {value > 999 ? "999+" : value}
              </div>
            )}
          </div>
        </div>
      </div>
    </MRipple>
  );
}
