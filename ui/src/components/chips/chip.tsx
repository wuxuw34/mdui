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
  checked,
  ...rest
}: MChipProps) {
  const chipRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const chipStyle = useMemo(() => {
    return handleMChipStyle({
      className,
      variant,
      checked
    });
  }, [className, variant,checked]);
  useRipple(chipRef, {
    container: chipRef,
  });
  useRipple(closeRef, {
    container: closeRef,
    preventDefault: true,
    stopPropagation: true,
  });

  function getStartIcon() {
    if (variant === "filter") {
      if (checked) {
        return (
          <div className="mdui-chip-icon">
            {icon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#1f1f1f"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </div>
        );
      }
    } else {
      return <div className="mdui-chip-icon">{icon}</div>;
    }
    return "";
  }

  return (
    <div
      className={chipStyle.className}
      ref={chipRef}
      tabIndex={0}
      {...rest}
    >
      {getStartIcon()}
      {children}
      {variant === "input" && (
        <div
          className="mdui-chip-end-icon"
          ref={closeRef}
          tabIndex={0}
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
