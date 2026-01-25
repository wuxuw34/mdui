
export type MTooltipsVariant = 'plain' | 'rich'

export interface MTooltipsProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MTooltipsVariant
  trigger: React.ReactNode
  mode?: 'hover' | 'focus' | 'click'
  children?: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
}