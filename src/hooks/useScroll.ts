import { useEffect, useRef, useState } from 'react'

import { throttle } from 'lodash'

const SCROLL_THRESHOLD = 200
const SHOW_DELAY = 1000

export const useScroll = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const lastScrollY = useRef<number>(window.scrollY)
  const lastStop = useRef<number>(0)
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleShowElement = () => setIsVisible(true)

  const handleHideElement = () => {
    setIsVisible(false)
    if (showTimer.current) clearTimeout(showTimer.current)
    showTimer.current = setTimeout(handleShowElement, SHOW_DELAY)
  }

  const handleScroll = throttle(() => {
    const currentScrollY = window.scrollY
    const isThreshholdExceeded =
      currentScrollY - lastStop.current > SCROLL_THRESHOLD
    const isScrollingUpward = currentScrollY - lastScrollY.current < 0
    const isNotScrolledYet = lastStop.current === 0

    if (isNotScrolledYet) return

    if (isThreshholdExceeded) handleHideElement()
    if (isScrollingUpward) handleShowElement()

    lastScrollY.current = currentScrollY
  }, 100)

  const handleScrollEnd = () => {
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    scrollEndTimer.current = setTimeout(() => {
      lastStop.current = window.scrollY
    }, 100)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScrollEnd, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScrollEnd)
      if (showTimer.current) clearTimeout(showTimer.current)
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return { isVisible, scrollToTop }
}
