import { MButtonGroup, MButton } from "mdui";
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
        <span>启用动画</span>
      </div>
      <MButtonGroup animation={animation}>
        {Array.from({ length: 3 }).map((_, index) => (
          <MButton
            key={index}
            onClick={() => {
              setActiveItems([index]);
            }}
            selected={activeItems.includes(index)}
          >
            按钮{index + 1}
          </MButton>
        ))}
      </MButtonGroup>
      <MButtonGroup
        orientation="vertical"
        animation={animation}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <MButton
            key={index}
            onClick={() => {
              setActiveItems([index]);
            }}
            selected={activeItems.includes(index)}
          >
            按钮{index + 1}
          </MButton>
        ))}
      </MButtonGroup>
      <div>标准按钮</div>
      <MButtonGroup
        variant="standard"
        animation={animation}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <MButton
            key={index}
            onClick={() => {
              setActiveItems([index]);
            }}
            selected={activeItems.includes(index)}
          >
            按钮{index + 1}
          </MButton>
        ))}
      </MButtonGroup>
      <div>连接按钮</div>
      <MButtonGroup
        animation={false}
        variant="connected"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <MButton
            key={index}
            variant="filled"
            selected={activeItems.includes(index)}
            className="outline-offset-0!"
          >
            按钮{index + 1}
          </MButton>
        ))}
      </MButtonGroup>
    </div>
  );
}
