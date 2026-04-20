import { Route, Switch } from "wouter";
import "./App.css";
import Home from "./views/home";

function App() {
  return (
    <main className="p-3">
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
