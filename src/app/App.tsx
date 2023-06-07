import { FC } from 'react'

import Layout from 'components/Layout'
import MainPage from 'pages/MainPage'

const App: FC = () => {
  return (
    <div>
      <Layout>
        <MainPage />
      </Layout>
    </div>
  )
}

export default App
