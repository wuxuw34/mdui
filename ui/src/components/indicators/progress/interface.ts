


export interface MProgressRendererOptions {
  color?: string;
  progress?: number;
  barWidth?: number;
  type?: 'line' | 'circle';
  variant?: 'standard' | 'wave'
  radius?: number; // 圆形进度条的半径
}

export interface MProgressProps extends React.HTMLAttributes<HTMLDivElement>, MProgressRendererOptions {

}