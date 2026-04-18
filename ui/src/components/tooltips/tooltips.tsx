import { useRef, useState } from "react";
import type { MTooltipsProps } from "./interface";
import "./tooltips.scss";

export default function MTooltips({
  variant = "plain",
  trigger,
  children,
}: MTooltipsProps) {
  const [visible, setVisible] = useState(false); // 是否显示提示
  const referenceRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  function handleTrigger() {
    setVisible(!visible);
  }

  return (
    <div className="mdui-tooltips">
      <div
        className="mdui-tooltips-trigger"
        ref={referenceRef}
      >
        {trigger}
      </div>
      <div
        className="mdui-tooltips-content"
        ref={floatingRef}
      >
        {children}
      </div>
    </div>
  );
}
