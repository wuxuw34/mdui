import { createContext } from "react";
import type { MSheetContextType } from "./interface";


export const MSheetContext = createContext<MSheetContextType>({
  showSheet: () => { },
  closeSheet: () => { },
  onShowChange:()=>{}
})