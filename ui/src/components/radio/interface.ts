
export interface MRadioGroupContext {
  value: string;
  setValue: (v: string) => void;
}

export interface MRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface MRadioButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}