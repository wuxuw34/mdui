import { cva } from 'class-variance-authority'

const dividerVariants = cva('opacity-10', {
  variants: {
    orientation: {
      horizontal: 'w-full h-[var(--size)]',
      vertical: 'h-full w-[var(--size)]',
    },
  },
})

export default dividerVariants