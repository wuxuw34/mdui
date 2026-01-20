import { useContext, useEffect, useState } from "react";
import type { MCarouselItemProps } from "./interface";
import { MCarouselContext } from "./context";

export default function MCarouselItem({
  children,
  aspectRatio = "9:16",
  ...rest
}: MCarouselItemProps) {
  const context = useContext(MCarouselContext);
  const [offset, setOffset] = useState(0); //视差效果

  useEffect(() => {
    const setOffsetValue = (v: number) => {
      setOffset(v);
    };
    if (context.scroll) {
      if (context.scroll === "left") {
        setOffsetValue(-10);
      } else {
        setOffsetValue(10);
      }
    } else {
      setOffsetValue(0);
    }
  }, [context]);

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
