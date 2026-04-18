
export type Side = 'top' | 'bottom' | 'left' | 'right'
export type Alignment = 'start' | 'end'

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'

export interface UsePopperOptions {
  placement: Placement;
  callBack?: (coords: Coords) => void;
}

export interface MiddleWareOptions extends UsePopperOptions {
  reference: HTMLElement;
  floating: HTMLElement;
  x: number,
  y: number
}

export interface Coords {
  x: number,
  y: number
}

export interface MiddleWareResult extends UsePopperOptions {
  x: number,
  y: number
}

export type MiddleWare = (options: MiddleWareOptions) => MiddleWareResult