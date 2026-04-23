import { Plus } from "lucide-react";
import Col from "./col";
import { useState } from "react";
import Row from "./row";
import { MRadioButton, MRadioGroup, MIconButton, MSwitch } from "mdui";

const variants = ["elevated", "outlined", "text", "icon", "tonal", "filled"];
const aspectRatios = ["square", "wide", "narrow"];

export default function IconButton() {
  const [variant, setVariant] = useState<
    "elevated" | "outlined" | "text" | "icon" | "tonal" | "filled"
  >("elevated");
  const [selected, setSelected] = useState<boolean | undefined>(false);
  const [aspectRatio, setAspectRatio] = useState<"square" | "wide" | "narrow">(
    "square",
  );

  return (
    <Col>
      <Row>
        样式:
        <MRadioGroup
          value={variant}
          onValueChange={(v) =>
            setVariant(
              v as
                | "elevated"
                | "outlined"
                | "text"
                | "icon"
                | "tonal"
                | "filled",
            )
          }
        >
          {variants.map((variant) => (
            <Row
              key={variant}
              style={{
                alignItems: "center",
              }}
            >
              <MRadioButton value={variant}></MRadioButton>
              <span>{variant}</span>
            </Row>
          ))}
        </MRadioGroup>
      </Row>
      <Row>
        比例:
        <MRadioGroup
          value={aspectRatio}
          onValueChange={(v) =>
            setAspectRatio(v as "square" | "wide" | "narrow")
          }
        >
          {aspectRatios.map((aspectRatio) => (
            <Row
              key={aspectRatio}
              style={{
                alignItems: "center",
              }}
            >
              <MRadioButton value={aspectRatio}></MRadioButton>
              <span>{aspectRatio}</span>
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
      <MIconButton
        variant={variant}
        selected={selected}
        onClick={() => {
          setSelected(!selected);
        }}
        aspectRatio={aspectRatio}
      >
        <Plus />
      </MIconButton>
    </Col>
  );
}
