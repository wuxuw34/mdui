import { useContext, useState } from "react";
import "./index.scss";
import type { MRadioButtonProps } from "./interface";
import { MRipple } from "../ripple";
import { radioGroupContext } from "./context";

export default function MRadioButton({ value }: MRadioButtonProps) {
  const { setValue, value: currentValue } = useContext(radioGroupContext);
  const [key, setKey] = useState<string>(value || "");

  return (
    <MRipple>
      <div className="mdui-radio-button">
        <div
          className="mdui-radio-button-ring"
          data-checked={key === currentValue}
          onClick={() => {
            setValue(value);
            setKey(value);
          }}
        ></div>
      </div>
    </MRipple>
  );
}
