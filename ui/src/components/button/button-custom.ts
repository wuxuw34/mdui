import type { MButtonProps } from "./button";

const setButtonSize = (style: React.CSSProperties, size: MButtonProps['size']) => {
  const obj = {
    "--text": `var(--text-${size})`,
    "--height": `var(--size-${size})`,
    "--gap": `var(--gap-${size})`,
    "--padding": `0 var(--padding-${size})`,
    "--radius": `var(--radius-${size})`,
    "--shadow": `var(--shadow)`,
    "--shadow-hover": "var(--shadow-hover)",
  }
  Object.assign(style, obj)
}

export default function handleButtonCustomStyle(props: MButtonProps) {
  const { variant = 'default', size, shape, outline, animation, shadow, selected, active, icon } = props;

  // 设置style属性
  const style: React.CSSProperties = {}
  // 设置尺寸
  setButtonSize(style, size)

  console.log(style)

  const cs: string[] = ["button"]

  if (selected) {
    cs.push('selected')
  }

  cs.push(variant)
  return {
    className: cs.join(' '),
    style
  }
}
