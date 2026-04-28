import type React from "react"

export type MBottomSheetProps = React.HTMLAttributes<HTMLDivElement> & {
  show?: boolean
  onShowChange: (show: boolean) => void
}


export interface MSheetConfig {
  variant?: 'bottom' | 'side',
  content?: string | React.ReactElement,
  show?: boolean
}

export interface MSheetContextType {
  showSheet: (config: MSheetConfig) => void
  closeSheet: () => void
  onShowChange: (fn: (show: boolean) => void) => void
}