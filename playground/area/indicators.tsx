import { MLoader, MProgress } from "mdui";
import Col from "./col";
import { useEffect, useState } from "react";

export default function Indicators() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
  }, []);

  return (
    <Col>
      <MProgress
        progress={progress}
        amplitude={0.3}
      />
      <MProgress
        variant="standard"
        progress={progress}
      />
      <MProgress
        type="circle"
        variant="standard"
        radius={30}
        style={{
          height: 100,
          width: 100,
        }}
        progress={progress}
      />
      <MProgress
        type="circle"
        variant="wave"
        radius={30}
        style={{
          height: 100,
          width: 100,
        }}
        progress={progress}
      />
      <MLoader />
      <MLoader variant="contained" />
    </Col>
  );
}
