
/**
 * 影响一段文本的所有因素
 * @interface TextMeasureOptions 文本测量选项
 * @param {number} fontSize 文本大小
 * @param {number} fontWeight 文本粗细
 * @param {string} fontFamily 文本字体
 * @param {number} letterSpacing 文本字母间距
 * @param {number} wordSpacing 文本单词间距
 */
interface TextMeasureConfig {
  fontSize?: number
  fontWeight?: number
  fontFamily?: string
  letterSpacing?: number
  wordSpacing?: number
}


export class TextMeasure {

  private config: Required<TextMeasureConfig>;
  private map: Map<string, number> = new Map();

  constructor(config?: TextMeasureConfig) {
    this.config = {
      fontSize: 16,
      fontWeight: 400,
      fontFamily: 'sans-serif',
      letterSpacing: 0,
      wordSpacing: 0,
      ...config,
    };
  }

  /**
   * 测量文本宽度
   * @param text 
   * @returns 
   */
  measureText(text: string): number {
    if (this.map.has(text)) return this.map.get(text) as number;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = `${this.config.fontSize}px ${this.config.fontFamily}`;
      const metrics = context.measureText(text);
      const width = metrics.width + this.config.letterSpacing * text.length;
      this.map.set(text, width);
      return width;
    }
    return 0;
  }

  /**
   * 使用某个元素初始化配置项
   * @param element 
   */
  initConfigWithElement(element: HTMLElement) {
    this.config = {
      ...this.config,
      fontSize: parseFloat(window.getComputedStyle(element).fontSize),
      fontWeight: parseInt(window.getComputedStyle(element).fontWeight, 10),
      fontFamily: window.getComputedStyle(element).fontFamily,
      letterSpacing: parseFloat(window.getComputedStyle(element).letterSpacing),
      wordSpacing: parseFloat(window.getComputedStyle(element).wordSpacing),
    }
    this.map.clear();
    return this
  }

  /**
   * 手动设置配置项
   * @param config 
   */
  setConfig(config: TextMeasureConfig) {
    this.config = {
      ...this.config,
      ...config
    }
    this.map.clear();
    return this
  }
}