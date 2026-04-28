import { useEffect, useRef, useState, Suspense, lazy } from "react";

import "material-icons/iconfont/material-icons.css";
import {
  LateralTransitions,
  MTab,
  MTabs,
  MButtonGroup,
  LateralTransition,
  type MLateralTransitionsRef,
  MButton,
  MSheetProvider,
} from "mdui";
import Indicators from "../area/indicators";
import { Apps } from "./apps";

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
    <MSheetProvider>
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
          {Apps.map((app) => (
            <MTab
              value={app.key}
              key={app.key}
              onClick={() => {
                setActive(app.key);
              }}
            >
              {app.name}
            </MTab>
          ))}
        </MTabs>
        <LateralTransitions
          ref={lateralTransitionsRef}
          value={active}
          onValueChange={(v) => {
            setActive(v);
          }}
        >
          <LateralTransition value="indicators">
            <Indicators />
          </LateralTransition>
          {Apps.map((app) => {
            const Component = lazy(app.component);
            return (
              <LateralTransition
                key={app.key}
                value={app.key}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              </LateralTransition>
            );
          })}
        </LateralTransitions>
      </div>
    </MSheetProvider>
  );
}
