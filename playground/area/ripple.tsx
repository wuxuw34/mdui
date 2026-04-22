import { MRipple, MSwitch } from "mdui";
import Col from "./col";
import { useState } from "react";

export default function Ripple() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Col>
      <MSwitch
        checked={enabled}
        onCheckedChange={(v)=>{
          setEnabled(v);
        }}
      >
        是否开启水波纹
      </MSwitch>
      <MRipple disabled={!enabled}>
        <div
          style={{
            height: 100,
            width: 300,
          }}
        >
          123
        </div>
      </MRipple>
      <MRipple disabled={!enabled}>
        <div
          style={{
            height: 100,
            width: 100,
            borderRadius:'100%',
            overflow:'hidden'
          }}
        >
          123
        </div>
      </MRipple>
    </Col>
  );
}
