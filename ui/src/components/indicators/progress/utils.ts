import type { MProgressRendererOptions } from "./interface";


export class MProgressRenderer {

  private canvas: HTMLCanvasElement;
  private canvasWidth: number;
  private canvasHeight: number;
  private context: CanvasRenderingContext2D;
  private phase = 0; // 相位值/偏移值
  private options: Required<MProgressRendererOptions>;
  private _progress = 0; // 记录之前的进度值
  private targetProgress = 70; // 目标进度值

  constructor(canvas: HTMLCanvasElement, options: MProgressRendererOptions = {
    progress: 0,
    color: '#675496',
    barWidth: 4,
    type: 'line'
  }) {
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = canvas.getContext("2d")!;
    this.options = {
      ...options
    } as Required<MProgressRendererOptions>;
    this.targetProgress = this.options.progress || 0;
  }

  render() {
    if (this.options.type === 'line') {
      this.renderLine();
    } else if (this.options.type === 'circle') {
      this.renderCircle();
    }
    window.requestAnimationFrame(this.render.bind(this)); // 循环调用渲染函数以持续动画
  }

  renderLine() {
    const ctx = this.context;
    const height = this.canvasHeight;
    const width = this.canvasWidth;
    if (!ctx) return;
    this.context.clearRect(0, 0, width, height); // 清除画布
    const progressWidth = width * (this.options.progress || 0) / 100; // 根据进度计算宽度
    if (this.targetProgress !== this.options.progress) {
      // 逐渐更新进度值以产生动画效果
      if (this.options.progress < this.targetProgress) {
        this.options.progress += 0.1; // 每次增加1%
        if (this.options.progress > this.targetProgress) {
          this.options.progress = this.targetProgress; // 直接设置为目标值以避免过度调整
        }
      } else if (this.options.progress > this.targetProgress) {
        this.options.progress -= 0.1; // 每次减少1%
        if (this.options.progress < this.targetProgress) {
          this.options.progress = this.targetProgress; // 直接设置为目标值以避免过度调整
        }
      }
    }
    ctx.beginPath();
    ctx.strokeStyle = this.options.color || '#675496';
    ctx.lineWidth = this.options.barWidth || 4;
    ctx.lineCap = 'round'
    const centerY = height / 2;

    if (this.options.variant === 'wave') {
      const waveAmplitude = this.options.amplitude || 0.4; // 波浪振幅
      const waveFrequency = this.options.frequency || 10; // 波浪频率
      for (let i = 0; i < progressWidth; i += 4) {
        const y = centerY + Math.sin(i / waveFrequency + this.phase) * centerY * waveAmplitude;

        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
    } else {
      ctx.moveTo(this.options.barWidth, centerY);
      ctx.lineTo(progressWidth, centerY);
    }
    this.phase += 0.02; // 更新相位值以产生动画效果
    ctx.stroke();
    ctx.closePath();
    // 渲染后面的直线
    ctx.beginPath();
    ctx.strokeStyle = '#e2e0f9';
    ctx.lineWidth = this.options.barWidth || 4;
    ctx.lineCap = 'round'
    const startX = progressWidth + this.options.barWidth;
    const endX = width - this.options.barWidth;
    if (startX < endX) {
      ctx.moveTo(startX, centerY);
      ctx.lineTo(endX, centerY);
    }
    ctx.stroke();
    ctx.closePath();

    // 绘制点
    ctx.beginPath();
    ctx.fillStyle = this.options.color || '#675496';
    ctx.arc(width - this.options.barWidth, centerY, (this.options.barWidth || 4) / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  renderCircle() {
    const ctx = this.context;
    const height = this.canvasHeight;
    const width = this.canvasWidth;
    if (!ctx) return;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // 清除画布
    const radius = this.options.radius || Math.min(width, height) / 2 - (this.options.barWidth || 4);
    const centerX = width / 2;
    const centerY = height / 2;
    const startAngle = -Math.PI / 2 + this.phase;
    const endAngle = startAngle + (this.options.progress || 0) / 100 * Math.PI * 2; // 根据进度计算结束角度

    if (this.targetProgress !== this.options.progress) {
      // 逐渐更新进度值以产生动画效果
      if (this.options.progress < this.targetProgress) {
        this.options.progress += 0.1; // 每次增加1%
        if (this.options.progress > this.targetProgress) {
          this.options.progress = this.targetProgress; // 直接设置为目标值以避免过度调整
        }
      } else if (this.options.progress > this.targetProgress) {
        this.options.progress -= 0.1; // 每次减少1%
        if (this.options.progress < this.targetProgress) {
          this.options.progress = this.targetProgress; // 直接设置为目标值以避免过度调整
        }
      }
    }

    ctx.beginPath();
    ctx.strokeStyle = this.options.color || '#675496';
    ctx.lineWidth = this.options.barWidth || 4;
    ctx.lineCap = 'round'
    if (this.options.variant === 'wave') {
      // 绘制波浪效果的圆弧
      const waveAmplitude = this.options.amplitude || 2; // 波浪振幅
      const waveFrequency = this.options.frequency || 10; // 波浪频率
      const wavePhase = this.phase; // 使用相位值来产生动画效果
      for (let angle = startAngle; angle <= endAngle; angle += 0.01) {
        const r = radius + Math.sin(angle * waveFrequency + wavePhase) * waveAmplitude; // 根据角度计算半径的波动
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (angle === startAngle) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    } else {
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    }
    ctx.stroke();
    ctx.closePath();
    // 绘制背景圆
    ctx.beginPath();
    ctx.strokeStyle = '#e2e0f9';
    ctx.lineWidth = this.options.barWidth || 4;
    ctx.lineCap = 'round'
    const gap = (this.options.barWidth / radius) * 1.05
    const _endAngle = startAngle + Math.PI * 2 - gap;
    const _startAngle = endAngle + gap;
    if (_endAngle > _startAngle) {
      ctx.arc(centerX, centerY, radius, _startAngle, _endAngle);
    }

    ctx.stroke();
    ctx.closePath();
    this.phase += (this.options.phase || 0.01); // 更新相位值以产生动画效果
  }

  updateProgress(progress: number) {
    this.targetProgress = progress;
  }

}