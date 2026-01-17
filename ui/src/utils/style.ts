
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type TSizeType = "text" | 'gap' | "padding" | "radius"
export function getSizeStyle(size: TSize) {
  return {
    "--size": `var(--mdui-size-${size})`
  }
}