import { useEffect, type RefObject } from "react";

/**
 * 监听鼠标滚轮事件
 */
export function useMouseWheel(options?: {
  el?: HTMLElement | RefObject<HTMLElement | null>,
  callback: (x: number, y: number, e: WheelEvent) => void,
}) {
  useEffect(() => {
    const el = options?.el || document.body
    const elRef = el instanceof HTMLElement ? el : el.current
    if (!elRef) {
      return
    }
    const handleWheel = (e: WheelEvent) => {
      options?.callback(e.deltaX, e.deltaY,e)
    }
    elRef.addEventListener('wheel', handleWheel)
    return () => {
      elRef.removeEventListener('wheel', handleWheel)
    }
  }, [options])

}