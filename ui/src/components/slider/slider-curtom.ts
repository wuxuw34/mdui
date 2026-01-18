import type { MSliderProps } from "./slider";

const setSliderStyle = (style: React.CSSProperties, size: TSize) => {
  const obj: React.CSSProperties & Record<string, string> = {
    "--size": `var(--size-${size})`,
    "--radius": `var(--radius-pressed-${size})`,
    "--radius-min": `calc(var(--radius-connected-${size}) / 2)`,
    "--color-active": `var(--color-primary)`,
    "--color-inactive": `var(--color-on-primary)`,
    "--dot-size": `6px`,
  }
  Object.assign(style, obj)
}


export function handleSliderCustomStyle(props: MSliderProps & {
  range: number[]
}) {
  const { className, size = 'md', variant, range, orientation } = props
  // style属性值
  const style: React.CSSProperties = {}
  // 设置尺寸
  setSliderStyle(style, size)
  // class属性值
  const cs: string[] = ["mdui-slider"]
  setSliderStyle(style, size)
  cs.push(...className?.split(" ") || [])
  // 设置滑块的样式
  const ltcs: string[] = ["thumb"] // 左侧的滑块样式
  const rtcs: string[] = ["thumb"] // 右侧的滑块样式
  const ltStyle: React.CSSProperties = {}
  const rtStyle: React.CSSProperties = {}
  const ftrackcs: string[] = ["track"] // 第一个轨道样式
  const strackcs: string[] = ["track"] // 第二个轨道样式
  const ttrackcs: string[] = ["track"] // 第三个轨道样式
  const ftrackStyle: React.CSSProperties & Record<string, string | number> = {}
  const strackStyle: React.CSSProperties & Record<string, string | number> = {}
  const ttrackStyle: React.CSSProperties & Record<string, string | number> = {}

  if (Math.abs(range[0] - range[1]) === 0) {
    strackcs.push('hidden')
  }
  const thumbWidth = 22
  const halfThumbWidth = thumbWidth / 2

  // 样式
  cs.push(orientation || 'horizontal')

  // 设置轨道的样式
  if (orientation === "horizontal") {
    ftrackStyle.width = `${range[0]}%`
    strackStyle.width = `${range[1] - range[0]}%`
    ttrackStyle.width = `${(100 - range[1])}%`
    ftrackcs.push('inactive')
    strackcs.push('active')
    ttrackcs.push('inactive')
    if (variant === 'standard') {
      strackStyle['--padding-end'] = `${halfThumbWidth}px`
      strackStyle['--padding-start'] = 0
      ttrackStyle['--padding-start'] = `${halfThumbWidth}px`
      if (range[1] === 0) {
        strackStyle['--padding-end'] = 0
      }
    } else if (variant === 'centered') {
      if (range[0] < 50) {
        rtcs.push('hidden')
      } else {
        ltcs.push('hidden')
      }
      ftrackStyle['--padding-end'] = `${halfThumbWidth}px`
      ftrackStyle['--padding-start'] = 0
      strackStyle['--padding-end'] = `${halfThumbWidth}px`
      strackStyle['--padding-start'] = `${halfThumbWidth}px`
      ttrackStyle['--padding-start'] = `${halfThumbWidth}px`
    }
    // 设置滑块的位置
    ltStyle.left = `${range[0]}%`
    rtStyle.left = `${range[1]}%`
  } else {
    ftrackStyle.height = `${range[0]}%`
    strackStyle.height = `${range[1] - range[0]}%`
    ttrackStyle.height = `${(100 - range[1])}%`

    if (variant === 'standard') {
      ftrackcs.push('inactive')
      strackcs.push('inactive')
      ttrackcs.push('active')
      strackStyle['--padding-end'] = `${halfThumbWidth}px`
      strackStyle['--padding-start'] = 0
      ttrackStyle['--padding-start'] = `${halfThumbWidth}px`
      if (range[1] === 0) {
        strackStyle['--padding-end'] = 0
      }
    } else if (variant === 'centered') {
      ftrackcs.push('inactive')
      strackcs.push('active')
      ttrackcs.push('inactive')
      if (range[0] < 50) {
        rtcs.push('hidden')
      } else {
        ltcs.push('hidden')
      }
      ftrackStyle['--padding-end'] = `${halfThumbWidth}px`
      ftrackStyle['--padding-start'] = 0
      strackStyle['--padding-end'] = `${halfThumbWidth}px`
      strackStyle['--padding-start'] = `${halfThumbWidth}px`
      ttrackStyle['--padding-start'] = `${halfThumbWidth}px`
    }
    // 设置滑块的位置
    ltStyle.top = `${range[0]}%`
    rtStyle.top = `${range[1]}%`
  }



  return {
    className: cs.join(' '),
    style,
    ltcs: ltcs.join(' '),
    rtcs: rtcs.join(' '),
    ftrackcs: ftrackcs.join(' '),
    strackcs: strackcs.join(' '),
    ttrackcs: ttrackcs.join(' '),
    ftrackStyle,
    strackStyle,
    ttrackStyle,
    ltStyle,
    rtStyle,
  }
}