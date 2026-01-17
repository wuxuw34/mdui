import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import mButtonGroupContext from "./context";
import { handleButtonGroupCustomStyle } from "./buttonGroup-custom";

export interface MButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "standard" | "connected";
  animation?: boolean;
  gap?: TSize;
  amount?: number;
}

export default function MbuttonGroup({
  children,
  orientation = "horizontal",
  className,
  animation = true,
  amount = 10,
  variant = "default",
  gap = "md",
  style,
  ...rest
}: MButtonGroupProps) {
  const childrenArr = React.Children.toArray(children);
  const groupRef = useRef<HTMLDivElement>(null);
  const [cache, setCache] = useState({
    current: "",
    pre: "",
    next: "",
  });
  const buttonGroupStyle = useMemo<{
    className: string;
    style: React.CSSProperties;
  }>(() => {
    return handleButtonGroupCustomStyle({
      variant,
      className,
      orientation,
      amount,
      gap,
    });
  }, [variant, className, orientation, amount, gap]);

  function setCurrent(id: string) {
    if (!animation) return;
    const children = Array.from(
      groupRef.current?.children || [],
    ) as HTMLElement[];
    let index = -1;
    for (const child of children) {
      if (child.dataset.id === id) {
        index = children.indexOf(child);
        break;
      }
    }
    if (index === -1) return;
    let current = "",
      pre = "",
      next = "";
    const currentEl = children[index] as HTMLElement;
    current = currentEl.dataset.id || "";

    if (index > 0) {
      // 有pre
      pre = children[index - 1].dataset.id || "";
    }
    if (index < children.length - 1) {
      // 有next
      next = children[index + 1].dataset.id || "";
    }

    setCache({
      current: current,
      pre: pre,
      next: next,
    });
  }

  useEffect(() => {
    if (!animation) return;
    const clickerHandler = (e: MouseEvent) => {
      const children = Array.from(
        groupRef.current?.children || [],
      ) as HTMLElement[];
      let index = -1,
        id = "";
      for (const child of children) {
        if (child.contains(e.target as Node)) {
          index = children.indexOf(child);
          id = child.dataset.id || "";
          break;
        }
      }
      if (index === -1) return;
      setCurrent(id);
    };
    groupRef.current?.addEventListener("click", clickerHandler);
    return () => {
      groupRef.current?.removeEventListener("click", clickerHandler);
    };
  }, [animation]);

  return (
    <mButtonGroupContext.Provider
      value={{
        current: cache.current,
        pre: cache.pre,
        next: cache.next,
        setCurrent,
        orientation,
        amount,
        variant,
        animation,
      }}
    >
      <div
        role="group"
        ref={groupRef}
        className={buttonGroupStyle.className}
        style={{
          ...buttonGroupStyle.style,
          ...style,
        }}
        {...rest}
      >
        {childrenArr}
      </div>
    </mButtonGroupContext.Provider>
  );
}
