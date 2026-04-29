import { MButton, MSwitch } from "mdui";
import Col from "./col";
import { useContext, useEffect, useState } from "react";
import { MSheetContext } from "../../ui/src/components/sheets/context";

export default function Sheet() {
  const sheetInstance = useContext(MSheetContext);
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<"bottom" | "side">("bottom");

  const toggle = () => {
    sheetInstance.showSheet({
      show: !isOpen,
      variant,
      header: <div>"测试"</div>,
      footer: (
        <>
          <MButton variant="filled">关闭</MButton>
        </>
      ),
      content: (
        <div>
          你好世界
          <MButton
            variant="filled"
            onClick={sheetInstance.closeSheet}
          >
            关闭
          </MButton>
        </div>
      ),
    });
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    sheetInstance.onShowChange((show) => {
      setIsOpen(show);
    });
  }, []);

  return (
    <Col>
      <MSwitch
        onText="底部"
        offText="侧边"
        checked={variant === "bottom"}
        onCheckedChange={(checked) => {
          setVariant(checked ? "bottom" : "side");
        }}
      />
      <MButton onClick={toggle}>{isOpen ? "关闭" : "打开"}</MButton>
    </Col>
  );
}
