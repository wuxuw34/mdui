import type { MChipProps } from "./interface";


export function handleMChipStyle({
  className,
  variant,
  checked,
  elevated
}: MChipProps) {

  const cs: string[] = [
    "mdui-chip",
    "mdui-shadow",
  ]

  cs.push(variant || "assist")

  if (checked) {
    cs.push("checked")
  }
  if (elevated) {
    cs.push("elevated")
  }

  cs.push(className || "")
  return {
    className: cs.join(" "),
  }
}