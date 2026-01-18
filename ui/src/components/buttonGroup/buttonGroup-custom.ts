import type { TSize } from "../../types";
import type { MButtonGroupProps } from "./buttonGroup";

const setButtonGroupGapSize = (style: React.CSSProperties, size: TSize) => {
  const obj = {
    "--gap": `var(--gap-${size})`,
    "--button-group-radius": `var(--radius-connected-${size})`
  }
  Object.assign(style, obj)
}

export function handleButtonGroupCustomStyle(props: MButtonGroupProps) {
  const { variant, orientation, gap = 'md' } = props

  const style: React.CSSProperties = {}
  // 设置css变量
  setButtonGroupGapSize(style, gap)
  const cs: string[] = ['mdui-button-group']
  // 设置方向
  cs.push(orientation || 'horizontal')
  // 设置类型
  cs.push(variant || 'default')

  return {
    style,
    className: cs.join(' '),
  }
}