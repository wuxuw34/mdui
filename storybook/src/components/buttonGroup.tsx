import { MButtonGroup, type MButtonGroupProps, MButton } from "mdui";
import { useState } from "react";

export default function ButtonGroup(props: MButtonGroupProps) {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  return (
    <MButtonGroup {...props}>
      {Array.from({ length: 3 }).map((_, index) => (
        <MButton
          key={index}
          onClick={() => {
            setActiveItems([index]);
          }}
          selected={activeItems.includes(index)}
        >
          button {index + 1}
        </MButton>
      ))}
    </MButtonGroup>
  );
}
