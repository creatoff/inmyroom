import { useEffect, useRef, useState } from 'react'

interface IProps {
  delay: number
  threshold: number
}

export const useScroll = ({ delay, threshold }: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const scrollY = useRef<number>(window.scrollY)
  const lastScrollStop = useRef<number>(window.scrollY)
  const scrollStopped = useRef<boolean>(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showElement() {
    if (timer.current) clearTimeout(timer.current)
    if (scrollStopped.current) {
      setIsVisible(true)
    } else {
      timer.current = setTimeout(forceShowElement, delay)
    }
    lastScrollStop.current = window.scrollY
  }

  function forceShowElement() {
    if (timer.current) clearTimeout(timer.current)
    setIsVisible(true)
    lastScrollStop.current = window.scrollY
  }

  function hideActionBar() {
    setIsVisible(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(showElement, threshold)
  }

  function handleScroll() {
    scrollStopped.current = false
    if (!isVisible && window.scrollY < scrollY.current) forceShowElement()
    if (isVisible && window.scrollY - lastScrollStop.current > threshold)
      hideActionBar()
    scrollY.current = window.scrollY
  }

  function handleScrollEnd() {
    scrollStopped.current = true
    lastScrollStop.current = window.scrollY
  }

  useEffect(() => {
    lastScrollStop.current = window.scrollY
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scrollend', handleScrollEnd, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scrollend', handleScrollEnd)
    }
  }, [isVisible])

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { isVisible, handleScrollUp }
}
