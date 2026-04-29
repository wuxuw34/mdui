
export interface MSnackbarConfig {
  text: string,
  open?: boolean,
  duration?: number
}

export type MSnackbarContextType = {
  open: (config: MSnackbarConfig) => void,
  close: () => void,
  onOpenChange: (fn: (open: boolean) => void) => void
}