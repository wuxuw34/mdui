

export interface MLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  aside?: React.ReactNode;
  mode?: string
}