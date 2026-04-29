import clsx from "clsx";
import type { MSideSheetProps } from "./interface";
import "./side.scss";
import { useEffect, useState } from "react";
import { MButton } from "../button";
import { MDivider } from "../divider";

export default function MSideSheet({
  show,
  header,
  footer,
  children,
  onShowChange,
}: MSideSheetProps) {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    const updateOpen = () => {
      setOpen(show);
    };
    updateOpen();
  }, [show]);

  return (
    <div
      className={clsx("mdui-side-sheet", {
        open,
      })}
    >
      {header && (
        <div className="mdui-side-sheet__header">
          <div className="mdui-side-sheet__header_left">{header}</div>
          <MButton
            variant="icon"
            size="xs"
          >
            <span
              className="material-icons"
              onClick={() => {
                onShowChange(false);
              }}
            >
              close
            </span>
          </MButton>
        </div>
      )}
      <div className="mdui-side-sheet__content">{children}</div>

      {footer && (
        <>
          <MDivider size={2} />
          <div className="mdui-side-sheet__footer">{footer}</div>
        </>
      )}
    </div>
  );
}
