import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import "./index.css";
import { handleSliderCustomStyle } from "./slider-curtom";
import useDraggable from "../../hooks/useDraggale";

export interface MSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "";
  size: TSize;
}

export default function MSlider(props: MSliderProps) {
  const { variant, style, size, className, ...rest } = props;
  const sliderStyle = useMemo(() => {
    return handleSliderCustomStyle({
      variant,
      className,
      size,
    });
  }, [variant, className, size]);
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    targetRef: targetLeftRef,
    onPointerDown: onLeftPointerDown,
    position: leftPosition,
  } = useDraggable(containerRef);
  const {
    targetRef: targetRightRef,
    onPointerDown: onRightPointerDown,
    position: rightPosition,
  } = useDraggable(containerRef);

  return (
    <div
      ref={containerRef}
      className={sliderStyle.className}
      style={{
        ...sliderStyle.style,
        ...style,
      }}
      {...rest}
    >
      <div
        className={`track inactive`}
        style={{
          width: `${leftPosition.x}%`,
        }}
      ></div>
      <div
        className={`track active`}
        style={{
          width: `${rightPosition.x - leftPosition.x}%`,
        }}
      ></div>
      <div
        ref={targetRightRef}
        onPointerDown={onRightPointerDown}
        className="thumb"
      ></div>
      <div
        className={`track inactive`}
        style={{
          width: `${100 - rightPosition.x}%`,
        }}
      ></div>
    </div>
  );
}
