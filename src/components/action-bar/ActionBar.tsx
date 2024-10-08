import IconComments from '@/assets/icons/comments.svg?react'
import IconHeart from '@/assets/icons/heart.svg?react'
import IconPageUp from '@/assets/icons/page-up.svg?react'
import IconShare from '@/assets/icons/share.svg?react'
import cn from 'classnames'
import { useComments, useFavorites, useScroll, useShare } from 'hooks'

import { ActionBarButton as Button } from './components'
import styles from './style.module.css'

export function ActionBar() {
  const { handleShare } = useShare()
  const { commentsCount, addComment } = useComments()
  const { favoritesCount, addToFavorites } = useFavorites()

  const { isVisible, scrollToTop } = useScroll()

  const classNames = cn({
    [styles.bar]: true,
    [styles.bar_hidden]: !isVisible,
  })

  return (
    <div className={classNames}>
      <div className={styles.wrapper}>
        <Button icon={IconShare} onClick={handleShare} />
        <Button icon={IconPageUp} onClick={scrollToTop} />
        <Button
          icon={IconComments}
          text={String(commentsCount)}
          onClick={addComment}
        />
        <Button
          icon={IconHeart}
          text={String(favoritesCount)}
          onClick={addToFavorites}
        />
      </div>
    </div>
  )
}
