import clsx from "clsx";
import "./index.scss";

interface MOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  show?: boolean;
}

export default function MOverlay({ show, className, ...rest }: MOverlayProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      className={clsx("mdui-overlay", className)}
      {...rest}
    ></div>
  );
}
