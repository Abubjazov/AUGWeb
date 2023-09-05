import { useState, useEffect } from 'react'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  const handleResize = (event: unknown) => {
    if (
      typeof event == 'object' &&
      !!event &&
      'target' in event &&
      typeof event.target == 'object' &&
      !!event.target &&
      'innerWidth' in event.target
    )
      setWidth(Number(event.target.innerWidth))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
