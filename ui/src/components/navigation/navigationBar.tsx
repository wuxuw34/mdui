import { MBadge } from "../badge";
import { MButton } from "../button";
import type { MNavigationBarProps } from "./interface";
import "./index.scss";
import { useState } from "react";
import clsx from "clsx";

export default function MNavigationBar({
  apps = [],
  orientation = "vertical",
}: MNavigationBarProps) {
  const [activeApp, setActiveApp] = useState<string | null>(null);

  return (
    <div className={"mdui-app-bar-container " + orientation}>
      {apps.map((app) => (
        <div
          className={clsx({
            "mdui-app-bar-app-item": true,
            active: activeApp === app.name,
          })}
          key={app.name}
          onClick={() => setActiveApp(app.name)}
        >
          <MButton
            variant="text"
            size="sm"
            selected={activeApp === app.name}
            radiusInverse={true}
          >
            <MBadge>{app.icon}</MBadge>
          </MButton>
          <span className="mdui-m-l-1">{app.name}</span>
        </div>
      ))}
    </div>
  );
}
