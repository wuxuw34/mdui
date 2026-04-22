import { MNavigationBar, MNavigationRail } from "mdui";
import Col from "./col";
import Row from "./row";

const menu = [
  {
    icon: <span className="material-icons">home</span>,
    name: "Home",
  },
  {
    icon: <span className="material-icons">search</span>,
    name: "Search",
    showValue: true,
    value: 100,
  },
  {
    icon: <span className="material-icons">delete</span>,
    name: "Delete",
  },
];

export default function NavigationBar() {
  return (
    <Row>
      <MNavigationRail menu={menu} />
      <Col>
        <MNavigationBar apps={menu} />
        <MNavigationBar apps={menu} />
        <MNavigationBar
          apps={menu}
          labelPosition="right"
        />
        <MNavigationBar
          apps={menu}
          labelPosition="right"
          itemWidth="auto"
        />
      </Col>
    </Row>
  );
}
