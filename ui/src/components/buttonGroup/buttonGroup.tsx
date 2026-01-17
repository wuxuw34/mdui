import React, { useEffect, useRef, useState } from "react";
import buttonGroupVariants from "./variants";
import "./index.css";
import { cn } from "../../utils/cn";
import mButtonGroupContext from "./context";

export interface MButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "standard" | "split" | "segmented";
  gap?: number;
  animation?: boolean;
  amount?: number;
}

export default function MbuttonGroup({
  children,
  orientation = "horizontal",
  className,
  animation = true,
  amount = 20,
  variant = "default",
  ...rest
}: MButtonGroupProps) {
  const childrenArr = React.Children.toArray(children);
  const groupRef = useRef<HTMLDivElement>(null);
  const [cache, setCache] = useState({
    current: "",
    pre: "",
    next: "",
  });

  function setCurrent(id: string) {
    if (!animation) return;
    const children = Array.from(
      groupRef.current?.children || []
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
        groupRef.current?.children || []
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
      }}
    >
      <div
        role="group"
        ref={groupRef}
        className={cn(
          buttonGroupVariants({
            orientation,
            className,
            variant,
          })
        )}
        {...rest}
      >
        {childrenArr}
      </div>
    </mButtonGroupContext.Provider>
  );
}
