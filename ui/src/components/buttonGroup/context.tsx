import { createContext } from "react";

const mButtonGroupContext = createContext<{
  current: string;
  pre: string;
  next: string;
  amount: number;
  setCurrent: (id: string) => void;
  orientation: "horizontal" | "vertical";
}>({
  current: "",
  pre: "",
  next: "",
  setCurrent: () => {},
  amount: 0,
  orientation: "horizontal",
});

export default mButtonGroupContext;
