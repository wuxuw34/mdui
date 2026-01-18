import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { handleSliderCustomStyle } from "./slider-curtom";
import useDraggable from "../../hooks/useDraggale";

export interface MSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "Standard" | "Centered";
  orientation?: TOrientation;
  size?: TSize;
  value?: number;
  icon?: React.ReactNode;
}

export default function MSlider(props: MSliderProps) {
  const {
    variant = "Standard",
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
    variant === "Centered"
      ? {
          x: 50,
          y: 50,
        }
      : undefined,
  );
  const range = useMemo(() => {
    const key = orientation === "horizontal" ? "x" : "y";
    if (variant === "Standard") {
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
        if (variant === "Standard") {
          onContainerPointerDown(e);
        } else if (variant === "Centered") {
          onContainerLeftPointerDown(e);
        }
      }}
      {...rest}
    >
      {variant !== "Standard" && (
        <div
          style={sliderStyle.fstyle}
          className={sliderStyle.lccs}
        >
          <div className={sliderStyle.fcs}></div>
          <div
            ref={targetLeftRef}
            onPointerDown={onLeftPointerDown}
            className={sliderStyle.lcs}
          ></div>
        </div>
      )}
      <div
        style={sliderStyle.sstyle}
        className={sliderStyle.rccs}
      >
        <div className={sliderStyle.ccs}>
          <div
            style={{
              marginLeft: 12,
            }}
          >
            {icon}
          </div>
        </div>
        <div
          ref={variant !== "Centered" ? targetRightRef : undefined}
          onPointerDown={
            variant !== "Centered" ? onRightPointerDown : undefined
          }
          className={sliderStyle.rcs}
        ></div>
      </div>
      <div
        className="container"
        style={sliderStyle.tstyle}
      >
        <div className={sliderStyle.tcs}></div>
      </div>
    </div>
  );
}
