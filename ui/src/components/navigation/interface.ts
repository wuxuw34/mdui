

interface MAppItem {
  icon: React.ReactNode;
  name: string;
  value?: number;
  showValue?: boolean;
}

export interface MNavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {
  apps?: MAppItem[];
  labelPosition?: 'bottom' | 'right'
  itemWidth?: number | string;
}
