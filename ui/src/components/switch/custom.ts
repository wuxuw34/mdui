import { EasingFunction } from "../../contants/easing";
import type { TStyle } from "../../types";
import type { MSwitchProps } from "./switch";

const setStyle = (style: TStyle) => {
  const obj = {
    "--width": "52px",
    "--height": "32px",
    "--size": "16px",
    "--size-hover": "24px",
    "--size-active-hover": "28px",
    "--outline-width": "2px",
    "--size-has-icon": "24px",
    "--size-icon": "16px",
    "--easing": EasingFunction.ExpressiveFastSpatial,
  }
  Object.assign(style, obj)
}

export function handleSwitchStyle(props: MSwitchProps) {
  const { checked } = props
  const style: TStyle = {} // 容器style样式
  // 设置style
  setStyle(style)
  const cs: string[] = ["mdui-switch"] //容器class

  if (checked) {
    cs.push('checked')
  }

  return {
    style,
    cs: cs.join(' ')
  }
}