import { MSlider } from "mdui";
import Row from "./row";
import Col from "./col";
import { useState } from "react";
import { AudioLinesIcon } from "lucide-react";

export default function Slider() {
  const [vertical, setVertical] = useState(false);
  return (
    <Col>
      <div>滑块</div>
      <Row>
        <input
          type="checkbox"
          defaultChecked={vertical}
          onChange={(e) => setVertical(e.target.checked)}
        />
        纵向
      </Row>
      <Row className={`${vertical ? "min-h-[150px]" : ""}`}>
        标准滑块
        <MSlider
          orientation={vertical ? "vertical" : "horizontal"}
          icon={<AudioLinesIcon />}
        />
      </Row>
      <Row className={`${vertical ? "min-h-[150px]" : ""}`}>
        居中滑块
        <MSlider
          variant="Centered"
          orientation={vertical ? "vertical" : "horizontal"}
        />
      </Row>
    </Col>
  );
}
