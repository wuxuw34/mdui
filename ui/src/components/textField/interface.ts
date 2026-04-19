

interface MultiLine {
  multiLine: boolean;
  rows?: number;
}

interface MTextFieldBaseProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  variant?: 'filled' | 'outlined'
  label?: React.ReactNode
  suffixIcon?: React.ReactNode
  prefixIcon?: React.ReactNode
  onValueChange?: (value: string) => void
  value?: string
  helperText?: React.ReactNode
  showCount?: boolean
}

export type MTextFieldProps = MTextFieldBaseProps & MultiLine;