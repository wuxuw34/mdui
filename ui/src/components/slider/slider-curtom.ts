import type { MSliderProps } from "./slider";

const setSliderStyle = (style: React.CSSProperties, size: TSize) => {
  const obj: React.CSSProperties & Record<string, string> = {
    "--height": `var(--size-${size})`,
    "--radius": `var(--radius-connected-${size})`,
  }
  Object.assign(style, obj)
}

export function handleSliderCustomStyle(props: MSliderProps) {
  const { className, size = 'md' } = props
  // style属性值
  const style: React.CSSProperties = {}
  // 设置尺寸
  setSliderStyle(style, size)
  // class属性值
  const cs: string[] = ["mdui-slider"]
  setSliderStyle(style, size)
  cs.push(...className?.split(" ") || [])
  return {
    className: cs.join(' '),
    style
  }
}