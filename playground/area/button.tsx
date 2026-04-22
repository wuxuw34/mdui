import { Home } from "lucide-react";
import { MButton, MCheckbox } from "mdui";
import { useState } from "react";
import Row from "./row";

const sizes = ["xs", "sm", "md", "lg", "xl"];

export default function Button() {
  const [selected, setSelected] = useState<boolean | undefined>(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="flex flex-col  gap-2">
      <Row>
        <div>尺寸</div>
        {sizes.map((size) => (
          <Row key={size} style={{
            alignItems:'center'
          }}>
            <MCheckbox></MCheckbox>
            <span>{size}</span>
          </Row>
        ))}
      </Row>
      <div>按钮</div>
      <div>
        <input
          type="checkbox"
          defaultChecked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />
        <span>禁用</span>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={selected}
          onChange={(e) => setSelected(e.target.checked)}
        />
        <span>选中</span>
      </div>
      <div>
        <input
          type="checkbox"
          defaultChecked={typeof selected === "undefined"}
          onChange={() =>
            setSelected(typeof selected === "undefined" ? true : undefined)
          }
        />
        <span>设置为undefined</span>
      </div>
      <div className="flex flex-col gap-2 w-[120px]">
        <div>
          <MButton
            selected={selected}
            disabled={disabled}
            startIcon={<Home />}
            shape="rounded"
          >
            默认按钮
          </MButton>
        </div>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="filled"
        >
          填充按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="tonal"
        >
          tonal按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="outline"
        >
          outline按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="text"
        >
          文本按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="icon"
        ></MButton>
      </div>
    </div>
  );
}
