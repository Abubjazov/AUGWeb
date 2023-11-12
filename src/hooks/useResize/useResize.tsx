import { useState, useEffect } from 'react'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleResize = (event: any) => setWidth(Number(event.target.innerWidth))

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
