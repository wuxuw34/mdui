import { cva } from 'class-variance-authority'

const buttonVariants = cva('relative overflow-hidden  flex flex-row gap-1 cursor-pointer items-center justify-center selected-none tracking-wide outline-0 box-border disabled:pointer-events-none disabled:select-none disabled:bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed text-nowrap', {
  variants: {
    variant: {
      default: "bg-[var(--color)] text-white before:content-[''] before:absolute before:inset-0 before:rounded-sm before:w-full before:h-full hover:before:bg-[rgba(0,0,0,0.05)] active:before:bg-[rgba(0,0,0,0.1)] ",
      outline: "outline-[var(--color)/80] text-[var(--color)] hover:outline-[var(--color)] focus:outline-2 outline-1",
      text: "text-[var(--color)]",
      icon: "text-[var(--color)]",
      tonal: ""
    },
    background: {
      true: "before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-[var(--color)] before:opacity-10 active:before:bg-[var(--color)]"
    },
    hover: {
      true: "before:content-[''] before:absolute before:inset-0 before:w-full before:h-full hover:before:bg-[var(--color)] before:opacity-10 active:before:bg-[var(--color)]"
    },
    size: {
      sm: "h-sm text-sm px-sm rounded-sm gap-sm ",
      xs: "h-xs text-xs px-xs rounded-xs gap-xs ",
      md: "h-md text-md px-md rounded-md gap-md ",
      lg: "h-lg text-lg px-lg rounded-lg gap-lg ",
      xl: "h-xl text-xl px-xl rounded-xl gap-xl ",
    },
    active: {
      true: "",
    },
    selected: {
      true: "outline-2! outline-[var(--color)] outline-offset-2! bg-[var(--color)] text-white",
    },
    icon: {
      true: "aspect-square p-0!"
    },
    animation: {
      true: "transition-all duration-200 active:scale-95",
    },
    shadow: {
      true: "shadow-sm hover:shadow-md focus:shadow-lg",
    },
    outline: {
      true: "focus:outline-2 outline-0 outline-[var(--color)] focus:outline-offset-2"
    },
    shape: {
      rounded: "",
      square: "rounded-[var(--radius)]",
    }
  },
  compoundVariants: [
    {
      outline: false,
      variant: ['default', 'icon', 'text', 'tonal'],
      className: "outline-0!"
    },
    {
      variant: "outline",
      className: "outline-1!"
    },
    {
      active: true,
      size: "sm",
      className: "active:rounded-pressed-sm!",
    },
    {
      active: true,
      size: "xs",
      className: "active:rounded-pressed-xs!",
    },
    {
      active: true,
      size: "md",
      className: "active:rounded-pressed-md!",
    },
    {
      active: true,
      size: "lg",
      className: "active:rounded-pressed-lg!",
    },
    {
      active: true,
      size: "xl",
      className: "active:rounded-pressed-xl!",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "md",
    animation: true,
    outline: true,
  }
})

export default buttonVariants