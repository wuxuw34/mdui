import { MBadge } from "mdui";
import Col from "./col";
import Row from "./row";
import { Home, Sun } from "lucide-react";

export default function Badge() {
  return (
    <Col>
      <div>徽标</div>
      <Row>
        <MBadge value={100}>
          <Home />
        </MBadge>
        <MBadge
          value={1000}
          variant="large"
          label="测试"
          active={true}
        >
          <Sun />
        </MBadge>
      </Row>
    </Col>
  );
}
