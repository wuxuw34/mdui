import { useEffect, useRef } from "react";
import { MProgressRenderer } from "./utils";
import type { MProgressProps } from "./interface";

export default function MProgress({ options, type = 'line', ...rest }: MProgressProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<MProgressRenderer>(null);

  useEffect(() => {
    rendererRef.current = new MProgressRenderer(canvasRef.current!, {
      barWidth: 10,
      progress: 10,
      type: type,
      ...options,
    });
    rendererRef.current.render();
  }, [options]);

  return (
    <div {...rest}>
      <canvas
        ref={canvasRef}
        width={400}
        height={50}
      />
    </div>
  );
}
