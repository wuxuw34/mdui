import type { MMenuProps } from "./interface";

export function handleMMenuStyle({
  variant
}: MMenuProps) {
  const cs: string[] = ["mdui-menu"]
  cs.push(variant || "vertical")

  return {
    className: cs.join(" ")
  }
}