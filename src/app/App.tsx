import { FC, lazy, Suspense } from 'react'

import { getAuth } from 'firebase/auth'
import WellcomePage from 'pages/WellcomePage'
import { Route, Routes } from 'react-router-dom'
import { getUserData } from 'services/userData/userData'
import { useAppSelector } from 'store/hooks'
import { useAppDispatch } from 'store/hooks'
import {
  setAuthData,
  setFirstLoading,
  setUserAuthenticated,
} from 'store/slices/authSlice'
import { Spinner } from 'uikit/Spinner/Spinner'

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
      void dispatch(getUserData())
      dispatch(setUserAuthenticated(true))
      dispatch(setFirstLoading(false))
    } else {
      dispatch(setUserAuthenticated(false))
      dispatch(setFirstLoading(false))
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

  const Page404 = lazy(() =>
    import('pages/Page404/Page404').then(({ Page404 }) => ({
      default: Page404,
    })),
  )

  return (
    <Suspense
      fallback={
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
      }
    >
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

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

export default App
