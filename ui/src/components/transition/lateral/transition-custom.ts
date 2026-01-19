import type { MLateralTransitionProps } from "./transition";


export function handleLateralTransitionStyle({
  className
}: {
  className?: string;
}) {
  const cs: string[] = ["mdui-lateral-transition"]
  cs.push(className || "")
  return {
    className: cs.join(" "),
  }
}