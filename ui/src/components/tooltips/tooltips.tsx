import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/react";
import type { MTooltipsPropsWithVariant } from "./interface";
import "./tooltips.scss";

export default function MTooltips({
  variant = "plain",
  mode = "hover",
  position = "top",
  trigger,
  children,
  title,
  content,
  footer,
  className,
  style,
  ...rest
}: MTooltipsPropsWithVariant) {
  const tooltipId = useId();
  const [visible, setVisible] = useState(false);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const reference = referenceRef.current;
    const floating = floatingRef.current;

    if (!reference || !floating) {
      return;
    }

    computePosition(reference, floating, {
      placement: position,
      middleware: [offset(8), flip(), shift({ padding: 8 })],
    }).then(({ x, y }) => {
      Object.assign(floating.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }, [position]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }, []);

  const showTooltip = useCallback(() => {
    clearCloseTimer();
    setVisible(true);
  }, [clearCloseTimer]);

  const hideTooltip = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setVisible(false);
    }, 80);
  }, [clearCloseTimer]);

  function handleTriggerClick() {
    if (mode !== "click") {
      return;
    }

    setVisible((current) => !current);
  }

  useEffect(() => {
    if (!visible) {
      return;
    }

    const reference = referenceRef.current;
    const floating = floatingRef.current;

    if (!reference || !floating) {
      return;
    }

    updatePosition();

    return autoUpdate(reference, floating, updatePosition);
  }, [updatePosition, visible]);

  useEffect(() => {
    if (!visible || mode !== "click") {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setVisible(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [mode, visible]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setVisible(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <div
      {...rest}
      className={["mdui-tooltips", className].filter(Boolean).join(" ")}
      data-mode={mode}
      data-open={visible}
      data-position={position}
      data-variant={variant}
      ref={rootRef}
      style={style}
    >
      <div
        aria-describedby={visible ? tooltipId : undefined}
        className="mdui-tooltips-trigger"
        onBlur={mode !== "click" ? hideTooltip : undefined}
        onClick={handleTriggerClick}
        onFocus={mode !== "click" ? showTooltip : undefined}
        ref={referenceRef}
        tabIndex={0}
        onMouseEnter={mode === "hover" ? showTooltip : undefined}
        onMouseLeave={mode === "hover" ? hideTooltip : undefined}
      >
        {trigger}
      </div>
      {visible && (
        <div
          className="mdui-tooltips-content"
          id={tooltipId}
          ref={floatingRef}
          role="tooltip"
        >
          {children}
          {title && <div className="mdui-tooltips-title">{title}</div>}
          {content && <div className="mdui-tooltips-content">{content}</div>}
          {footer && <div className="mdui-tooltips-footer">{footer}</div>}
        </div>
      )}
    </div>
  );
}
