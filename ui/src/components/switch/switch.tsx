import { useEffect, useMemo, useState } from "react";
import { handleSwitchStyle } from "./custom";
import "./index.scss";

export interface MSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onText?: string;
  offText?: string;
  onIcon?: React.ReactNode;
  offIcon?: React.ReactNode;
  onCheckedChange?: (v: boolean) => void;
}

export default function MSwitch(props: MSwitchProps) {
  const { onText, offText, onIcon, offIcon, style, onCheckedChange } = props;
  const [checked, setChecked] = useState(props.checked || false);
  const switchStyle = useMemo(() => {
    return handleSwitchStyle({ checked });
  }, [checked]);
  useEffect(() => {
    onCheckedChange?.(checked);
  }, [checked, onCheckedChange]);

  return (
    <div
      className={switchStyle.cs}
      style={{
        ...switchStyle.style,
        ...style,
      }}
      onClick={() => {
        setChecked(!checked);
      }}
      role="switch"
      tabIndex={0}
    >
      <div className="on-text">{onText}</div>
      <div className="off-text">{offText}</div>
      <div className="thumb">{checked ? onIcon : offIcon}</div>
    </div>
  );
}
