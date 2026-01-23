import type { MMenuItemProps } from "./interface";
import "./item.scss";

export default function MMenuItem({
  variant = "vertical",
  children,
}: MMenuItemProps) {
  return <div className="mdui-menu-item">{children}</div>;
}
