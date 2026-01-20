import { MCheckbox } from "mdui";
import Col from "./col";
import { Check } from "lucide-react";
import { useState } from "react";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Col>
      <MCheckbox
        checked={checked}
        onCheckedChange={setChecked}
      />
      <MCheckbox
        color="var(--color-error)"
        checked={checked}
        onCheckedChange={setChecked}
      />
    </Col>
  );
}
