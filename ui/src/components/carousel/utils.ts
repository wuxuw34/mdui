import type { MCarouselProps, MCarouselVariant } from "./interface";

export function handleCarouselContentClassName({
  variant = 'multi-browse'
}: MCarouselProps) {

  const cs: string[] = ["mdui-carousel-content"]
  cs.push(variant)

  return cs.join(' ')
}

export function updateUncontainedOffset(carousel: HTMLDivElement, content: HTMLDivElement, active: number) {
  const children = Array.from(content.children) as HTMLElement[]
  const activeItem = children[active]
  const lastItem = children[children.length - 1]
  const contentWidth = lastItem.offsetLeft + lastItem.offsetWidth
  const width = carousel.offsetWidth
  let offset = activeItem.offsetLeft
  if (contentWidth - offset < width) {
    offset = contentWidth - width
  }
  content.style.transform = `translateX(${-offset}px)`
}

export function updateMultiBrowseItemWidth(content: HTMLDivElement, active: number, showNumber: number = 4) {
  const children = Array.from(content.children) as HTMLElement[]
  const offsetWidth = content.offsetWidth -32 // 容器宽度
  console.log('容器宽度', offsetWidth)
  const items: ('default' | 'wide' | 'thin')[] = Array.from({ length: children.length }, () => 'thin')
  const offsetIndex = active + showNumber - 1 >= children.length ? active - (active + showNumber - 1 - (children.length - 1)) : active // 记录偏移位置

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
  // console.log(items, offsetIndex, '偏移位置', active)
  const activeWidth = showNumber > 2 ? offsetWidth / 2 : offsetWidth - 40
  items.forEach((item, index) => {
    const el = children[index]
    if (item === 'wide') {
      el.style.minWidth = `${activeWidth}px`
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
    content.style.transform = `translateX(${-offsetIndex * 40 - 16 - 8 * (offsetIndex - (showNumber - 1))}px)`
  }, 0)
}