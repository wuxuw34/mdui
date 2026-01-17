import { MDivider } from "mdui";

export default function Divider() {
  return (
    <div className="flex flex-col gap-2">
      <div>分割线</div>
      <MDivider />
      <div className="h-[30px] flex items-center justify-center">
        <MDivider orientation="vertical" />
      </div>
    </div>
  );
}
