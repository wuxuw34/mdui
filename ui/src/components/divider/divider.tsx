import { cn } from "../../utils/cn";
import dividerVariants from "./variants";

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
      className={cn(dividerVariants({ orientation }))}
      style={{
        backgroundColor: color || "var(--primary)",
        "--size": `${size}px`,
      } as React.CSSProperties}
    />
  );
}
