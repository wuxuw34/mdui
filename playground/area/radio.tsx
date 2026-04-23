import { MRadioButton, MRadioGroup } from "mdui";
import Col from "./col";
import Row from "./row";

export default function Radio() {
  return (
    <Col>
      <Row>
        <MRadioGroup value="1">
          <MRadioButton value="1" /> 单选
          <MRadioButton value="2" /> 单选2
        </MRadioGroup>
      </Row>
    </Col>
  );
}
