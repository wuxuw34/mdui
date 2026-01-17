import type { MButtonProps } from "./button";

const setButtonSize = (style: React.CSSProperties, size: MButtonProps['size'], shape: MButtonProps['shape']) => {
  const obj = {
    "--text": `var(--text-${size})`,
    "--height": `var(--size-${size})`,
    "--gap": `var(--gap-${size})`,
    "--padding": `0 var(--padding-${size})`,
    "--radius": `var(--radius${shape === 'rounded' ? "" : "-square"}-${size})`,
    "--rounded": `var(--radius${shape === 'rounded' ? "" : "-square"}-${size})`,
    "--radius-pressed": `var(--radius-pressed-${size})`,
    "--shadow": `var(--shadow-default)`,
    "--shadow-hover-button": "var(--shadow-hover)",
  }
  Object.assign(style, obj)
}

export default function handleButtonCustomStyle(props: MButtonProps) {
  const { variant = 'default', radiusInverse = false, size, shape, className, selected } = props;

  // 设置style属性
  const style: React.CSSProperties = {}
  // 设置尺寸
  setButtonSize(style, size, shape)

  const cs: string[] = ["mdui-button"]
  cs.push(variant)
  if (selected) {
    cs.push('selected')
    if (radiusInverse) {
      cs.push('inverse-radius')
    }
  } else if (typeof selected === 'boolean') {
    cs.push('unselected')
  }

  cs.push(...className?.split(" ") || [])
  return {
    className: cs.join(' '),
    style
  }
}
