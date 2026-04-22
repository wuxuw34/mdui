

interface MAppItem {
  icon: React.ReactNode;
  name: string;
  value?: number;
  showValue?: boolean;
}

 interface MMenuItem {
  icon: React.ReactNode;
  name: string;
}

export interface MNavigationRailProps extends React.HTMLAttributes<HTMLDivElement> {
  menu: MMenuItem[];
  onMenuChange?: (index: MMenuItem) => void;
}

export interface MNavigationBarProps extends React.HTMLAttributes<HTMLDivElement> {
  apps?: MAppItem[];
  labelPosition?: 'bottom' | 'right'
  itemWidth?: number | string;
}
