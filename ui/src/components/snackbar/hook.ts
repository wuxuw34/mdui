import { useContext } from "react";
import { MSnackbarContext } from "./context";


export function useSnackbar() {
  const context = useContext(MSnackbarContext)

  if (!context) {
    throw new Error('useMSnackbar must be used within')
  }

  return context
}