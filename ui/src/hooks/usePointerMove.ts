import { useCallback, useRef, useState } from "react";
import type { Position } from "../types";


export default function usePointerMove<T extends HTMLElement = HTMLDivElement>(options?: {
  callback?: (position: Position, prevPos: Position, initPos: Position) => void,
  onPointerUp?: (e: PointerEvent) => void,
  onPointerDown?: (e: PointerEvent) => void,
}) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [initPos, setInitPos] = useState<Position>({ x: 0, y: 0 });
  const initPosRef = useRef<Position>({ x: 0, y: 0 });
  const prevPosRef = useRef<Position>({ x: 0, y: 0 });
  const isMovingRef = useRef<boolean>(false); // 是否正在移动
  const ref = useRef<T | null>(null)
  const onPointerUpRef = useRef<(e: PointerEvent) => void>(null)

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isMovingRef.current) return
    const x = e.clientX - prevPosRef.current.x
    const y = e.clientY - prevPosRef.current.y
    const o = {
      x: e.clientX,
      y: e.clientY,
    }
    prevPosRef.current = o
    const p = {
      x,
      y,
    }
    setPosition(p)
    options?.callback?.(p, prevPosRef.current, initPosRef.current)
  }, [options])

  const onPointerUp = useCallback((e: PointerEvent) => {
    if (isMovingRef.current) {
      isMovingRef.current = false
      ref.current?.removeEventListener("pointermove", onPointerMove)

      options?.onPointerUp?.(e)
      if (onPointerUpRef.current) {
        ref.current?.removeEventListener("pointerup", onPointerUpRef.current)
        window.removeEventListener("pointerup", onPointerUpRef.current)
      }
      ref.current?.removeEventListener("pointermove", onPointerMove)
    }

  }, [options, ref, onPointerMove])

  const onPointerDown = useCallback((e: React.PointerEvent<T>) => {
    isMovingRef.current = true
    const p = {
      x: e.clientX,
      y: e.clientY,
    }
    options?.onPointerDown?.(e as unknown as PointerEvent)
    setInitPos(p)
    prevPosRef.current = p
    initPosRef.current = p
    ref.current?.addEventListener("pointermove", onPointerMove)
    onPointerUpRef.current = onPointerUp
    ref.current?.addEventListener("pointerup", onPointerUpRef.current)
    window.addEventListener("pointerup", onPointerUpRef.current)
  }, [options, ref, onPointerMove, onPointerUp])


  return {
    position,
    initPos,
    onPointerDown,
    ref
  }
}