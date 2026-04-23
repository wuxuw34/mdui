import clsx from "clsx";
import MButton from "./button";
import type { MIconButtonProps } from "./interface";

export default function MIconButton({
  type = "default",
  children,
  ...rest
}: MIconButtonProps) {
  return (
    <MButton
      className={clsx({
        "mdui-icon-button": true,
        [type]: true,
      })}
      {...rest}
    >
      {children}
    </MButton>
  );
}
