import { createContext } from "react";
import type { MRadioGroupContext } from "./interface";


export const radioGroupContext = createContext<MRadioGroupContext>({
  value: '',
  setValue: () => { },
})