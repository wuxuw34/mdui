import type { TransitionPage } from "./transitions";


export function activeTransition(pages: TransitionPage[], index: number) {
  pages.forEach((page, i) => {
    if (page.el) {
      if (i === index) {
        page.el.style.translate = `-${index * 100}%`
      } else if (i < index) {
        page.el.style.translate = `${-100 - (index - i) * 100}%`
      } else if (i > index) {
        page.el.style.translate = `${100 + (i - index) * 100}%`
      }
    }
  })
}