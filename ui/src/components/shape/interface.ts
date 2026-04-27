
export type MShapeType = 'circle' | 'rectangle' | 'slanted' | 'arch' | 'semicircle' | 'oval' | 'pill' | 'triangle' | 'arrow' | 'fan' | 'diamond' | 'clamshell' | 'pentagon' | 'gem' | 'verSunny' | 'sunny' | 'fourSidedCookie' | 'sixSidedCookie' | 'sevenSidedCookie' | 'nineSidedCookie' | '12SidedCookie' | '4LeafClover' | '8LeafClover' | 'burst' | 'softBurst' | 'boom' | 'softBoom' | 'flower' | 'puffy' | 'puffyDiamond' | 'ghostIsh' | 'pixelCircle' | 'pixelTriangle' | 'bun' | 'heart'

export interface MShapeProps extends React.HTMLAttributes<SVGSVGElement> {
  shape?: MShapeType
  size?: number
  // duration?:number
}


export interface MShapeRef {
  changeShape: (shape: MShapeType) => void
}
