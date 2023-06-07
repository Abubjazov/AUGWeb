import { FC, ReactNode } from 'react'

import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>
}

export default Layout
