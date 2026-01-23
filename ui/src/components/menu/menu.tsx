import { MMenuContext } from "./context";
import type { MMenuProps } from "./interface";
import "./menu.scss";

export default function MMenu({ variant = "vertical", children }: MMenuProps) {
  
  return (
    <MMenuContext.Provider value={{ variant }}>
      <div className="mdui-menu">{children}</div>
    </MMenuContext.Provider>
  );
}
