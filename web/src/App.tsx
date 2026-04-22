import { Route, Switch, useRouter } from "wouter";
import "./App.css";
import { MNavigationRail } from "mdui";
import menus from "./config/menu";

function App() {
  const router = useRouter();

  const handleMenuChange = (item) => {
    console.log("item", item);
  };

  return (
    <main className="p-3">
      <MNavigationRail
        menu={menus}
        onMenuChange={handleMenuChange}
      />
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
    </main>
  );
}

export default App;
