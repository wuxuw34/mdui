


export interface MProgressRendererOptions {
  color?: string;
  progress?: number;
  barWidth?: number;
  type?: 'line' | 'circle';
  variant?: 'standard' | 'wave'
  radius?: number; // 圆形进度条的半径
  frequency?: number; // 波浪频率
  amplitude?: number; // 波浪振幅
  phase?: number; // 波浪相位
}

export interface MProgressProps extends React.HTMLAttributes<HTMLDivElement>, MProgressRendererOptions {

}