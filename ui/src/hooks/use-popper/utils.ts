import type { Alignment, MiddleWare, Placement, Side, UsePopperOptions } from "./interface";
import { defaultMiddleware } from "./middlewares";

/**
 * 计算位置
 */
export function computePosition(el: HTMLElement, floating: HTMLElement, options?: UsePopperOptions) {
  const middlewares: MiddleWare[] = [defaultMiddleware];
  let x = 0, y = 0
  // 执行中间件
  middlewares.forEach(fn => {
    const result = fn({
      ...options,
      reference: el,
      floating,
      x,
      y,
      placement: options?.placement || 'top'
    })
    x = result.x
    y = result.y
  })

  return {
    x,
    y
  }
}

export function getSide(placement: Placement): Side {
  return (placement.split('-')?.[0] as Side) || 'top'
}

export function getAlignment(placement: Placement): Alignment {
  return (placement.split('-')?.[1] as Alignment) || 'start'
}