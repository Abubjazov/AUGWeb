import { NavLink } from 'react-router-dom'

import styles from './Page404.module.css'

export const Page404 = (): JSX.Element => (
  <main className={styles.root}>
    {/* <ErrorGif /> */}
    <p>Страница не найдена</p>
    <NavLink to="/">Вернуться на главную</NavLink>
  </main>
)
