import "./index.scss";
import { MRipple } from "../ripple";
import clsx from "clsx";

export interface MBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  variant?: "small" | "large";
  showValue?: boolean;
  label?: React.ReactNode;
  active?: boolean;
  labelPosition?: "bottom" | "right";
}

export default function MBadge({
  value,
  className,
  children,
  variant = "small",
  showValue = true,
  style,
  active = false,
  labelPosition = "bottom",
  label,
  ...rest
}: MBadgeProps) {
  return (
    <div
      className={clsx("mdui-badge", className, variant)}
      style={
        {
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      <MRipple color="var(--color-secondary-container)">
        <div
          className={clsx("mdui-badge__content", {
            active: active,
            "no-label": !label,
            "right-label": labelPosition === "right",
          })}
        >
          {children}
          {label && labelPosition === "right" && (
            <div
              className={clsx("mdui-badge__label", {
                active: active,
              })}
            >
              {label}
            </div>
          )}
        </div>
      </MRipple>
      {label && labelPosition === "bottom" && (
        <div
          className={clsx("mdui-badge__label", {
            active: active,
          })}
        >
          {label}
        </div>
      )}
      <div
        className={clsx("mdui-badge__count", variant, {
          "no-label": !label,
        })}
      >
        {value && showValue && (
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
