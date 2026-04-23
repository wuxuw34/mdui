export type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface MButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  ripple?: boolean;
  variant?: "elevated" | "outlined" | "text" | "icon" | "tonal" | "filled";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean | undefined;
  shape?: "rounded" | "square";
  size?: TSize;
  aspectRatio?: 'square' | 'wide' | 'narrow';
  onlyColor?: boolean;
}

export interface MFABsProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'md' | 'lg'
  show?: boolean
}

export interface MFABsMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean
  expand?: boolean // 是否展开
  onExpand?: (expand: boolean) => void
  expandIcon?: React.ReactNode
  unExpandIcon?: React.ReactNode
  icon?: React.ReactNode
}

export interface MIconButtonProps extends MButtonProps {
  type?: 'default' | 'narrow' | 'wide'
}

export interface MSegmentedButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}
