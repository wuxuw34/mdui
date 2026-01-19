import { useEffect, useState } from "react";
import Button from "../area/button";
import ButtonGroup from "../area/buttonGroup";
import Slider from "../area/slider";
import Switch from "../area/switch";
import Tab from "../area/tab";
import Badge from "../area/badge";

export default function App() {
  const [isDark, setIsDark] = useState(false);

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
      <Badge />
      <Tab />
      <Button />
      <ButtonGroup />
      <Slider />
      <Switch />
    </div>
  );
}
