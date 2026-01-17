import MbuttonGroup, {
  type MButtonGroupProps,
} from "../buttonGroup/buttonGroup";

interface SplitButtonProps extends MButtonGroupProps {
  children: React.ReactNode;
}

export default function SplitButton(props: SplitButtonProps) {
  const { children, animation = false, ...rest } = props;
  return (
    <MbuttonGroup
      animation={animation}
      variant="split"
      {...rest}
    >
      {children}
    </MbuttonGroup>
  );
}
