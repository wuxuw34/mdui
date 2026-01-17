import { createContext } from "react";
import { type MButtonGroupProps } from ".";

const mButtonGroupContext = createContext<{
  current: string;
  pre: string;
  next: string;
  amount: number;
  setCurrent: (id: string) => void;
  variant: MButtonGroupProps["variant"];
  orientation: "horizontal" | "vertical";
  animation: boolean;
}>({
  current: "",
  pre: "",
  next: "",
  setCurrent: () => {},
  amount: 0,
  variant: "default",
  orientation: "horizontal",
  animation: true,
});

export default mButtonGroupContext;
