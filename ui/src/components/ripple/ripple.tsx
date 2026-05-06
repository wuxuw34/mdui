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

export default function MRipple({
  disabled = false,
  children,
  color,
}: MRippleProps) {
  const domRef = useRef<HTMLElement>(null);
  const id = useId();
  const rippleId = `ripple-${id}`;
  const { setEnabled } = useRipple(domRef, {
    container: rippleId,
    color: color || "rgba(0, 0, 0, 0.12)",
  });

  useEffect(() => {
    setEnabled(!disabled);
    if (!domRef.current) return;
    if (
      children &&
      isValidElement(children) &&
      typeof (
        children.props as {
          ref: (ref: HTMLElement | null) => void;
        }
      ).ref === "function"
    ) {
      (
        children.props as {
          ref: (ref: HTMLElement | null) => void;
        }
      ).ref(domRef.current);
    }
    domRef.current.style.position = "relative";
    let rippleContainer = domRef.current?.querySelector("#" + rippleId);
    if (!rippleContainer) {
      rippleContainer = document.createElement("div");
      rippleContainer.id = rippleId;
      rippleContainer.className = "mdui-ripple";
      domRef.current.insertBefore(
        rippleContainer,
        domRef.current.firstChild || null,
      );
    }
  }, [disabled, setEnabled, rippleId, children]);

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
