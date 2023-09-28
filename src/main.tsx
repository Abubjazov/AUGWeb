import React from 'react'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import { store } from './store'

import './index.css'

const firebaseConfig = {
  apiKey: 'AIzaSyCrJkSiJBRi1t9YGgdNqLOPWPkpANpTDsM',
  authDomain: 'aug-web.firebaseapp.com',
  projectId: 'aug-web',
  storageBucket: 'aug-web.appspot.com',
  messagingSenderId: '795877861697',
  appId: '1:795877861697:web:8f1dd3c0c1e83a5b1fd9c0',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseDb = getFirestore(firebaseApp)
export const firebaseStorage = getStorage(firebaseApp)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
