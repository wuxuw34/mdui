import { MCard } from "mdui";
import Col from "./col";

export default function Card() {
  return (
    <Col>
      <MCard>123</MCard>
      <MCard variant="filled">123</MCard>
      <MCard variant="outlined">
        <div>这是一个outlined card</div>
        <div>卡片内容</div>
      </MCard>
    </Col>
  );
}
