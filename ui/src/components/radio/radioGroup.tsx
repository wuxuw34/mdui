import { useState } from "react";
import { radioGroupContext } from "./context";
import type { MRadioGroupProps } from "./interface";

export default function MRadioGroup({
  value,
  onValueChange,
  children,
}: MRadioGroupProps) {
  const [groupValue, setGroupValue] = useState(value || "");

  const update = (v: string) => {
    setGroupValue(v);
    onValueChange?.(v);
  };

  return (
    <radioGroupContext.Provider
      value={{
        setValue: update,
        value: groupValue,
      }}
    >
      {children}
    </radioGroupContext.Provider>
  );
}
