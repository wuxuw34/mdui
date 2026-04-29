import { MButton, useSnackbar, MIconButton } from "mdui";
import Col from "./col";
import { useEffect, useState } from "react";

export default function Snackbar() {
  const [open, setOpen] = useState(false);
  const context = useSnackbar();

  useEffect(() => {
    context.onOpenChange((open) => {
      setOpen(open);
    });
  }, []);

  return (
    <Col>
      <MButton
        variant="filled"
        onClick={() => {
          context.open({
            open: !open,
            text: "测试",
          });
          setOpen(!open);
        }}
      >
        {open ? "关闭" : "打开"}
      </MButton>
      <MButton
        variant="filled"
        onClick={() => {
          context.open({
            open: true,
            text: Date.now().toString(),
            duration: 3000,
            action: (
              <MIconButton
                variant="text"
                size="xs"
              >
                action
              </MIconButton>
            ),
          });
          setOpen(true);
        }}
      >
        可以连点
      </MButton>
    </Col>
  );
}
