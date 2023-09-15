import { FC } from 'react'

import Layout from 'pages/Layout'
import MainPage from 'pages/MainPage'
import { Page404 } from 'pages/Page404/Page404'
import WellcomePage from 'pages/WellcomePage'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'

const App: FC = () => {
  const { token } = useAppSelector(state => state.auth)

  return (
    <Routes>
      <Route
        path="/"
        element={
          !token ? (
            <Layout>
              <MainPage />
            </Layout>
          ) : (
            <WellcomePage />
          )
        }
      />

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default App
