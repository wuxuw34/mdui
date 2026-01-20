import { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import { handleCheckboxStyle } from "./custom";
import useRipple from "../../hooks/useRipple";

export interface MCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  color?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  indeterminateIcon?: React.ReactNode;
}

export default function MCheckbox({
  children,
  color,
  disabled = false,
  checked = false,
  onCheckedChange,
  indeterminate = false,
  indeterminateIcon,
  style,
  ...rest
}: MCheckboxProps) {
  const [value, setValue] = useState(checked); // 当前选择
  const rippleRef = useRef<HTMLDivElement>(null);
  const checkboxStyle = useMemo(() => {
    return handleCheckboxStyle({
      color,
    });
  }, [color]);
  useRipple(rippleRef, {
    container: rippleRef,
    color: checkboxStyle.rippleColor,
  });

  useEffect(() => {
    if (checked !== value) {
      const set = (v: boolean) => {
        setValue(v);
      };
      set(checked);
    }
  }, [checked]);

  useEffect(() => {
    onCheckedChange?.(value);
  }, [value]);

  return (
    <div
      className={
        "mdui-checkbox " +
        (value ? "checked" : "unchecked") +
        (disabled ? " disabled" : "")
      }
      style={{
        ...checkboxStyle.style,
        ...style,
      }}
      onClick={() => setValue(!value)}
      {...rest}
    >
      <div
        className={"container"}
        ref={rippleRef}
      >
        {value && (
          <div className="icon">
            {children ? (
              indeterminate ? (
                indeterminateIcon
              ) : (
                children
              )
            ) : indeterminate ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M240-440v-80h480v80H240Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            )}
          </div>
        )}
        <div className="bg"></div>
      </div>
    </div>
  );
}
