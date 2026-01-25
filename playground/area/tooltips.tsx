import { MTooltips,MButton } from "mdui";
import Col from "./col";

export default function Tooltips() {
  return (
    <Col>
      <MTooltips
        trigger={<MButton>
          触发提示
        </MButton>}
      >
        这是一个提示
      </MTooltips>
    </Col>
  );
}
