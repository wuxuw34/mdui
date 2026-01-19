import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MTabsContext } from "./context";
import "./tab.scss";
import { handleTabStyle } from "./tab-custom";
import useRipple from "../../hooks/useRipple";

export interface MTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
  value: string;
}

export function MTab(props: MTabProps) {
  const { children, value, icon, className, onClick, style, ...rest } = props;
  const context = useContext(MTabsContext);
  const tabRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const variant = useMemo(() => {
    return context.variant || "primary";
  }, [context]);
  const tabStyle = useMemo(() => {
    return handleTabStyle({ active: context.active === value, value, variant });
  }, [context, value, variant]);
  const toggle = useCallback(
    (i: boolean = false) => {
      if (tabRef.current && textRef.current) {
        context.toggle?.(
          value,
          variant === "primary"
            ? textRef.current.offsetWidth
            : tabRef.current.offsetWidth,
          tabRef.current,
          i,
        );
      }
    },
    [tabRef, textRef, context, value, variant],
  );
  useRipple(tabRef, {
    container: tabRef,
  });

  useEffect(() => {
    toggle(true);
    // 监听页面变化
    const handler = () => {
      toggle(true);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <div
      ref={tabRef}
      onClick={(e) => {
        toggle();
        onClick?.(e);
      }}
      className={tabStyle.className}
      role="tab"
      tabIndex={0}
      {...rest}
    >
      <div className="icon">{icon}</div>
      <div
        className="label"
        ref={textRef}
      >
        {children}
      </div>
    </div>
  );
}
