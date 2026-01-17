import { Car, Home } from "lucide-react";
import { Mbutton } from "mdui";
import { useState } from "react";

export default function Button() {
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex flex-col  gap-2">
      <div>按钮</div>
      <div>
        <input
          type="checkbox"
          defaultChecked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />
        <switch>禁用</switch>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />
        <switch>选中</switch>
      </div>
      <div className="flex flex-col gap-2 w-[120px]">
        <Mbutton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
        >
          默认按钮
        </Mbutton>
        <Mbutton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="filled"
        >
          填充按钮
        </Mbutton>
      </div>
    </div>
  );
}
