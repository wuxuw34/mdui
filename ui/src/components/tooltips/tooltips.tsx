import type { MTooltipsProps } from "./interface";

export default function MTooltips({
  variant = "plain",
  children,
}: MTooltipsProps) {

  function handleTrigger(){

  }

  return (
    <div className="mdui-tooltips">
      <div className="mdui-tooltips-trigger" onClick={handleTrigger}>提示</div>
      <div className="mdui-tooltips-content">{children}</div>
    </div>
  );
}
