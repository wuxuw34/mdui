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
import Card from "../area/card";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const lateralTransitionsRef = useRef<MLateralTransitionsRef>(null);
  const [active, setActive] = useState("button");

  useEffect(() => {
    // 读取
    const set = (v: string) => {
      setActive(v);
    };
    const v = localStorage.getItem("tab");
    set(v || "button");
  }, []);

  useEffect(() => {
    // 缓存到本地
    localStorage.setItem("tab", active);
  }, [active]);

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
      <MButtonGroup
        animation={false}
        value={active}
      >
        <MButton onClick={() => lateralTransitionsRef.current?.toPrev()}>
          上一页
        </MButton>
        <MButton onClick={() => lateralTransitionsRef.current?.toNext()}>
          下一页
        </MButton>
      </MButtonGroup>
      <MTabs value={active}>
        <MTab
          value="button"
          onClick={() => {
            setActive("button");
          }}
        >
          按钮
        </MTab>
        <MTab
          value="buttonGroup"
          onClick={() => {
            setActive("buttonGroup");
          }}
        >
          按钮组
        </MTab>
        <MTab
          value="badge"
          onClick={() => {
            setActive("badge");
          }}
        >
          徽标
        </MTab>
        <MTab
          value="slider"
          onClick={() => {
            setActive("slider");
          }}
        >
          滑块
        </MTab>
        <MTab
          value="card"
          onClick={() => {
            setActive("card");
          }}
        >
          卡片
        </MTab>
      </MTabs>
      <LateralTransitions
        ref={lateralTransitionsRef}
        value={active}
        onValueChange={(v) => {
          setActive(v);
        }}
      >
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
        <LateralTransition value="card">
          <Card />
        </LateralTransition>
      </LateralTransitions>
      <Switch />
    </div>
  );
}
