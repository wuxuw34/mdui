import { createPortal } from "react-dom";
import "./fabsMenu.scss";
import MButton from "./button";
import type { MFABsMenuProps } from "./interface";
import clsx from "clsx";
import { useState } from "react";

export default function MFABsMenu({
  show = true,
  icon,
  expandIcon,
  unExpandIcon,
  expand = false,
  children,
}: MFABsMenuProps) {
  const [isExpand, setIsExpand] = useState(expand);

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  if (!show) {
    return null;
  }

  return createPortal(
    <div className="mdui-fabs-menu">
      <div
        className={clsx({
          "mdui-fabs-menu-container": true,
          expand: isExpand,
          unexpand: !isExpand,
        })}
      >
        {children}
      </div>
      <MButton
        variant="filled"
        aspectRatio="square"
        shape="square"
        onClick={handleExpand}
      >
        {icon ? (
          <div
            style={{
              transform: isExpand ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 0.1s ease-in-out",
            }}
          >
            {icon}
          </div>
        ) : (
          <div>{isExpand ? unExpandIcon : expandIcon}</div>
        )}
      </MButton>
    </div>,
    document.body,
  );
}
