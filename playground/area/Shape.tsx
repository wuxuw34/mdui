import {
  MButton,
  MShape,
  type MShapeRef,
  type MShapeType,
  MDUI_SHAPES,
} from "mdui";
import Col from "./col";
import Grid from "./grid";
import { useRef } from "react";

const shapes: MShapeType[] = MDUI_SHAPES as MShapeType[];

export default function Shape() {
  const shapeRef = useRef<MShapeRef>(null);

  const changeShape = () => {
    shapeRef.current?.changeShape(
      shapes[Math.floor(Math.random() * shapes.length)],
    );
  };

  return (
    <Col>
      <MButton onClick={changeShape}>随机变化</MButton>
      <Grid>
        <MShape
          ref={shapeRef}
          style={{
            width: 100,
            height: 100,
          }}
        />
        {shapes.map((shape) => (
          <div key={shape}>
            <MShape
              shape={shape}
              style={{
                width: 100,
                height: 100,
              }}
            />
            {shape}
          </div>
        ))}
      </Grid>
    </Col>
  );
}
