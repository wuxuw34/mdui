import { useState } from "react";
import type { MTooltipsProps } from "./interface";
import './tooltips.scss'

export default function MTooltips({
  variant = "plain",
  trigger,
  children,
}: MTooltipsProps) {
  const [visible, setVisible] = useState(false); // 是否显示提示

  function handleTrigger() {
    console.log("触发提示");
    setVisible(!visible);
  }

  return (
    <div className="mdui-tooltips">
      <div
        className="mdui-tooltips-trigger"
        onClick={handleTrigger}
      >
        {trigger}
      </div>
      {visible && <div className="mdui-tooltips-content">{children}</div>}
    </div>
  );
}
