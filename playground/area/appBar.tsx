import { MAppBar, MButton } from "mdui";
import Col from "./col";
import { useEffect, useState } from "react";

export default function AppBar() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);
  return (
    <Col>
      <MAppBar>
        <MButton variant="icon">
          <span className="material-icons">menu</span>
        </MButton>
      </MAppBar>
      <MAppBar
        variant="small"
        centerTitle
        title="Hello World"
        subtitle="This is a subtitle"
      ></MAppBar>
      <MAppBar
        variant="medium"
        title="Hello World"
        subtitle="This is a subtitle"
        offset={scrollY}
      ></MAppBar>
      <MAppBar
        variant="large"
        title="Hello World"
        subtitle="This is a subtitle"
        offset={scrollY}
      ></MAppBar>
    </Col>
  );
}
