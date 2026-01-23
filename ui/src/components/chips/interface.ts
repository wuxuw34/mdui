

export interface MChipProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  icon?: React.ReactNode;
  variant?: "assist" | "filter" | 'input';
  endIcon?: React.ReactNode;
}