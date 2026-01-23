

export interface Props extends React.HTMLAttributes<HTMLDivElement> {

}

interface Input extends Props {
  variant: 'input';
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface Assist extends Props {
  variant: 'assist';
  icon?: React.ReactNode;
}

interface Filter extends Props {
  variant: 'filter';
  icon?: React.ReactNode;
  checked?: boolean;
}

interface Suggestion extends Props {
  variant: 'suggestion';
}

export type MChipProps = Input | Assist | Filter | Suggestion

