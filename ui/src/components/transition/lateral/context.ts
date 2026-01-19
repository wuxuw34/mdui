import { createContext } from "react";
import type { TransitionPage } from "./transitions";

interface LateralTransitionsContextValue {
  registerPage: (page: TransitionPage) => void;
}


export const LateralTransitionsContext = createContext<LateralTransitionsContextValue>({
  registerPage: () => { },
})