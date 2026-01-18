import {  useMemo, useRef } from "react";
import "./index.css";
import { handleSliderCustomStyle } from "./slider-curtom";
import useDraggable from "../../hooks/useDraggale";
import type { TOrientation, TSize } from "../../types";

export interface MSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "centered";
  orientation?: TOrientation;
  size?: TSize;
  value?: number;
  icon?: React.ReactNode;
}

export default function MSlider(props: MSliderProps) {
  const {
    variant = "standard",
    orientation = "horizontal",
    style,
    size,
    value = 50,
    className,
    icon,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const {
    targetRef: targetLeftRef,
    onPointerDown: onLeftPointerDown,
    position: leftPosition,
    onContainerPointerDown: onContainerLeftPointerDown,
  } = useDraggable(containerRef, {
    x: 50,
    y: 50,
  });
  const {
    targetRef: targetRightRef,
    onPointerDown: onRightPointerDown,
    position: rightPosition,
    onContainerPointerDown,
  } = useDraggable(
    containerRef,
    variant === "centered"
      ? {
          x: 50,
          y: 50,
        }
      : undefined,
  );
  const range = useMemo(() => {
    const key = orientation === "horizontal" ? "x" : "y";
    if (variant === "standard") {
      return [0, rightPosition[key]];
    }
    const min = Math.min(leftPosition[key], rightPosition[key]);
    const max = Math.max(leftPosition[key], rightPosition[key]);
    return [min, max];
  }, [leftPosition, rightPosition, variant]);
  const sliderStyle = useMemo(() => {
    return handleSliderCustomStyle({
      variant,
      className,
      size,
      orientation,
      range,
    });
  }, [variant, className, size, orientation, range]);

  return (
    <div
      ref={containerRef}
      className={sliderStyle.className}
      style={{
        ...sliderStyle.style,
        ...style,
      }}
      onPointerDown={(e) => {
        if (variant === "standard") {
          onContainerPointerDown(e);
        } else if (variant === "centered") {
          onContainerLeftPointerDown(e);
        }
      }}
      {...rest}
    >
      {variant !== "standard" ? (
        <>
          <div
            className="track-container"
            style={sliderStyle.ftrackStyle}
            ref={targetLeftRef}
            onPointerDown={onLeftPointerDown}
          >
            <div className={sliderStyle.ftrackcs}>
              <div
                className={`dot ${orientation === "horizontal" ? "left" : "top"}`}
              ></div>
            </div>
          </div>
          <div
            className={sliderStyle.ltcs}
            style={sliderStyle.ltStyle}
            ref={targetLeftRef}
            onPointerDown={onLeftPointerDown}
          ></div>
        </>
      ) : null}
      <div
        className="track-container"
        style={sliderStyle.strackStyle}
      >
        <div className={sliderStyle.strackcs}>
          {variant === "standard" && orientation === "horizontal" && (
            <div className="icon">{icon}</div>
          )}
          <div
            className={`dot ${orientation === "horizontal" ? "right" : "top"}`}
            style={{
              opacity: !icon ? 0 : 1,
            }}
          ></div>
        </div>
      </div>
      <div
        className={sliderStyle.rtcs}
        style={sliderStyle.rtStyle}
        ref={variant !== "centered" ? targetRightRef : undefined}
        onPointerDown={variant !== "centered" ? onRightPointerDown : undefined}
      ></div>
      <div
        style={sliderStyle.ttrackStyle}
        className="track-container"
      >
        <div className={sliderStyle.ttrackcs}>
          {variant === "standard" && orientation === "vertical" && (
            <div className="icon">{icon}</div>
          )}
          <div
            className={`dot ${orientation === "horizontal" ? "right" : "bottom"}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
