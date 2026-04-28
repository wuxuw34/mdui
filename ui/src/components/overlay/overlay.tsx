import "./index.scss";

interface MOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  show?: boolean;
}

export default function MOverlay({ show }: MOverlayProps) {

  if(!show){
    return null
  }

  return <div className="mdui-overlay"></div>;
}
