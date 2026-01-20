



interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // variant: 'uncontained' | 'hero' | 'center-align-hero'
  value?:number
}

interface MultiBrose extends Props {
  variant: 'multi-browse'
  size: number | string
  showNumber?: number
}

export type MCarouselProps = MultiBrose
