import type { MSliderProps } from "./slider";

const setSliderStyle = (style: React.CSSProperties, size: TSize) => {
  const obj: React.CSSProperties & Record<string, string> = {
    "--size": `var(--size-${size})`,
    "--radius": `var(--radius-pressed-${size})`,
    "--radius-min": `calc(var(--radius-connected-${size}) / 2)`,
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
  const lcs: string[] = ["thumb"] // 左侧的滑块
  const rcs: string[] = ["thumb"] // 右侧的滑块
  const fstyle: React.CSSProperties = {} // 第一个轨道容器的样式
  const sstyle: React.CSSProperties = {} // 第二个轨道容器的样式
  const tstyle: React.CSSProperties = {} // 第三个轨道容器的样式
  const fcs: string[] = ["track"] // 第一个轨道的类名
  const ccs: string[] = ["track"] // 第二个轨道的类名
  const tcs: string[] = ["track"] // 第二个轨道的类名
  const lccs: string[] = ["container"] // 左侧的滑块的容器
  const rccs: string[] = ["container"] // 右侧的滑块的容器

  // 方向
  cs.push(orientation || "")

  if (orientation === 'horizontal') {
    fstyle['width'] = `${range[0]}%`
    fstyle['minWidth'] = '18px'
    sstyle['width'] = `${range[1] - range[0]}%`
    sstyle['minWidth'] = '18px'
    tstyle['width'] = `${100 - range[1]}%`
    ccs.push("active")
    fcs.push("inactive")
    tcs.push("inactive")
  } else {
    fstyle['height'] = `${range[0]}%`
    fstyle['minHeight'] = '18px'
    sstyle['height'] = `${range[1] - range[0]}%`
    sstyle['minHeight'] = '18px'
    tstyle['height'] = `${100 - range[1]}%`
    if (variant === 'Standard') {
      fcs.push("inactive")
      ccs.push("inactive")
      tcs.push("active")
    }else if(variant === 'Centered'){
      fcs.push("inactive")
      ccs.push("active")
      tcs.push("inactive")
    }
  }

  /**
   * 当类型为Centered时，需要调整左右两个滑块的样式
   */
  if (variant === 'Centered') {
    const isRight = range[1] <= 50 // 此时可操控好的滑块位于右侧
    const isCenter = range[0] === range[1] // 两个滑块重合

    if (isCenter) {
      // 需要隐藏第一个滑块，显示第二个滑块
      rccs.push('hidden')
    }
    if (isRight) {
      // 正常情况下,只显示第一个滑块
      rcs.push('centered')
      rccs.push('non-width')
    } else {
      // 正常情况下,只显示第二个滑块
      lcs.push('centered')
    }

  }

  return {
    className: cs.join(' '),
    style,
    lcs: lcs.join(' '),
    rcs: rcs.join(' '),
    lccs: lccs.join(' '),
    rccs: rccs.join(' '),
    fstyle,
    sstyle,
    tstyle,
    fcs: fcs.join(' '),
    ccs: ccs.join(' '),
    tcs: tcs.join(' '),
  }
}