import { MProgress } from "mdui";
import Col from "./col";

export default function Indicators() {
  return (
    <Col>
      <MProgress />
      <MProgress type="circle" />
    </Col>
  );
}
