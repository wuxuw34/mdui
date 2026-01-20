
type TSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export function getSizeStyle(size: TSize) {
  return {
    "--size": `var(--mdui-size-${size})`
  }
}

/**
 * 获取到css变量值
 * @param variable css变量名
 * @param el 元素，默认document.documentElement
 * @returns 
 */
export function getCssVariable(variable: string, el?: HTMLElement) {
  if (variable.startsWith('var(')) {
    variable = variable.replace('var(', '')
    variable = variable.replace(')', '')
  }
  const root = el || document.documentElement
  const value = getComputedStyle(root).getPropertyValue(variable).trim();
  return value
}
