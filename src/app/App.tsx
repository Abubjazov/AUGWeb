import { useState } from 'react'

import classNames from 'classnames'

import styles from './App.module.css'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.root}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={styles.logo} alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className={classNames(styles.logo, styles.react)} alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className={styles.card}>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className={styles.read}>Click on the Vite and React logos to learn more</p>
    </div>
  )
}

export default App
