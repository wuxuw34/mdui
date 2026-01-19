import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import "./transitions.scss";
import { handleLateralTransitionsStyle } from "./transitions-custom";
import { LateralTransitionsContext } from "./context";
import { EasingFunction } from "../../../contants/easing";
import usePointerMove from "../../../hooks/usePointerMove";

export interface MLateralTransitionsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (v: string) => void;
}

export interface MLateralTransitionsRef {
  toNext: () => void;
  toPrev: () => void;
  update: (v: string) => void;
}

export interface TransitionPage {
  value: string;
  el: HTMLElement | null;
}

const threshold = 20; // 拖动大于这个就自动完成

const LateralTransitions = forwardRef<
  MLateralTransitionsRef,
  MLateralTransitionsProps
>(({ children, className, value, onValueChange, ...rest }, ref) => {
  const transitionsStyle = useMemo(() => {
    return handleLateralTransitionsStyle({ className });
  }, [className]);
  const [pages, setPages] = useState<TransitionPage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(value || ""); // 激活的页面
  const transformValue = useRef(0); // 偏移量
  const dragOffset = useRef(0); // 拖动的偏移量百分比
  const [isDragging, setIsDragging] = useState(false); // 是否正在拖动
  const { ref: moveRef, onPointerDown } = usePointerMove({
    callback: (pos, prevPos, initPos) => {
      if (!containerRef.current || !pageContainerRef.current) return;
      const offset =
        ((pos.x + prevPos.x - initPos.x) / containerRef.current?.offsetWidth) *
        100;
      dragOffset.current = offset;
      pageContainerRef.current.style.transform = `translate(${transformValue.current + offset}%,0)`;
    },
    onPointerDown: () => {
      if (!pageContainerRef.current) return;
      const transform = pageContainerRef.current.style.transform.split(/[(,]/);
      transformValue.current = parseInt(transform[1].replace("%", ""));
      setIsDragging(true);
    },
    onPointerUp() {
      setIsDragging(false);
      if (Math.abs(dragOffset.current) > threshold) {
        // 完成这个拖动
        if (dragOffset.current > 0) {
          // 往之前拖动一个
          toPrev();
        } else {
          toNext();
        }
      } else {
        // 回归原始位置
        updatePage(active);
      }
      dragOffset.current = 0;
    },
  });

  function registerPage(page: TransitionPage) {
    setPages((prev) => [...prev, page]);
  }

  const updatePage = useCallback(
    (value: string | number) => {
      if (!pageContainerRef.current) return;
      const index =
        typeof value === "number"
          ? value
          : pages.findIndex((p) => p.value === value);
      if (index >= 0) {
        pageContainerRef.current.style.transform = `translate(${-100 * index}%,0)`;
      }
    },
    [pages],
  );

  useEffect(() => {
    if (value !== active && value) {
      const set = (v: string) => {
        setActive(v);
      };
      set(value);
      updatePage(value);
    }
  }, [value, updatePage]);

  /**
   * @deprecated
   * 这段代码和上面的value冲突
   */
  // useEffect(() => {
  //   if (pages.length <= 0) return;
  //   const index = pages.findIndex((page) => page.value === active);
  //   if (index >= 0) {
  //     updatePage(index);
  //   } else {
  //     updatePage(0);
  //     const set = (v: string) => {
  //       setActive(v);
  //     };
  //     set(pages[0].value);
  //   }
  // }, [pages]);

  useEffect(() => {
    onValueChange?.(active);
  }, [active]);

  function toNext() {
    const index = pages.findIndex((page) => page.value === active);
    if (index < pages.length - 1) {
      console.log(index, pages.length);
      updatePage(index + 1);
      setActive(pages[index + 1].value);
    } else {
      updatePage(active);
    }
  }

  function toPrev() {
    const index = pages.findIndex((page) => page.value === active);

    if (index > 0) {
      updatePage(index - 1);
      setActive(pages[index - 1].value);
    } else {
      updatePage(active);
    }
  }

  useImperativeHandle(ref, () => ({
    toNext,
    toPrev,
    update: updatePage,
  }));

  return (
    <LateralTransitionsContext.Provider
      value={{
        registerPage,
      }}
    >
      <div
        ref={(_ref) => {
          containerRef.current = _ref;
          moveRef.current = _ref;
        }}
        {...rest}
        className={transitionsStyle.className}
        onPointerDown={onPointerDown}
      >
        <div
          className="container"
          ref={pageContainerRef}
          style={
            {
              "--easing": EasingFunction.ExpressiveDefaultSpatial,
              transitionProperty: isDragging ? "none" : "transform",
              userSelect: isDragging ? "none" : "auto",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </LateralTransitionsContext.Provider>
  );
});

export default LateralTransitions;
