import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import "./button.scss";
import { nanoid } from "nanoid";
import mButtonGroupContext from "../buttonGroup/context";
import { MRipple } from "../ripple";
import clsx from "clsx";
import type { MButtonProps } from "./interface";

export interface MButtonRef {
  changePadding: (x: number, y: number) => void;
  resetPadding: () => void;
}

const MButton = forwardRef<MButtonRef, MButtonProps>((props: MButtonProps) => {
  const {
    size = "md",
    variant = "elevated",
    className,
    startIcon,
    endIcon,
    disabled,
    shape = "rounded",
    selected,
    aspectRatio,
    ripple = true,
    style,
    onlyColor = false,
    ...rest
  } = props;
  const groupContext = useContext(mButtonGroupContext); // 按钮组的上下文

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [id] = useState(nanoid()); // 按钮的唯一标识
  const sizeRef = useRef({
    width: "",
    height: "",
  });
  const initialPadding = useRef<boolean>(false); // 是否初始化了
  const targetPaddingRef = useRef<number[]>([]); // 目标padding值

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

  const getButtonState = () => {
    let state: "default" | "selected" | "unselected" = "default";
    if (selected) {
      state = "selected";
    } else if (typeof selected === "boolean" && !selected) {
      state = "unselected";
    }
    return state;
  };

  return (
    <MRipple disabled={!ripple}>
      <button
        role="button"
        ref={buttonRef}
        data-id={id}
        data-aspectRatio={aspectRatio}
        data-onlyColor={onlyColor}
        className={
          clsx({
            "mdui-button": true,
            [size]: true,
            [variant]: true,
            [getButtonState()]: true,
            [shape]: true,
            disabled: disabled,
          }) + (className ? ` ${className}` : "")
        }
        style={style}
        {...rest}
      >
        {startIcon}
        {props.children}
        {endIcon}
      </button>
    </MRipple>
  );
});

export default MButton;
