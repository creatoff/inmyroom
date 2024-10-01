import { useState } from 'react'

export const useComments = () => {
  const [count, setCount] = useState<number>(7)
  const addComment = () => setCount((state) => state + 1)

  return { commentsCount: count, addComment }
}
