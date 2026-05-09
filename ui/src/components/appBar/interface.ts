

export interface MSearchAppBarProps {
  variant?: 'search'
  search?: React.ReactNode,
  onSearch?: () => void,
  children?: React.ReactNode,
}

interface baseProps {
  children?: React.ReactNode,
  title?: React.ReactNode,
  centerTitle?: boolean,
  subtitle?: React.ReactNode,
}

export interface MSmallAppBarProps extends baseProps {
  variant?: 'small'

}

export interface MMediumAppBarProps extends baseProps {
  variant?: 'medium' | 'large',
  offset?: number,
}

export type MAppBarProps = MSearchAppBarProps | MSmallAppBarProps | MMediumAppBarProps
