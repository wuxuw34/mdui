import { MSwitch } from "mdui";
import Col from "./col";
import { Moon, Sun } from "lucide-react";

export default function Switch() {
  return (
    <Col>
      <div>开关</div>
      <MSwitch
        onText="开启"
        offText="关闭"
        onIcon={<Sun />}
        offIcon={<Moon />}
        style={{
          width: 100,
        }}
      />
    </Col>
  );
}
