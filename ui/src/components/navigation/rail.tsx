import { useState } from "react";
import { MButton } from "../button";
import type { MNavigationRailProps } from "./interface";
import "./rail.scss";
import useTextMeasure from "../../hooks/useTextMeasure";

export default function MNavigationRail({ menu }: MNavigationRailProps) {
  const [isOpen, setIsOpen] = useState(false); // 是否打开
  const textMeasure = useTextMeasure();

  return (
    <div
      className="mdui-navigation-rail"
      style={{
        width: isOpen ? 220 : 96,
      }}
    >
      <MButton
        variant="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <span className="material-icons">menu_open</span>
        ) : (
          <span className="material-icons">menu</span>
        )}
      </MButton>
      <MButton
        variant="text"
        className="mdui-navigation-header-button"
      >
        <span className="material-icons">mode_edit</span>
        <span
          className="mdui-navigation-header-button-text"
          style={{
            width: isOpen ? textMeasure.current.measureText("Edit") : 0,
          }}
        >
          Edit
        </span>
      </MButton>
      <div className="mdui-navigation-rail-menu">
        {menu.map((item) => (
          <div key={item.name}>
            <MButton
              variant="text"
              size={isOpen ? "md" : "sm"}
            >
              {item.icon}
              {isOpen && <span> {item.name}</span>}
            </MButton>
            {!isOpen && <span> {item.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
