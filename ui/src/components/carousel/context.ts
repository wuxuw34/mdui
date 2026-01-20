import { createContext } from "react"
import type { MCarouselContextValue } from "./interface"

export const MCarouselContext = createContext<MCarouselContextValue>({
  variant: 'multi-browse'
})