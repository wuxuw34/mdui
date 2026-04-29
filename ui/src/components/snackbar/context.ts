import { createContext } from "react";
import type { MSnackbarContextType } from "./interface";


export const MSnackbarContext = createContext<MSnackbarContextType>({
  open: () => { },
  close: () => { },
  onOpenChange() {
    
  },
})