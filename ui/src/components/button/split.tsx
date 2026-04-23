import { useState } from "react";
import MButton from "./button";
import "./split.scss";
import clsx from "clsx";
import type { MSplitButtonProps } from "./interface";

export default function MSplitButton({
  size = "md",
  children,
}: MSplitButtonProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={clsx("mdui-split-button", {
        [size]: true,
      })}
    >
      <MButton
        variant="filled"
        size={size}
        className="mdui-split-button-first"
      >
        {children}
      </MButton>
      <MButton
        aspectRatio="square"
        variant="filled"
        shape="rounded"
        onlyColor={true}
        className={clsx({
          "is-active": isActive,
        })}
        size={size}
        onClick={() => setIsActive(!isActive)}
      >
        <span className="material-icons">keyboard_arrow_down</span>
      </MButton>
    </div>
  );
}
