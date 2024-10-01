import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'

import IconComments from '../../assets/icons/comments.svg?react'
import IconHeart from '../../assets/icons/heart.svg?react'
import IconPageUp from '../../assets/icons/page-up.svg?react'
import IconShare from '../../assets/icons/share.svg?react'
import { ActionBarButton as Button } from './components'
import styles from './style.module.css'

async function copyPageUrl() {
  try {
    await navigator.clipboard.writeText(location.href)
    console.log('Page URL copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const SCROLL_THRESHOLD = 200
const APPEARANCE_DELAY = 1000

export function ActionBar() {
  const [commentsCount, setCommentsCount] = useState<number>(7)
  const [likesCount, setLikesCount] = useState<number>(28)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const scrollY = useRef<number>(window.scrollY)
  const lastScrollStop = useRef<number>(window.scrollY)
  const scrollStopped = useRef<boolean>(true)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showActionBar() {
    if (timer.current) clearTimeout(timer.current)
    if (scrollStopped.current) {
      setIsVisible(true)
    } else {
      timer.current = setTimeout(forceShowActionBar, APPEARANCE_DELAY)
    }
    lastScrollStop.current = window.scrollY
  }

  function forceShowActionBar() {
    if (timer.current) clearTimeout(timer.current)
    setIsVisible(true)
    lastScrollStop.current = window.scrollY
  }

  function hideActionBar() {
    setIsVisible(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(showActionBar, APPEARANCE_DELAY)
  }

  function handleScroll() {
    scrollStopped.current = false
    if (!isVisible && window.scrollY < scrollY.current) forceShowActionBar()
    if (isVisible && window.scrollY - lastScrollStop.current > SCROLL_THRESHOLD)
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

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: document.URL,
    }

    if (!navigator.share) {
      copyPageUrl()
      return
    }

    if (navigator.canShare(shareData)) {
      navigator.share(shareData)
    }
  }

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleComment = () => {
    setCommentsCount((state) => state + 1)
  }

  const handleLike = () => {
    setLikesCount((state) => state + 1)
  }

  const classNames = cn({
    [styles.bar]: true,
    [styles.bar_hidden]: !isVisible,
  })

  return (
    <div className={classNames}>
      <div className={styles.wrapper}>
        <Button icon={IconShare} onClick={handleShare} />
        <Button icon={IconPageUp} onClick={handleScrollUp} />
        <Button
          icon={IconComments}
          text={String(commentsCount)}
          onClick={handleComment}
        />
        <Button
          icon={IconHeart}
          text={String(likesCount)}
          onClick={handleLike}
        />
      </div>
    </div>
  )
}
