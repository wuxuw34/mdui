import { MButton, MSwitch, MTextField } from "mdui";
import Col from "./col";
import {} from "material-icons";
import { useCallback, useState } from "react";

export default function TextFields() {
  const [value, setValue] = useState("");
  const [isMultiLine, setIsMultiLine] = useState(false);

  const clearValue = useCallback(() => {
    setValue("");
  }, []);

  return (
    <Col>
      <div>
        是否多行输入
        <MSwitch
          checked={isMultiLine}
          onCheckedChange={(checked) => setIsMultiLine(checked)}
        />
      </div>
      <MTextField
        value={value}
        onValueChange={(v) => setValue(v)}
        placeholder="请输入内容"
        label="标签"
        prefixIcon={<span className="material-icons">search</span>}
        suffixIcon={
          <MButton
            variant="icon"
            shape="rounded"
            size="xs"
            onClick={clearValue}
          >
            <span className="material-icons">clear</span>
          </MButton>
        }
        rows={3}
        multiLine={isMultiLine}
      />
      <MTextField
        value={value}
        onValueChange={(v) => setValue(v)}
        placeholder="请输入内容"
        label="标签"
        multiLine={isMultiLine}
        helperText="辅助文本"
      />
      <MTextField
        variant="outlined"
        value={value}
        onValueChange={(v) => setValue(v)}
        placeholder="请输入内容"
        label="标签"
        multiLine={isMultiLine}
        helperText="辅助文本"
        showCount
        maxLength={10}
      />
    </Col>
  );
}
