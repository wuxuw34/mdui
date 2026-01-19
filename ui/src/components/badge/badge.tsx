import { useMemo } from "react";
import { handleBadgeStyle } from "./custom";
import "./index.scss";

export interface MBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  variant?: "small" | "large";
}

export default function MBadge({
  value,
  className,
  children,
  variant = "small",
  ...rest
}: MBadgeProps) {
  const badgeStyle = useMemo(() => {
    return handleBadgeStyle({
      value,
      className,
      variant,
    });
  }, [value, className, variant]);

  return (
    <div
      className={badgeStyle.className}
      {...rest}
    >
      {children}
      <div className={badgeStyle.badgeClassName}>
        {value && (
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
