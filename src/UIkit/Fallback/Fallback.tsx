import { FC } from 'react'

import Spinner from 'uikit/Spinner/Spinner'

const Fallback: FC = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
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
