import { FC, lazy, Suspense } from 'react'

import { getAuth } from 'firebase/auth'
import WellcomePage from 'pages/WellcomePage'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import { setAuthData, setUserAuthenticated } from 'store/slices/authSlice'
import Fallback from 'uikit/Fallback'

const App: FC = () => {
  const { isUserAuthenticated } = useAppSelector(state => state.auth)

  const dispatch = useAppDispatch()

  const auth = getAuth()

  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(
        setAuthData({
          uid: user.uid,
          email: user.email,
        }),
      )
      dispatch(setUserAuthenticated(true))
    } else {
      dispatch(setUserAuthenticated(false))

      dispatch(
        setAuthData({
          uid: undefined,
          email: null,
        }),
      )
    }
  })

  const Layout = lazy(() => import('pages/Layout'))

  const MainPage = lazy(() => import('pages/MainPage'))

  const SocialPage = lazy(() => import('pages/SocialPage'))

  const Page404 = lazy(() => import('pages/Page404'))

  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route
          path="/"
          element={
            isUserAuthenticated ? (
              <Layout>
                <MainPage />
              </Layout>
            ) : (
              <WellcomePage />
            )
          }
        />

        <Route path="/social" element={<SocialPage />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

export default App
