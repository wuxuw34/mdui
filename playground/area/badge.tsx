import { MBadge, MButton } from "mdui";
import Col from "./col";
import Row from "./row";
import { Home, Sun } from "lucide-react";

export default function Badge() {
  return (
    <Col>
      <div>徽标</div>
      <Row>
        <MButton variant="text">
          <MBadge value={100}>
            <Home />
          </MBadge>
        </MButton>
        <MButton variant="text">
          <MBadge
            value={1000}
            variant="large"
          >
            <Sun />
          </MBadge>
        </MButton>
      </Row>
    </Col>
  );
}
