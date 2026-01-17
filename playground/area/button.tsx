import { Car } from "lucide-react";
import { Mbutton } from "mdui";
import { useState } from "react";

export default function Button() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex flex-col  gap-2">
      <div>按钮</div>
      <div className="flex gap-2">
        <Mbutton
          selected={selected}
          onClick={() => setSelected(!selected)}
        >
          默认按钮
        </Mbutton>
        <Mbutton color="black">黑色</Mbutton>
        <Mbutton variant="text">文本按钮</Mbutton>
        <Mbutton
          variant="tonal"
          selected={selected}
        >
          文本按钮
        </Mbutton>
        <Mbutton
          variant="outline"
          selected={selected}
          startIcon={<Car />}
        >
          边框按钮
        </Mbutton>
        <Mbutton disabled={true}>禁用</Mbutton>
        <Mbutton variant="icon">
          <Car />
        </Mbutton>
      </div>
    </div>
  );
}
