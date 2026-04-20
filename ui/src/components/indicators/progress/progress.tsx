import { useEffect, useRef } from "react";
import { MProgressRenderer } from "./utils";
import type { MProgressProps } from "./interface";

export default function MProgress({
  variant = "wave",
  type = "line",
  radius = 10,
  progress = 0,
  amplitude,
  ...rest
}: MProgressProps) {
  const { style } = rest;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<MProgressRenderer>(null);

  useEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (canvasRef.current && rect) {
      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
    }
    rendererRef.current = new MProgressRenderer(canvasRef.current!, {
      barWidth: 10,
      progress: 10,
      type,
      variant,
      radius,
      amplitude,
    });
    rendererRef.current.render();
  }, [variant, type, radius, amplitude]);

  useEffect(() => {
    rendererRef.current?.updateProgress(progress);
  }, [progress]);

  return (
    <div
      ref={containerRef}
      {...rest}
      style={{
        height: 100,
        width: 400,
        ...style,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
