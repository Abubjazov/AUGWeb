import { FC } from 'react'

import Spinner from 'uikit/Spinner/Spinner'

export interface FallbackProps {
  height: number
  width: number
}

const Fallback: FC<FallbackProps> = ({ height, width }) => {
  return (
    <div
      style={{
        height: `${height}vh`,
        width: `${width}vw`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(180deg, rgb(185 251 255 / 20%) 0%, rgb(227 220 255 / 20%) 100%)',
      }}
    >
      <Spinner />
    </div>
  )
}

export default Fallback
