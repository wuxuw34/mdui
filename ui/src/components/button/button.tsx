import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./index.scss";
import { nanoid } from "nanoid";
import useRipple from "../../hooks/useRipple";
import mButtonGroupContext from "../buttonGroup/context";
import handleButtonCustomClassNames from "./button-custom";

export interface MButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  ripple?: boolean;
  variant?: "default" | "outline" | "text" | "icon" | "tonal" | "filled";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  pressed?: boolean;
  disabled?: boolean;
  selected?: boolean;
  shape?: "rounded" | "square";
  animation?: boolean;
  outline?: boolean;
  background?: boolean;
  hover?: boolean;
  shadow?: boolean;
  size?: "sm" | "xs" | "md" | "lg" | "xl";
  icon?: boolean;
  active?: boolean;
}

export interface MButtonRef {
  changePadding: (x: number, y: number) => void;
  resetPadding: () => void;
}

const MButton = forwardRef<MButtonRef, MButtonProps>((props: MButtonProps) => {
  const {
    size = "md",
    variant = "default",
    className,
    startIcon,
    endIcon,
    disabled,
    animation = true,
    shape = "rounded",
    active = true,
    selected,
    shadow = true,
    hover = true,
    icon = false,
    ...rest
  } = props;
  let { outline, background, ripple = true } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setEnabled: setRippleEnabled } = useRipple(buttonRef, {
    className: getRippleBackgroundColor(),
  });
  const groupContext = useContext(mButtonGroupContext); // 按钮组的上下文
  const [id] = useState(nanoid()); // 按钮的唯一标识
  const sizeRef = useRef({
    width: "",
    height: "",
  });
  const initialPadding = useRef<boolean>(false); // 是否初始化了
  const targetPaddingRef = useRef<number[]>([]); // 目标padding值
  const buttonStyle = useMemo<{
    className: string;
    style: React.CSSProperties;
  }>(() => {
    return handleButtonCustomClassNames({
      size,
      variant,
      shape,
      outline,
      animation,
      shadow,
      hover,
      icon,
      active,
      selected,
    });
  }, [
    size,
    variant,
    shape,
    outline,
    animation,
    shadow,
    hover,
    icon,
    active,
    selected,
  ]);

  function getRippleBackgroundColor() {
    if (variant === "default") {
      return "bg-[rgba(255,255,255,0.6)]";
    } else {
      return "bg-[var(--color)] opacity-[0.05]";
    }
  }

  if (variant === "default") {
    outline = true;
  } else if (variant === "text") {
    // 文本按钮
    outline = false;
    background = false;
    ripple = false;
  } else if (variant === "outline") {
    outline = true;
    background = false;
    ripple = true;
  } else if (variant === "icon") {
    outline = false;
    background = false;
    ripple = true;
  } else if (variant === "tonal") {
    outline = false;
    background = true;
    ripple = true;
  }

  useEffect(() => {
    if (selected && groupContext.current !== id) {
      groupContext.setCurrent(id);
    }
  }, [selected, id, groupContext]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) {
      return;
    }
    // 还原
    if (!initialPadding.current) {
      sizeRef.current = {
        width: button.style.width,
        height: button.style.height,
      };
      initialPadding.current = true;
    }
    // 还原
    button.style.width = sizeRef.current.width;
    button.style.height = sizeRef.current.height;
    // 获取到知己的padding值
    if (targetPaddingRef.current.length <= 0) {
      const { width, height } = window.getComputedStyle(button);
      targetPaddingRef.current = [
        Number(width.replace("px", "")),
        Number(height.replace("px", "")),
      ];
    }
    const setPaddings = (
      paddings: [number, number],
      size: number,
      orientation: "horizontal" | "vertical",
      isCurrent: boolean,
    ) => {
      const p = [...paddings];
      if (orientation === "horizontal") {
        if (isCurrent) {
          p[0] += size * 2;
        } else {
          p[0] -= size;
        }
      } else {
        if (isCurrent) {
          p[1] += size * 2;
        } else {
          p[1] -= size;
        }
      }
      return p;
    };
    if (groupContext.current === id) {
      // 当前按钮横向的padding增加5
      const v = setPaddings(
        targetPaddingRef.current as [number, number],
        groupContext.amount,
        groupContext.orientation,
        true,
      );
      if (groupContext.orientation === "vertical") {
        button.style.height = `${v[1]}px`;
      } else {
        button.style.width = `${v[0]}px`;
      }
    } else if (groupContext.next === id || groupContext.pre === id) {
      // 这个是后面的按钮
      const v = setPaddings(
        targetPaddingRef.current as [number, number],
        groupContext.amount,
        groupContext.orientation,
        false,
      );
      if (groupContext.orientation === "vertical") {
        button.style.height = `${v[1]}px`;
      } else {
        button.style.width = `${v[0]}px`;
      }
    }
  }, [groupContext, id]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!ripple || !button || disabled) {
      setRippleEnabled(false);
      return;
    }
  }, [ripple, disabled, setRippleEnabled]);

  return (
    <button
      role="button"
      ref={buttonRef}
      {...rest}
      data-selected={selected}
      data-id={id}
      disabled={disabled}
      className={buttonStyle.className}
      style={
        {
          "--radius":
            shape === "rounded"
              ? `var(--radius-${size})`
              : `var(--radius-square-${size})`,
          ...buttonStyle.style,
          ...rest.style,
        } as React.CSSProperties
      }
    >
      {startIcon}
      {props.children}
      {endIcon}
    </button>
  );
});

export default MButton;
