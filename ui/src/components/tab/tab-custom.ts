import type { MTabProps } from "./tab";

export function handleTabStyle(props: MTabProps) {
  const { active, className } = props
  const cs: string[] = ["mdui-tabs-tab"]

  if (active) {
    cs.push("active")
  }

  cs.push(className || "")
  return {
    className: cs.join(" "),
  }
}