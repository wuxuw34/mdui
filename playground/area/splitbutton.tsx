import { ArrowBigLeft } from "lucide-react";
import { Mbutton } from "mdui";
import {MSplitButton} from "mdui";
import { useState } from "react";

export default function SplitButton() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div>分割按钮</div>
      <MSplitButton>
        <Mbutton shape="rounded">按钮1</Mbutton>
        <Mbutton
          shape="rounded"
          selected={selected}
          onClick={() => setSelected(!selected)}
          icon
          active={false}
          outline={false}
        >
          <ArrowBigLeft className={`${selected ? "rotate-270" : "rotate-90"} transition-all`} />
        </Mbutton>
      </MSplitButton>
    </div>
  );
}
