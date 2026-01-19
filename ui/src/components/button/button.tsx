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
import type { TSize } from "../../types";

export interface MButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  ripple?: boolean;
  variant?: "default" | "outline" | "text" | "icon" | "tonal" | "filled";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean | undefined;
  shape?: "rounded" | "square";
  size?: TSize;
  radiusInverse?: boolean;
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
    shape = "rounded",
    selected,
    ripple = true,
    style,

    ...rest
  } = props;
  const groupContext = useContext(mButtonGroupContext); // 按钮组的上下文
  let { radiusInverse = false } = props;
  radiusInverse = groupContext.variant === "connected";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const { setEnabled: setRippleEnabled } = useRipple(buttonRef, {
    className: getRippleBackgroundColor(),
    container: rippleContainerRef,
  });

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
      selected,
      className,
      radiusInverse,
    });
  }, [size, variant, shape, selected, className, radiusInverse]);

  function getRippleBackgroundColor() {
    if (variant === "default") {
      return "ripple-active-default";
    } else {
      return "ripple-active";
    }
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
    // 这个动画需要判断是否关闭
    if (!groupContext.animation) {
      // 还原
      if (initialPadding.current) {
        button.style.width = sizeRef.current.width;
        button.style.height = sizeRef.current.height;
      }
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
          ...style,
        } as React.CSSProperties
      }
    >
      <div
        className="ripple-container"
        ref={rippleContainerRef}
      ></div>
      {startIcon}
      {props.children}
      {endIcon}
    </button>
  );
});

export default MButton;
