import { MChip } from "mdui";
import Col from "./col";
import { Image } from "lucide-react";

export default function Chip() {
  return (
    <Col>
      <MChip icon={<Image />}>图片</MChip>
      <MChip icon={<Image />} variant="filter">过滤</MChip>
      <MChip icon={<Image />} variant="input">输入</MChip>
    </Col>
  );
}
