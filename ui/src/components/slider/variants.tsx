import { cva } from "class-variance-authority";

export const sliderVariants = cva(
  "relative flex items-center justify-between group gap-1",
  {
    variants: {
      orientation: {
        horizontal: " flex-row",
        vertical: "  flex-col",
      },
    },
  }
);

export const thumbVariants = cva(
  "bg-[var(--color)] transition-[width,height] rounded-pressed-xs origin-center pointer-events-none",
  {
    variants: {
      orientation: {
        horizontal: "w-[4px] h-[calc(100%_+_5px)] group-active:w-[3px] ",
        vertical: "h-[4px] w-[calc(100%_+_5px)] group-active:h-[3px] ",
      },
    },
  }
);

export const trackVariants = cva(
  "bg-[var(--color)] pointer-events-none rounded-pressed-sm",
  {
    variants: {
      orientation: {
        horizontal: "w-full h-[var(--size)] ",
        vertical: "h-full w-[var(--size)]",
      },
    },
  }
);

export const inputVariants = cva(
  "opacity-0 absolute top-1/2 translate-y-[-50%]",
  {
    variants: {
      orientation: {
        horizontal: "w-full h-full ",
        vertical: "h-full w-full rotate-90",
      },
    },
  }
);
