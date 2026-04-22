import { Route, Switch, useRouter } from "wouter";
import "./App.css";
import { MLayout, MNavigationRail } from "mdui";
import menus from "./config/menu";
import "material-icons/iconfont/material-icons.css";

function App() {
  const router = useRouter();

  const handleMenuChange = (item) => {
    console.log("item", item);
  };

  return (
    <MLayout
      aside={
        <MNavigationRail
          menu={menus}
          onMenuChange={handleMenuChange}
        />
      }
    >
      <div>
        <Switch>
          {menus.map((menu) => (
            <Route
              key={menu.path}
              path={menu.path}
            >
              {menu.component}
            </Route>
          ))}
        </Switch>
      </div>
    </MLayout>
  );
}

export default App;
