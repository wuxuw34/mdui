
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export function getSizeStyle(size: TSize) {
  return {
    "--size": `var(--mdui-size-${size})`
  }
}