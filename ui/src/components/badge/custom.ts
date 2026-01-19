import type { MBadgeProps } from "./badge";


export function handleBadgeStyle({
  className,
  variant
}: MBadgeProps) {
  const cs: string[] = ["mdui-badge"]
  const badgeCs: string[] = ["badge"]

  badgeCs.push(variant || 'dot')

  if (className) badgeCs.push(className)
  return {
    className: cs.join(" "),
    badgeClassName: badgeCs.join(" "),
  }
}