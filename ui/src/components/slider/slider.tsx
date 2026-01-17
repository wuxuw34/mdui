import { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import {
  inputVariants,
  sliderVariants,
  thumbVariants,
  trackVariants,
} from "./variants";
import "./index.css";

interface MSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  orientation?: "horizontal" | "vertical";
  size?: number;
}

export default function MSlider({
  orientation = "horizontal",
  className,
  size = 12,
  ...rest
}: MSliderProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    function updateContainerHeight() {
      setContainerHeight(containerRef.current?.offsetHeight || 0);
    }
    updateContainerHeight();
  }, []);

  return (
    <div
      role="slider"
      ref={containerRef}
      className={cn(sliderVariants({ orientation, className }))}
      style={
        {
          "--color": "var(--primary)",
        } as React.CSSProperties
      }
      {...rest}
    >
      <input
        type="range"
        className={cn(inputVariants({ orientation }))}
        defaultValue={currentValue}
        onChange={(e) => {
          setCurrentValue(Number(e.target.value));
        }}
        style={{
          width: orientation === "horizontal" ? "100%" : containerHeight + "px",
        }}
      />
      <div
        className={cn(trackVariants({ orientation }))}
        style={
          {
            "--size": `${size}px`,
            ...(orientation === "vertical"
              ? {
                  height: `calc(${currentValue}% - 4px)`,
                }
              : {
                  width: `calc(${currentValue}% - 4px)`,
                }),
          } as unknown as React.CSSProperties
        }
      ></div>
      <div
        className="relative min-w-[4px] flex flex-col items-center justify-center pointer-events-none"
        style={{
          ...(orientation === "vertical"
            ? {
                width: `${size + 4}px`,
              }
            : {
                height: `${size + 4}px`,
              }),
        }}
      >
        <div className={cn(thumbVariants({ orientation }))}></div>
      </div>
      <div
        className={cn(trackVariants({ orientation }))}
        style={
          {
            ...(orientation === "horizontal"
              ? {
                  width: `calc(${100 - currentValue}% - 4px)`,
                }
              : {
                  height: `calc(${100 - currentValue}% - 4px)`,
                }),
            "--size": `${size}px`,
          } as unknown as React.CSSProperties
        }
      ></div>
    </div>
  );
}
