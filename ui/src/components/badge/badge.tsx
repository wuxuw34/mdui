import "./index.scss";
import { MRipple } from "../ripple";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

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
  const [labelWidth, setLabelWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

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
          ref={(ref) => {
            if (ref) {
              const content = ref.children[1] as HTMLElement;
              setContentWidth(content?.offsetWidth || 0);
            }
          }}
          style={{
            width: contentWidth === 0 ? "auto" : contentWidth + labelWidth,
          }}
        >
          {children}
          {label && labelPosition === "right" && (
            <div
              className={clsx("mdui-badge__label", {
                active: active,
              })}
              ref={(ref) => {
                if (ref) {
                  const updateLabel = () => {
                    setLabelWidth(ref!.offsetWidth + 8 || 0);
                  };
                  updateLabel();
                }
              }}
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
          ref={() => {
            setLabelWidth(0);
          }}
        >
          {label}
        </div>
      )}
      <div
        className={clsx("mdui-badge__count", variant, {
          "no-label": !label,
          "right-label": labelPosition === "right",
        })}
        style={{
          transform: `translateX(-${labelWidth}px)`,
        }}
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
