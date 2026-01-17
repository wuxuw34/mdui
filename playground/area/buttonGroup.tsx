import { useState } from "react";
import { MbuttonGroup, Mbutton } from "mdui";

export default function ButtonsGroup() {
  const [activeItems, setActiveItems] = useState<number[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <div>按钮组</div>
      <div>默认按钮</div>
      <MbuttonGroup>
        {Array.from({ length: 3 }).map((_, index) => (
          <Mbutton
            key={index}
            onClick={() => {
              setActiveItems([index]);
            }}
            outline={false}
            selected={activeItems.includes(index)}
          >
            按钮{index + 1}
          </Mbutton>
        ))}
      </MbuttonGroup>
      <MbuttonGroup orientation="vertical">
        {Array.from({ length: 3 }).map((_, index) => (
          <Mbutton
            key={index}
            onClick={() => {
              setActiveItems([index]);
            }}
            outline={false}
            selected={activeItems.includes(index)}
          >
            按钮{index + 1}
          </Mbutton>
        ))}
      </MbuttonGroup>
      <div>标准按钮</div>
      <MbuttonGroup
        variant="standard"
        animation
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Mbutton
            key={index}
            onClick={() => {
              setActiveItems([index]);
            }}
            outline={false}
            selected={activeItems.includes(index)}
          >
            按钮{index + 1}
          </Mbutton>
        ))}
      </MbuttonGroup>
      <div>分割按钮</div>
      <MbuttonGroup
        animation={false}
        variant="segmented"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Mbutton
            key={index}
            outline={false}
            variant="outline"
            selected={index === 1}
            className="outline-offset-0!"
          >
            按钮{index + 1}
          </Mbutton>
        ))}
      </MbuttonGroup>
    </div>
  );
}
