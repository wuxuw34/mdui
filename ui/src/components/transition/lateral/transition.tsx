import { useContext, useEffect, useMemo, useRef } from "react";
import "./transition.scss";
import { handleLateralTransitionStyle } from "./transition-custom";
import { LateralTransitionsContext } from "./context";

export interface MLateralTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  value: string;
}

export default function Transition(props: MLateralTransitionProps) {
  const { children, className, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(LateralTransitionsContext);
  const transitionStyle = useMemo(() => {
    return handleLateralTransitionStyle({ className });
  }, [className]);

  useEffect(() => {
    // 注册这个页面
    context?.registerPage({
      value: props.value,
      el: ref.current,
    });
  }, [props.value, ref]);

  return (
    <div
      {...rest}
      ref={ref}
      className={transitionStyle.className}
    >
      {children}
    </div>
  );
}
