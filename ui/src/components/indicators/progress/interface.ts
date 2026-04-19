
export interface MProgressRendererOptions {
  color?: string;
  progress?: number;
  barWidth?: number;
  type?: 'line' | 'circle';
}

export interface MProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: MProgressRendererOptions;
  type?: 'line' | 'circle';
}