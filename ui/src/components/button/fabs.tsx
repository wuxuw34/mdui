import clsx from "clsx";
import MButton from "./button";
import "./fabs.scss";
import type { MFABsProps } from "./interface";
import { createPortal } from "react-dom";

export default function MFABs({
  size = "default",
  show = true,
  children,
  className,
  style,
  ...rest
}: MFABsProps) {
  return createPortal(
    <div
      className={clsx({
        "mdui-fabs": true,
        [size]: true,
        className,
      })}
      style={{
        scale: show ? 1 : 0,
        ...style,
      }}
      {...rest}
    >
      <MButton
        variant="elevated"
        shape="square"
      >
        {children}
      </MButton>
    </div>,
    document.body,
  );
}
