
export interface MCarouselContextValue {
  variant?: MCarouselVariant,
  scroll?: 'left' | 'right'
}
export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  aspectRatio?: "1:1" | "3:4" | "16:9" | "9:16"
}

export type MCarouselItemProps = ItemProps


export type MCarouselVariant = 'uncontained' | 'hero' | 'center-align-hero' | 'multi-browse'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  // variant: 'uncontained' | 'hero' | 'center-align-hero'
  value?: number,
  showNumber?: number
}

interface MultiBrose extends Props {
  variant: 'multi-browse'
  size: number | string
}

interface Uncontained extends Props {
  variant: 'uncontained'
}

interface Hero extends Props {
  variant: 'hero'
}

export type MCarouselProps = MultiBrose | Uncontained | Hero
