import { useContext } from "react";
import type { MCarouselItemProps } from "./interface";
import { MCarouselContext } from "./context";

export default function MCarouselItem({
  children,
  aspectRatio = "9:16",
  ...rest
}: MCarouselItemProps) {
  const context = useContext(MCarouselContext);

  return (
    <div
      className={"mdui-carousel-item"}
      style={{
        aspectRatio:
          context.variant === "uncontained"
            ? aspectRatio.replace(":", "/")
            : undefined,
      }}
      {...rest}
    >
      <div className="container">{children}</div>
    </div>
  );
}
