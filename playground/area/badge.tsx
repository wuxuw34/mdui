import { MBadge, MSwitch, MTextField } from "mdui";
import Col from "./col";
import Row from "./row";
import { Home, Sun } from "lucide-react";
import { useState } from "react";

export default function Badge() {
  const [label, setLabel] = useState("");
  const [labelPosition, setLabelPosition] = useState<"bottom" | "right">(
    "bottom",
  );

  return (
    <Col>
      <div>徽标</div>
      <MTextField
        value={label}
        label="标签"
        onValueChange={setLabel}
      />
      <Row>
        标签位置：
        <MSwitch
          checked={labelPosition === "bottom"}
          onCheckedChange={(v) => {
            setLabelPosition(v ? "bottom" : "right");
          }}
        />
      </Row>
      <Row>
        <MBadge value={100}>
          <Home />
        </MBadge>
        <MBadge
          value={1000}
          variant="large"
        >
          <Sun />
        </MBadge>
        <MBadge
          value={1}
          variant="large"
        >
          <Sun />
        </MBadge>
      </Row>
    </Col>
  );
}
