import { cva } from 'class-variance-authority'

const buttonGroupVariants = cva('w-fit', {
  variants: {
    orientation: {
      vertical: 'flex flex-col gap-2',
      horizontal: 'flex flex-row gap-1',
    },
    variant: {
      default: "",
      standard: "",
      split: "[&>*:not(:first-child)]:rounded-l-pressed-xs  [&>*:not(:last-child)]:rounded-r-pressed-xs! [&>*:not(:first-child)[data-selected='true']]:rounded-[var(--radius)]!",
      segmented: "[&>*:not(:first-child)]:rounded-l-none! [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none! gap-0! [&>*:not(:first-child)]:outline-l-0!  [&>*:not(:last-child)]:outline-r-0!",
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      variant: 'default',
      className: '[&>*:not(:first-child)]:rounded-l-none! [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none! gap-0!',
    },
    {
      orientation: 'vertical',
      variant: 'default',
      className: '[&>*:not(:first-child)]:rounded-t-none! [&>*:not(:first-child)]:border-t-0! [&>*:not(:last-child)]:rounded-b-none! gap-0!',
    }
  ],
  defaultVariants: {
    orientation: 'horizontal',
  }
})

export default buttonGroupVariants