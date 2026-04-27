import { MBadge } from "../badge";
import { MButton } from "../button";
import type { MNavigationBarProps } from "./interface";
import "./index.scss";
import { useState } from "react";
import clsx from "clsx";

export default function MNavigationBar({
  apps = [],
  labelPosition = "bottom",
  itemWidth,
  className,
  ...rest
}: MNavigationBarProps) {
  const [activeApp, setActiveApp] = useState<string | null>(null);

  return (
    <div
      className={
        "mdui-app-bar-container " +
        clsx({
          "width-limit": itemWidth !== undefined,
        }) +
        " " +
        (className ? className : "")
      }
      {...rest}
    >
      {apps.map((app) => (
        <div
          className={clsx({
            "mdui-app-bar-app-item": true,
            active: activeApp === app.name,
          })}
          style={{
            width: itemWidth,
          }}
          key={app.name}
          onClick={() => setActiveApp(app.name)}
        >
          <MButton
            variant="text"
            size="sm"
            selected={activeApp === app.name}
          >
            <MBadge
              value={app.value}
              showValue={app.showValue}
              variant={app.value && app.showValue ? "large" : "small"}
            >
              <div className="mdui-navigation-bar-icon ">{app.icon}</div>
              {labelPosition === "right" && (
                <span className="mdui-m-l-1">{app.name}</span>
              )}
            </MBadge>
          </MButton>
          {labelPosition === "bottom" && (
            <span className="mdui-m-l-1">{app.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}
