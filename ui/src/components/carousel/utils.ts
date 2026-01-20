import type { MCarouselProps } from "./interface";

export function handleCarouselContentClassName({
  variant = 'multi-browse'
}: MCarouselProps) {

  const cs: string[] = ["mdui-carousel-content"]
  cs.push(variant)

  return cs.join(' ')
}

export function updateMultiBrowseItemWidth(content: HTMLDivElement, active: number, showNumber: number = 4) {
  const children = Array.from(content.children) as HTMLElement[]
  const offsetWidth = content.offsetWidth - 32 // 容器宽度
  const items: ('default' | 'wide' | 'thin')[] = Array.from({ length: children.length }, () => 'thin')
  for (let i = 0; i < showNumber - 1; i++) {
    const index = i + active
    if (index === active) {
      items[index] = 'wide'
    } else {
      if (index < children.length) {
        items[index] = 'default'
      } else {
        items[active - (index - children.length + 1)] = 'default'
      }
    }
  }
  items.forEach((item, index) => {
    const el = children[index]
    if (item === 'wide') {
      el.style.minWidth = `${offsetWidth / 2}px`
    } else if (item === 'default') {
      el.style.minWidth = `${(offsetWidth / 2 - 40) / (showNumber - 2)}px`
    } else {
      el.style.minWidth = '40px'
    }
  })
  // 滚动一下
  // 还没开始渲染, 等待一下
  setTimeout(() => {
    // content.scrollTo({
    //   left: active * 40 + 16 + 8 * (active - 1),
    //   behavior: 'smooth'
    // })
    content.style.transform = `translateX(${-active * 40 - 16 - 8 * (active - 1)}px)`
  }, 0)
}