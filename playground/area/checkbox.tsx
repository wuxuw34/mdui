import { MCheckbox } from "mdui";
import Col from "./col";
import { Check } from "lucide-react";

export default function Checkbox() {
  return (
    <Col>
      <MCheckbox>
        <Check />
      </MCheckbox>
    </Col>
  );
}
