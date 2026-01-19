import type { MLateralTransitionsProps } from "./transitions"


export function handleLateralTransitionsStyle({
  className
}: MLateralTransitionsProps) {

  const cs: string[] = ["mdui-lateral-transitions"]

  if (className) {
    cs.push(className)
  }

  return {
    className: cs.join(" ")
  }

}