import { MMenu, MMenuItem } from "mdui";
import Col from "./col";

export default function Menu() {
  return (
    <Col>
      <MMenu variant="vertical">
        <MMenuItem>菜单1</MMenuItem>
        <MMenuItem>菜单2</MMenuItem>
      </MMenu>
    </Col>
  );
}
