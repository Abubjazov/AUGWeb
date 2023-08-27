import { useState, useEffect } from 'react'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleResize = (event: any) => {
      setWidth(+event.target.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return width
}
