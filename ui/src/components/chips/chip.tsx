import { useMemo, useRef } from "react";
import "./chip.scss";
import type { MChipProps } from "./interface";
import useRipple from "../../hooks/useRipple";
import { handleMChipStyle } from "./custom";

export default function MChip({
  children,
  icon,
  className,
  variant,
  endIcon,
}: MChipProps) {
  const chipRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const chipStyle = useMemo(() => {
    return handleMChipStyle({
      className,
      variant,
    });
  }, [className, variant]);
  useRipple(chipRef, {
    container: chipRef,
  });
  useRipple(closeRef, {
    container: closeRef,
  });

  return (
    <div
      className={chipStyle.className}
      ref={chipRef}
    >
      {icon && <div className="mdui-chip-icon">{icon}</div>}
      {children}
      {variant === "input" && (
        <div
          className="mdui-chip-end-icon"
          ref={closeRef}
        >
          {endIcon ? (
            endIcon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}
