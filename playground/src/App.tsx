import { useEffect, useRef, useState } from "react";
import Button from "../area/button";
import ButtonGroup from "../area/buttonGroup";
import Slider from "../area/slider";
import Switch from "../area/switch";
import Tab from "../area/tab";
import Badge from "../area/badge";
import {
  LateralTransitions,
  MTab,
  MTabs,
  MButtonGroup,
  LateralTransition,
  type MLateralTransitionsRef,
  MButton,
} from "mdui";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const lateralTransitionsRef = useRef<MLateralTransitionsRef>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <input
          type="checkbox"
          defaultChecked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
        />
        <switch>黑暗模式</switch>
      </div>
      <MButtonGroup animation={false}>
        <MButton onClick={() => lateralTransitionsRef.current?.toPrev()}>
          上一页
        </MButton>
        <MButton onClick={() => lateralTransitionsRef.current?.toNext()}>
          下一页
        </MButton>
      </MButtonGroup>
      <MTabs>
        <MTab
          value="button"
          onClick={() => {
            lateralTransitionsRef.current?.update("button");
          }}
        >
          按钮
        </MTab>
        <MTab
          value="buttonGroup"
          onClick={() => {
            lateralTransitionsRef.current?.update("buttonGroup");
          }}
        >
          按钮组
        </MTab>
        <MTab
          value="badge"
          onClick={() => {
            lateralTransitionsRef.current?.update("badge");
          }}
        >
          徽标
        </MTab>
        <MTab
          value="slider"
          onClick={() => {
            lateralTransitionsRef.current?.update("slider");
          }}
        >
          滑块
        </MTab>
      </MTabs>
      <LateralTransitions ref={lateralTransitionsRef}>
        <LateralTransition value="button">
          <Button />
        </LateralTransition>
        <LateralTransition value="buttonGroup">
          <ButtonGroup />
        </LateralTransition>
        <LateralTransition value="badge">
          <Badge />
        </LateralTransition>
        <LateralTransition value="slider">
          <Slider />
        </LateralTransition>
      </LateralTransitions>
      <Switch />
    </div>
  );
}
