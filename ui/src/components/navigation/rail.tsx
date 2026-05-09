import { useState } from "react";
import { MButton } from "../button";
import type { MNavigationRailProps } from "./interface";
import "./rail.scss";
import useTextMeasure from "../../hooks/useTextMeasure";
import { MBadge } from "../badge";
import { createPortal } from "react-dom";
import { MOverlay } from "../overlay";

export function MNavigationRailInner({
  menu,
  onMenuChange,
  onOpenChange,
  open,
}: MNavigationRailProps) {
  const [isOpen, setIsOpen] = useState(open); // 是否打开
  const textMeasure = useTextMeasure();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [widths, setWidths] = useState<
    {
      id: string;
      iconWidth: number;
      labelWidth: number;
    }[]
  >([]);

    console.log("MNavigationRail", open);

  const getCurrentWidth = (id: string) => {
    const item = widths.find((width) => width.id === id);
    return item ? item.iconWidth + item.labelWidth + (isOpen ? 28 : 20) : 0;
  };

  return (
    <div
      className="mdui-navigation-rail"
      style={{
        width: isOpen ? 220 : 96,
      }}
    >
      <MButton
        variant="icon"
        onClick={() => {
          setIsOpen(!isOpen);
          onOpenChange?.(!isOpen);
        }}
      >
        {isOpen ? (
          <span className="material-icons">menu_open</span>
        ) : (
          <span className="material-icons">menu</span>
        )}
      </MButton>
      <MButton
        variant="filled"
        shape="square"
        aspectRatio={isOpen ? "wide" : "square"}
        style={{
          padding: "0 16px",
        }}
        className="mdui-navigation-header-button"
      >
        <span className="material-icons">mode_edit</span>
        {isOpen && (
          <div className="mdui-navigation-header-button-text">Edit</div>
        )}
      </MButton>
      <div className="mdui-navigation-rail-menu">
        {menu.map((item) => (
          <div
            key={item.name}
            className="mdui-navigation-rail-menu-item"
            onClick={() => setActiveMenu(item.name)}
          >
            <MButton
              variant={activeMenu === item.name ? "tonal" : "text"}
              size="sm"
              onClick={() => onMenuChange && onMenuChange(item)}
              style={{
                height: isOpen ? 56 : 40,
                padding: "0 16px",
                borderRadius: isOpen ? 28 : 20,
                width: isOpen ? getCurrentWidth(item.name) : 56,
              }}
            >
              <MBadge>
                <div
                  className="mdui-navigation-rail-menu-item__icon"
                  ref={(ref) => {
                    if (ref) {
                      setWidths((prev) => {
                        const index = prev.findIndex((p) => p.id === item.name);
                        if (index !== -1) {
                          if (prev[index].iconWidth === ref.clientWidth) {
                            return prev;
                          }
                          prev[index].iconWidth = ref.clientWidth;
                          prev[index].labelWidth =
                            textMeasure.current.measureText(item.name);
                          return [...prev];
                        } else {
                          return [
                            ...prev,
                            {
                              id: item.name,
                              iconWidth: ref.clientWidth,
                              labelWidth: textMeasure.current.measureText(
                                item.name,
                              ),
                            },
                          ];
                        }
                      });
                    }
                  }}
                >
                  {item.icon}
                </div>
              </MBadge>
              {isOpen && (
                <div className="mdui-navigation-rail-menu-item__label ">
                  {item.name}
                </div>
              )}
            </MButton>
            {!isOpen && (
              <div className="mdui-navigation-rail-menu-item__label">
                {" "}
                {item.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MNavigationRail({
  expandMode = "standard",
  as = "rail",
  onOpenChange,
  open = false,
  ...rest
}: MNavigationRailProps) {
  const [isOpen, setIsOpen] = useState(open); // 是否打开



  if (expandMode === "standard") {
    return <MNavigationRailInner open={isOpen} {...rest} />;
  }

  const handleOpenChange = (v: boolean) => {
    onOpenChange?.(v);
    console.log("handleOpenChange", v);
    setIsOpen(v);
  };

  return (
    <>
      {as === "rail" && (
        <MNavigationRailInner
          onOpenChange={handleOpenChange}
          {...rest}
        />
      )}
      {createPortal(
        <>
          <MOverlay show={isOpen}>
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <MNavigationRailInner
                onOpenChange={handleOpenChange}
                open={isOpen}
                {...rest}
              />
            </div>
          </MOverlay>
        </>,
        document.body,
      )}
    </>
  );
}
