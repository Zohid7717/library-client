import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './i18n'
import { Provider } from 'react-redux'
import { store } from './server/redux/store.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>...Loading</div>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
)
