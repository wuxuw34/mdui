import type { MLayoutProps } from "./interface";
import "./layout.scss";

export default function MLayout({ header, content, aside }: MLayoutProps) {
  return (
    <div className="mdui-layout">
      {header && <header>{header}</header>}
      <div className="mdui-layout__content">
        {aside && <aside className="mdui-layout__aside">{aside}</aside>}
        {content && <main className="mdui-layout__main">{content}</main>}
      </div>
    </div>
  );
}
