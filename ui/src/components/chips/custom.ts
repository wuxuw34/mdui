import type { MChipProps } from "./interface";


export function handleMChipStyle({
  className,
  variant,
}: MChipProps) {

  const cs: string[] = [
    "mdui-chip",
    "mdui-shadow",
  ]

  cs.push(variant || "assist")

  cs.push(className || "")
  return {
    className: cs.join(" "),
  }
}