import { Children, useMemo } from "react";
import { MMenuContext } from "./context";
import type { MMenuProps } from "./interface";
import "./menu.scss";
import { handleMMenuStyle } from "./custom";

export default function MMenu({ variant = "vertical", children }: MMenuProps) {
  const menuStyle = useMemo(() => {
    return handleMMenuStyle({
      variant,
    });
  }, [variant]);

  return (
    <MMenuContext.Provider value={{ variant }}>
      <div className={menuStyle.className}>
        {Children.map(children, (child, index) => (
          <div
            className="mdui-menu-item-container"
            key={index}
          >
            {child}
          </div>
        ))}
      </div>
    </MMenuContext.Provider>
  );
}
