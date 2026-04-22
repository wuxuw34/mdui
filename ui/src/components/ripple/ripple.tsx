import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
} from "react";
import type { MRippleProps } from "./interface";
import useRipple from "../../hooks/useRipple";
import "./ripple.scss";

export default function MRipple({ disabled = false, children }: MRippleProps) {
  const domRef = useRef<HTMLElement>(null);
  const id = useId();
  const rippleId = `ripple-${id}`;
  const { setEnabled } = useRipple(domRef, {
    container: rippleId,
  });

  useEffect(() => {
    setEnabled(!disabled);
    if (!domRef.current) return;
    domRef.current.style.position = "relative";
    let rippleContainer = domRef.current?.querySelector("#" + rippleId);
    if (!rippleContainer) {
      rippleContainer = document.createElement("div");
      rippleContainer.id = rippleId;
      rippleContainer.className = "mdui-ripple";
      domRef.current.insertBefore(rippleContainer, domRef.current.firstChild || null);
    }
  }, [disabled, setEnabled, rippleId]);

  if (Children.count(children) > 1 || !isValidElement(children)) {
    console.warn("MRipple component only accepts one child");
    return null;
  }

  if (!children || disabled) {
    return <>{children}</>;
  }

  return (
    <>
      {cloneElement(children, {
        ref: domRef,
      } as {
        ref: React.Ref<HTMLElement>;
      })}
    </>
  );
}
