import { Home } from "lucide-react";
import { MTabs, MTab } from "mdui";

export default function Tab() {
  return (
    <MTabs>
      <MTab
        value="1"
        icon={<Home />}
      >
        Tab 1
      </MTab>
      <MTab
        value="2"
        icon={<Home />}
      >
        Tab 2
      </MTab>
      <MTab
        value="3"
        icon={<Home />}
      >
        Tab 3
      </MTab>
    </MTabs>
  );
}
