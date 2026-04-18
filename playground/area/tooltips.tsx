import { MTooltips, MButton } from "mdui";
import Col from "./col";

export default function Tooltips() {
  return (
    <Col>
      <MTooltips trigger={<MButton>触发提示</MButton>}>这是一个提示</MTooltips>
      <MTooltips
        trigger={<MButton>触发提示</MButton>}
        variant="rich"
        title={"测试"}
        content={"这是一个提示"}
        footer={"这是一个提示的底部"}
      ></MTooltips>
    </Col>
  );
}
