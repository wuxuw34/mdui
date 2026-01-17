import { MbuttonGroup, Mbutton } from "mdui";
import { useState } from "react";

export default function ButtonsGroup() {
  const [activeItems, setActiveItems] = useState<number[]>([]);
  const [animation, setAnimation] = useState(true);

  return (
    <div className="flex flex-col gap-2">
      <div>按钮组</div>
      <div>
        <input
          type="checkbox"
          defaultChecked={animation}
          onChange={() => setAnimation(!animation)}
        />
        <switch>启用动画</switch>
      </div>
      <MbuttonGroup animation={animation}>
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
      <MbuttonGroup
        orientation="vertical"
        animation={animation}
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
      <div>标准按钮</div>
      <MbuttonGroup
        variant="standard"
        animation={animation}
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
      <div>连接按钮</div>
      <MbuttonGroup
        animation={false}
        variant="connected"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Mbutton
            key={index}
            outline={false}
            variant="filled"
            selected={activeItems.includes(index)}
            className="outline-offset-0!"
          >
            按钮{index + 1}
          </Mbutton>
        ))}
      </MbuttonGroup>
    </div>
  );
}
