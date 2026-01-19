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

export interface MTabProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  icon?: React.ReactNode;
  value: string;
}

export function MTab(props: MTabProps) {
  const { children, value, icon, className, style, ...rest } = props;
  const context = useContext(MTabsContext);
  const tabRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tabStyle = useMemo(() => {
    return handleTabStyle({ active: context.active === value, value });
  }, [context, value]);
  const toggle = useCallback(
    (i: boolean = false) => {
      if (tabRef.current && textRef.current) {
        context.toggle?.(value, textRef.current.offsetWidth, tabRef.current, i);
      }
    },
    [tabRef, textRef, context, value],
  );

  useEffect(() => {
    toggle(true);
  }, []);

  return (
    <div
      ref={tabRef}
      onClick={() => {
        toggle();
      }}
      className={tabStyle.className}
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
