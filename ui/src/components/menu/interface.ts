type MMenuVariant = 'vertical' | 'baseline'

export interface MMenuContextValue {
  variant: MMenuVariant
}

export interface MMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: MMenuVariant
}