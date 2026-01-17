import { cva } from 'class-variance-authority'

const buttonVariants = cva('relative overflow-hidden flex flex-row gap-1 cursor-pointer items-center justify-center selected-none tracking-wide outline-0 box-border disabled:pointer-events-none disabled:select-none disabled:bg-disabled disabled:text-text-disabled disabled:cursor-not-allowed text-nowrap leading-[1.1]', {
  variants: {
    variant: {
      default: "text-primary bg-surface-container",
      outline: "text-primary bg-surface-container",
      filled: "bg-primary text-white before:content-[''] before:absolute before:inset-0 before:rounded-sm before:w-full before:h-full hover:before:bg-[rgba(0,0,0,0.05)] active:before:bg-[rgba(0,0,0,0.1)]",
      text: "text-primary",
      icon: "text-primary",
      tonal: ""
    },
    background: {
      true: "before:content-[''] before:absolute before:inset-0 before:w-full before:h-full before:bg-primary before:opacity-10 active:before:bg-primary"
    },
    hover: {
      true: "before:content-[''] before:absolute before:inset-0 before:w-full before:h-full hover:before:bg-primary before:opacity-10 active:before:bg-primary"
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
      true: "selected",
    },
    icon: {
      true: "aspect-square p-0!"
    },
    animation: {
      true: "transition-all duration-200 active:scale-95",
    },
    shadow: {
      true: "shadow hover:shadow-hover",
    },
    outline: {
      true: "focus:outline-2 outline-0 outline-primary focus:outline-offset-2"
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
      selected: true,
      className: "active:rounded-pressed-sm!",
    },
    {
      size: 'xs',
      selected: true,
      className: "active:rounded-pressed-xs!",
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