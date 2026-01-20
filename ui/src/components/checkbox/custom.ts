import type { TStyle } from "../../types";
import { getCssVariable } from "../../utils/style";
import type { MCheckboxProps } from "./checkbox";
import Color from "colorjs.io";

export function handleCheckboxStyle({
  color = 'var(--color-primary)'
}: MCheckboxProps) {
  const style: TStyle = {}
  // 转化颜色
  style['--color'] = color
  // 判断是否是css 变量
  let bgColor = color
  if (color?.startsWith('--') || color?.startsWith('var(')) {
    // 提取css变量
    bgColor = getCssVariable(color)
  }
  const rgb = new Color(bgColor).to('srgb')
  bgColor = `rgba(${rgb.r! * 255},${rgb.g! * 255},${rgb.b! * 255},var(--shadow-opacity-2))`
  style['--bg'] = bgColor
  const rippleColor = `rgba(${rgb.r! * 255},${rgb.g! * 255},${rgb.b! * 255},0.6)`

  return {
    style,
    rippleColor
  }
}