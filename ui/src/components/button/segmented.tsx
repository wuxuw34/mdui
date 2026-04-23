import type { MSegmentedButtonsProps } from "./interface";
import './segmented.scss'

export default function MSegmentedButtons({
  children,
}: MSegmentedButtonsProps) {
  return <div className="mdui-segemented-buttons">{children}</div>;
}
