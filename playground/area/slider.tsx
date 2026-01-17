import {  MSlider } from "mdui";

export default function Slider() {
  return (
    <div className="flex flex-col gap-2">
      <div>滑块</div>
      <MSlider />
      <MSlider size={40} />
      <div className="h-[100px]">
        <MSlider className="h-full" size={40} orientation="vertical" />
      </div>
    </div>
  );
}
