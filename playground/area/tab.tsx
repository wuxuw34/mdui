import { AudioLines, Image, Video } from "lucide-react";
import { MTabs, MTab } from "mdui";

export default function Tab() {
  return (
    <MTabs>
      <MTab
        value="1"
        icon={<Video />}
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
    </MTabs>
  );
}
