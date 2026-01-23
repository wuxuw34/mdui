import { MChip } from "mdui";
import Col from "./col";
import { Image } from "lucide-react";
import { useState } from "react";

export default function Chip() {
  const [checked, setChecked] = useState(true);

  return (
    <Col>
      <MChip
        icon={<Image />}
        variant="assist"
        
      >
        图片
      </MChip>
      <MChip
        variant="filter"
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        过滤
      </MChip>
      <MChip
        icon={<Image />}
        variant="input"
      >
        输入
      </MChip>
      <MChip
        icon={<Image />}
        variant="suggestion"
      >
        建议
      </MChip>
    </Col>
  );
}
