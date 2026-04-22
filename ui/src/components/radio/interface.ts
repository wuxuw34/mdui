

export interface MRadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}