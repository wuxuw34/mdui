import { useEffect, useRef } from "react";
import "./loader.scss";
import { MShape, type MShapeRef, type MShapeType } from "../../shape";
import type { MLoaderProps } from "./interface";
import clsx from "clsx";

const loader_shapes: MShapeType[] = [
  "pill",
  "sevenSidedCookie",
  "nineSidedCookie",
  "oval",
  "sunny",
  "softBurst",
  "fourSidedCookie",
];

export default function MLoader({ variant = "default" }: MLoaderProps) {
  const shapeRef = useRef<MShapeRef>(null);
  const timeRef = useRef<NodeJS.Timeout>(null);
  const currentShape = useRef<MShapeType>(loader_shapes[0]);

  const render = () => {
    timeRef.current = setTimeout(() => {
      shapeRef.current?.changeShape(currentShape.current);
      const index = loader_shapes.indexOf(currentShape.current);
      currentShape.current = loader_shapes[
        (index + 1) % loader_shapes.length
      ] as MShapeType;
      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = null;
      }
      render();
    }, 1000);
  };

  useEffect(() => {
    render();
  }, []);

  return (
    <div
      className={clsx("mdui-loader", {
        contained: variant === "contained",
      })}
    >
      <MShape
        ref={shapeRef}
        size={38}
      />
    </div>
  );
}
