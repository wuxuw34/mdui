

interface MAppItem {
  icon: React.ReactNode;
  name: string;
  value?: string;
  showValue?: boolean;
}

export interface MNavigationBarProps {
  apps?: MAppItem[];
  orientation?: "horizontal" | "vertical";
}
