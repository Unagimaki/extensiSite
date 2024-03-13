import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { Layout, ModalViewer } from 'features'

import { store } from 'store'

import 'styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ModalViewer />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
