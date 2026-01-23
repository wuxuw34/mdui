import { createContext } from "react";
import type { MMenuContextValue } from "./interface";

export const MMenuContext = createContext<MMenuContextValue>({
  variant: 'vertical',
})