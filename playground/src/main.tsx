import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "mdui/index.scss";

const app = createRoot(document.getElementById("root") as HTMLElement);
app.render(<App />);
