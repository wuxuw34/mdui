import { AudioLines, Image, Video } from "lucide-react";
import { MTabs, MTab, MBadge } from "mdui";
import Col from "./col";
import { useState } from "react";

const ITabs = ({
  isSecondary = false,
}:{
  isSecondary?: boolean 
}) => {
  const [value, setValue] = useState("2");
  return (
    <MTabs
      value={value}
      onValueChange={(v) => {
        setValue(v);
      }}
      variant={isSecondary ? "secondary" : "primary"}
    >
      <MTab
        value="1"
        icon={
          <MBadge>
            <Video />
          </MBadge>
        }
      >
        Video
      </MTab>
      <MTab
        value="2"
        icon={<Image />}
      >
        Photos
      </MTab>
      <MTab
        value="3"
        icon={<AudioLines />}
      >
        Audio
      </MTab>
      {Array.from({ length: 5 }).map((_, i) => (
        <MTab
          key={i + 4 + ""}
          value={(i + 4).toString()}
        >
          Tab {i + 4}
        </MTab>
      ))}
    </MTabs>
  );
};

export default function Tab() {
  return (
    <Col className="gap-2">
      <div>tab:</div>
      <ITabs />
      <ITabs isSecondary />
    </Col>
  );
}
