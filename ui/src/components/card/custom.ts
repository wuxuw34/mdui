import type { MCardProps } from "./card"

export function handleMCardStyle({
  className,
  variant = 'elevated',
  disabled
}: MCardProps) {

  const cs: string[] = ["mdui-card"]

  if (disabled) {
    cs.push("disabled")
  }

  cs.push(variant)

  cs.push(className || "")
  return {
    className: cs.join(" ")
  }
}