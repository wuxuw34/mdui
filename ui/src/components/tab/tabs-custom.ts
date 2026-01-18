import type { MTabsProps } from "./tabs";


export function handleTabsStyle(props: MTabsProps) {
  const { variant, className } = props;
  const cs: string[] = ["mdui-tabs"]
  cs.push(variant || "primary")
  cs.push(className || "")
  return {
    className: cs.join(" "),
  }

}