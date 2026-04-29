
export interface MSnackbarConfig {
  text: string,
  open?: boolean,
  action?: React.ReactNode,
  duration?: number,
  showClose?: boolean
}

export type MSnackbarContextType = {
  open: (config: MSnackbarConfig) => void,
  close: () => void,
  onOpenChange: (fn: (open: boolean) => void) => void
}