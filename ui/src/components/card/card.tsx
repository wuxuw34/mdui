import { useEffect, useMemo, useRef } from "react";
import { handleMCardStyle } from "./custom";
import "./card.scss";
import useRipple from "../../hooks/useRipple";
import { EasingFunction } from "../../contants/easing";

export type MCardVariant = "elevated" | "filled" | "outlined";

export interface MCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MCardVariant;
  disabled?: boolean;
  ripple?: boolean;
}

export default function MCard({
  children,
  className,
  disabled,
  style,
  variant = "elevated",
  ripple = false,
  ...rest
}: MCardProps) {
  const cardStyle = useMemo(() => {
    return handleMCardStyle({
      className,
      variant,
      disabled,
    });
  }, [className, variant, disabled]);
  const ref = useRef<HTMLDivElement>(null);
  const { setEnabled } = useRipple(ref, {
    container: ref,
  });

  useEffect(() => {
    setEnabled(ripple);
  }, [ripple, setEnabled]);

  return (
    <div
      className={cardStyle.className}
      ref={ref}
      tabIndex={0}
      style={
        {
          "--easing": EasingFunction.ExpressiveDefaultEffects,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </div>
  );
}
