import "./index.scss";

export interface MCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}

export default function MCheckbox({ children }: MCheckboxProps) {
  return (
    <div className="mdui-checkbox">
      <div className="icon">{children}</div>
    </div>
  );
}
