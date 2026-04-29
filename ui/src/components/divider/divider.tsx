import "./index.scss";
import clsx from "clsx";
interface MDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
  color?: string;
  size?: number;
}

export default function MDivider({
  orientation = "horizontal",
  color,
  size = 1,
  ...rest
}: MDividerProps) {
  return (
    <div
      {...rest}
      className={clsx("mdui-divider", orientation)}
      style={
        {
          backgroundColor: color || undefined,
          "--size": `${size}px`,
        } as React.CSSProperties
      }
    />
  );
}
