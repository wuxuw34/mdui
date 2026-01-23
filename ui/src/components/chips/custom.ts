import type { MChipProps } from "./interface";


export function handleMChipStyle({
  className,
  variant,
  checked,
}: MChipProps) {

  const cs: string[] = [
    "mdui-chip",
    "mdui-shadow",
  ]

  cs.push(variant || "assist")

  if(checked){
    cs.push("checked")
  }

  cs.push(className || "")
  return {
    className: cs.join(" "),
  }
}