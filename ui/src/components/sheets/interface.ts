import type React from "react"

export type MBottomSheetProps = React.HTMLAttributes<HTMLDivElement> & {
  show?: boolean
  onShowChange: (show: boolean) => void
}

export type MSideSheetProps = MBottomSheetProps & {
  header?:React.ReactElement,
  footer?:React.ReactElement
}


export interface MSheetConfig {
  variant?: 'bottom' | 'side',
  content?: string | React.ReactElement,
  show?: boolean
  header?: React.ReactElement,
  footer?: React.ReactElement
}

export interface MSheetContextType {
  showSheet: (config: MSheetConfig) => void
  closeSheet: () => void
  onShowChange: (fn: (show: boolean) => void) => void
}