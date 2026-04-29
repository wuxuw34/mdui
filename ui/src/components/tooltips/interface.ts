
export type MTooltipsVariant = 'plain' | 'rich'

type Rich = {
  variant: 'rich',
  title?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
}

type Plain = {
  variant?: 'plain',
  children: React.ReactNode
}

export interface MTooltipsProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode
  mode?: 'hover' | 'focus' | 'click' | 'manual'
  position?: 'top' | 'bottom' | 'left' | 'right'
  footer?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  sameWidth?: boolean
}

export type MTooltipsPropsWithVariant = (Rich | Plain) & MTooltipsProps