import { useState } from 'react'

export const useFavorites = () => {
  const [count, setCount] = useState<number>(28)
  const addToFavorites = () => setCount((state) => state + 1)

  return { favoritesCount: count, addToFavorites }
}
