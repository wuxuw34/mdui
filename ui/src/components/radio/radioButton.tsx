import { useState } from "react";
import "./index.scss";
import type { MRadioButtonProps } from "./interface";
import  { MRipple } from "../ripple";

export default function MRadioButton({
  checked = false,
  onCheckChange,
}: MRadioButtonProps) {
  const [value, setValue] = useState<boolean>(checked);

  return (
    <MRipple>
      <div className="mdui-radio-button">
        <div
          className="mdui-radio-button-ring"
          data-checked={value.toString()}
          onClick={() => {
            setValue(!value);
            onCheckChange?.(!value);
          }}
        ></div>
      </div>
    </MRipple>
  );
}
