import { MButton } from "mdui";
import Col from "./col";
import { useContext, useEffect, useState } from "react";
import { MSheetContext } from "../../ui/src/components/sheets/context";

export default function Sheet() {
  const sheetInstance = useContext(MSheetContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    sheetInstance.showSheet({
      show: !isOpen,
      content: (
        <div>
          你好世界
          <MButton variant="filled" onClick={sheetInstance.closeSheet}>关闭</MButton>
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
      <MButton onClick={toggle}>{isOpen ? "关闭" : "打开"}</MButton>
    </Col>
  );
}
