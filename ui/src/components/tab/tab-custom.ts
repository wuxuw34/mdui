import type { MTabProps } from "./tab";

export function handleTabStyle(props: MTabProps & { variant?: "primary" | "secondary" }) {
  const { active, className, variant } = props
  const cs: string[] = ["mdui-tabs-tab"]

  if (active) {
    cs.push("active")
  }
  if (variant === "secondary") {
    cs.push("secondary")
  }

  cs.push(className || "")
  return {
    className: cs.join(" "),
  }
}