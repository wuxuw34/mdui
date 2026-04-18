import { useEffect } from "react";
import type { UsePopperOptions } from "./interface";
import { computePosition } from "./utils";



export default function usePopper(el: React.RefObject<HTMLElement | null>, floating: React.RefObject<HTMLElement | null>, options?: UsePopperOptions) {

  useEffect(() => {
    if (!el.current || !floating.current) {
      return
    }
    const handler = () => {
      if (!el.current || !floating.current) {
        return
      }
      const { x, y } = computePosition(el.current, floating.current, options)
      options?.callBack?.({ x, y })
    }
    window.addEventListener('resize', handler)
    handler()

    return () => {
      window.removeEventListener('resize', handler)
    }

  }, [el, floating, options])

  return {}
}