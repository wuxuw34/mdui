import type { Coords, MiddleWareOptions, MiddleWareResult } from "../interface";
import { getAlignment, getSide } from "../utils";

export default function defaultMiddleware(options: MiddleWareOptions): MiddleWareResult {

  const {
    reference,
    floating,
    placement
  } = options
  let coords: Coords = {
    x: options.x,
    y: options.y
  }

  const side = getSide(placement)
  const alignment = getAlignment(placement)
  const floatingRect = floating.getBoundingClientRect() // 获取floating的位置信息
  const referenceRect = reference.getBoundingClientRect() // 获取reference的位置信息

  const commonX = referenceRect.left + (referenceRect.width - floatingRect.width) / 2
  const commonY = referenceRect.top + (referenceRect.height - floatingRect.height) / 2
  console.log(referenceRect, floatingRect)
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: referenceRect.top - floatingRect.height
      }
      break
    case 'bottom':
      coords = {
        x: commonX,
        y: referenceRect.top + referenceRect.height
      }
      break
    case 'left':
      coords = {
        x: referenceRect.left - floatingRect.width,
        y: commonY
      }
      break
    case 'right':
      coords = {
        x: referenceRect.left + referenceRect.width,
        y: commonY
      }
      break
    default:
      break
  }

  return {
    ...coords,
    placement: options.placement
  }
}