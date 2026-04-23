import { Home, Plus, X } from "lucide-react";
import { MButton, MSwitch, MRadioButton, MRadioGroup, MFABsMenu } from "mdui";
import { useState } from "react";
import Row from "./row";

const sizes = ["xs", "sm", "md", "lg", "xl"];
const shapes = ["rounded", "square"];

export default function Button() {
  const [selected, setSelected] = useState<boolean | undefined>(false);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [shape, setShape] = useState<"rounded" | "square">("rounded");
  const [showFabs, setShowFabs] = useState(false);

  return (
    <div className="flex flex-col  gap-2">
      <Row>
        <div>尺寸</div>
        <MRadioGroup
          value={size}
          onValueChange={(v) => setSize(v as "xs" | "sm" | "md" | "lg" | "xl")}
        >
          {sizes.map((size) => (
            <Row
              key={size}
              style={{
                alignItems: "center",
              }}
            >
              <MRadioButton value={size}></MRadioButton>
              <span>{size}</span>
            </Row>
          ))}
        </MRadioGroup>
      </Row>
      <Row>
        <div>形状</div>
        <MRadioGroup
          value={shape}
          onValueChange={(v) => setShape(v as "rounded" | "square")}
        >
          {shapes.map((size) => (
            <Row
              key={size}
              style={{
                alignItems: "center",
              }}
            >
              <MRadioButton value={size}></MRadioButton>
              <span>{size}</span>
            </Row>
          ))}
        </MRadioGroup>
      </Row>
      <Row>
        <div>是否选中</div>
        <MSwitch
          checked={selected}
          onCheckedChange={setSelected}
        ></MSwitch>
      </Row>
      <Row>
        <div>是否禁用</div>
        <MSwitch
          checked={disabled}
          onCheckedChange={setDisabled}
        ></MSwitch>
      </Row>
      <Row>
        <div>是否显示fabs</div>
        <MSwitch
          checked={showFabs}
          onCheckedChange={setShowFabs}
        ></MSwitch>
      </Row>

      <div className="flex flex-col gap-2 w-[120px]">
        <div>
          <MButton
            selected={selected}
            disabled={disabled}
            startIcon={<Home />}
            shape={shape}
            size={size}
          >
            默认按钮
          </MButton>
        </div>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="filled"
          shape={shape}
          size={size}
        >
          填充按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="tonal"
          size={size}
          shape={shape}
        >
          tonal按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="outlined"
          size={size}
          shape={shape}
        >
          outline按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="text"
          shape={shape}
          size={size}
        >
          文本按钮
        </MButton>
        <MButton
          selected={selected}
          disabled={disabled}
          startIcon={<Home />}
          variant="icon"
          size={size}
        ></MButton>

        <MFABsMenu
          show={showFabs}
          icon={<Plus />}
        >
          <MButton variant="elevated">菜单</MButton>
          <MButton variant="elevated">菜单1</MButton>
        </MFABsMenu>
      </div>
    </div>
  );
}
